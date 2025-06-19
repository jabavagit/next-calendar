'use client';
import React, { useState, useEffect } from 'react';
import { getCalendars, createCalendar, updateCalendar, deleteCalendar, addShiftToCalendar } from '@/server/services/calendarApi';
import { ICalendarType, IEventType } from '@/interfaces/components/calendar.interface';
import Calendar from '@/components/calendar/Calendar';
import CalendarSelector from '@/components/calendarSelector/CalendarSelector';
import Navbar from '@/components/layout/Navbar';

const DashboardPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendars, setCalendars] = useState<ICalendarType[]>([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState<number | null>(null);

  useEffect(() => {
    getCalendars().then((data: ICalendarType[]) => {
      setCalendars(data);
      if (data.length > 0) setSelectedCalendarId(data[0].id);
    });
  }, []);

  const selectedCalendar = calendars.find((c) => c.id === selectedCalendarId);

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  const handleAddEvent = (event: IEventType) => {
    /*setCalendars((cals) =>
      cals.map((cal) =>
        cal.id === selectedCalendarId ? { ...cal, events: [...cal.events, event] } : cal,
      ),
    );*/

    if (!event.shift) {
      console.error('Event shift is undefined');
      return;
    }
    addShiftToCalendar(selectedCalendarId!, event.shift).then((shift) => {
      setCalendars((cals) =>
        cals.map((cal) =>
          cal.id === selectedCalendarId
            ? {
              ...cal,
              events: [
                ...cal.events,
                { ...event, shiftId: shift.id }
              ],
            }
            : cal,
        ),
      );
    });
  };

  const handleEditEvent = (event: IEventType) => {
    setCalendars((cals) =>
      cals.map((cal) =>
        cal.id === selectedCalendarId
          ? {
            ...cal,
            events: cal.events.map((ev) => (ev.id === event.id ? event : ev)),
          }
          : cal,
      ),
    );
  };

  const handleDeleteEvent = (event: IEventType) => {
    setCalendars((cals) =>
      cals.map((cal) =>
        cal.id === selectedCalendarId
          ? {
            ...cal,
            events: cal.events.filter((ev) => ev.id !== event.id),
          }
          : cal,
      ),
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col p-0 m-0 h-full min-h-0">
        <div className="flex-1 flex flex-col h-full min-h-0 px-2 sm:px-4 md:px-8 py-4 sm:py-6 md:py-10">
          <CalendarSelector
            calendars={calendars.map((cal) => ({
              ...cal,
              shifts: cal.shifts ?? [],
            }))}
            selectedCalendarId={selectedCalendarId}
            setSelectedCalendarId={setSelectedCalendarId}
            setCalendars={setCalendars}
          />
          {selectedCalendar && (
            <Calendar
              currentMonth={currentMonth}
              events={selectedCalendar.events}
              shifts={selectedCalendar.shifts}
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
