'use client';
import React, { useState, useEffect } from 'react';
import { getDashboardData } from '@/server/services/dashboardApi';
import { ICalendar, IEvent, IShift } from '@/interfaces/calendar.interface';
import Calendar from '@/components/calendar/Calendar';
import CalendarSelector from '@/components/calendarSelector/CalendarSelector';
import Navbar from '@/components/layout/Navbar';
import { createEvent, updateEvent, deleteEvent } from '@/server/services/eventsApi';
import { createShift } from '@/server/services/shiftsApi';

const DashboardPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState<number | null>(null);

  useEffect(() => {
    getDashboardData().then(({ calendars, events, shifts }) => {
      setCalendars(calendars);
      setEvents(events);
      setShifts(shifts);
      if (calendars.length > 0) setSelectedCalendarId(calendars[0].id);
    });
  }, []);

  const selectedCalendar = calendars.find((c) => c.id === selectedCalendarId);

  // Filtra eventos para el calendario seleccionado
  const calendarEvents = selectedCalendar
    ? events
      .filter(ev => ev.calendarId === selectedCalendar.id)
      .map(ev => ({
        ...ev,
        shiftsId: [
          ...(ev.shiftsId || []),
          ...shifts.filter(sh => sh.eventId === ev.id).map(sh => sh.id)
        ],
      }))
    : [];

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  // Añadir evento y shift (si corresponde)
  const handleAddEvent = async (event: Omit<IEvent, 'id'> & { shift?: Omit<IShift, 'id'> }) => {
    let shiftId: number | undefined = undefined;
    if (event.shift) {
      const newShift = await createShift({ ...event.shift, eventId: -1 }); // eventId temporal
      setShifts((prev) => [...prev, newShift]);
      shiftId = newShift.id;
    }
    const newEvent = await createEvent({
      ...event,
      calendarId: selectedCalendarId!,
      shiftsId: shiftId !== undefined ? [shiftId] : undefined
    });
    setEvents((prev) => [...prev, newEvent]);
    // Si creaste un shift, actualiza su eventId
    if (event.shift && shiftId) {
      await updateEvent({ ...newEvent, shiftsId: shiftId !== undefined ? [shiftId] : undefined });
      await createShift({ ...event.shift, id: shiftId, eventId: newEvent.id });
    }
  };

  const handleEditEvent = async (event: IEvent) => {
    const updated = await updateEvent(event);
    setEvents((prev) => prev.map(ev => ev.id === updated.id ? updated : ev));
  };

  const handleDeleteEvent = async (event: IEvent) => {
    await deleteEvent(event.id);
    setEvents((prev) => prev.filter(ev => ev.id !== event.id));
    // Opcional: también puedes borrar los shifts asociados a ese evento
    setShifts((prev) => prev.filter(sh => sh.eventId !== event.id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col p-0 m-0 h-full min-h-0">
        <div className="flex-1 flex flex-col h-full min-h-0 px-2 sm:px-4 md:px-8 py-4 sm:py-6 md:py-10">
          <CalendarSelector
            calendars={calendars}
            selectedCalendarId={selectedCalendarId}
            setSelectedCalendarId={setSelectedCalendarId}
            setCalendars={setCalendars}
          />
          {selectedCalendar && (
            <Calendar
              currentMonth={currentMonth}
              events={calendarEvents}
              shifts={shifts}
              onMonthChange={handleMonthChange}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
