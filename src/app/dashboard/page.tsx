'use client';
import React, { useState, useEffect } from 'react';
import {
  ICalendar,
  IEvent,
  IEventExtended,
  IShift,
  IShiftExtended,
} from '@/interfaces/calendar.interface';
import Calendar from '@/components/calendar/Calendar';
import Navbar from '@/components/layout/Navbar';
import TabsCalendars from '@/components/calendar/tabsCalendars';
import { useDashboardData } from '@/hooks/useDashboardData';
import { updateEvent, createEvent } from '@/server/services/api/eventsApi';
import { createShift } from '@/server/services/api/shiftsApi';

const DashboardPage: React.FC = () => {
  const {
    calendars,
    events,
    shifts,
    selectedCalendarId,
    setSelectedCalendarId,
    setCalendars,
    setEvents,
    setShifts,
  } = useDashboardData();

  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (calendars.length > 0) setSelectedCalendarId(calendars[0].id);
  }, [calendars, setSelectedCalendarId]);

  const selectedCalendar = calendars.find((c) => c.id === selectedCalendarId);

  // Filtra eventos para el calendario seleccionado
  const calendarEvents = selectedCalendar
    ? events
        .filter((ev) => ev.calendarId === selectedCalendar.id)
        .map((ev) => ({
          ...ev,
          shiftsId: [
            ...(ev.shiftsId || []),
            ...shifts.filter((sh) => (sh as any).eventId === ev.id).map((sh) => sh.id),
          ],
        }))
    : [];

  const handleMonthChange = (newMonth: Date) => setCurrentMonth(newMonth);

  const handleEditEvent = async (event: IEvent) => {
    const updated = await updateEvent(event);
    setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? updated : ev)));
  };

  const handleSaveEvent = async (
    event:
      | (IEventExtended & { shift?: IShiftExtended; isNew?: boolean; isEdit?: boolean })
      | IEventExtended,
  ) => {
    let shiftId: number | undefined = undefined;

    if (event.shift?.isNew) {
      const newShift = await createShift({ ...event.shift });
      setShifts((prev) => [...prev, newShift]);
      shiftId = newShift.id;
    } else if (event.shift?.id) {
      shiftId = event.shift.id;
    } else if (Array.isArray(event.shiftsId) && event.shiftsId.length > 0) {
      shiftId = event.shiftsId[0];
    }

    if (event.isNew) {
      const newEvent = await createEvent({
        ...event,
        calendarId: selectedCalendarId!,
        shiftsId: shiftId !== undefined ? [shiftId] : undefined,
      });
      setEvents((prev) => [...prev, newEvent]);
    } else if ('isEdit' in event && event.isEdit) {
      const updated = await updateEvent({
        ...event,
        shiftsId: shiftId !== undefined ? [shiftId] : undefined,
      });
      setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? updated : ev)));
    }
  };

  async function handleAddCalendar(): Promise<void> {
    const name = prompt('Enter a name for the new calendar:');
    if (!name) return;
    // Aquí podrías llamar a la API para crear el calendario
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />
      <main className="flex-grow flex flex-col p-0 m-0 h-full min-h-0">
        <div className="flex-1 flex flex-col h-full min-h-0 px-2 sm:px-4 md:px-8 py-4 sm:py-6 md:py-10">
          <TabsCalendars
            calendars={calendars}
            selectedCalendarId={selectedCalendarId}
            setSelectedCalendarId={setSelectedCalendarId}
            onAddCalendar={handleAddCalendar}
          >
            {selectedCalendar && (
              <Calendar
                currentMonth={currentMonth}
                events={calendarEvents}
                shifts={shifts}
                onMonthChange={handleMonthChange}
                onSaveEvent={handleSaveEvent}
                // onDeleteEvent={handleDeleteEvent}
              />
            )}
          </TabsCalendars>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
