import React, { useState, useEffect } from 'react';
import Calendar from '../calendar/Calendar';
import Navbar from '../layout/Navbar';
import CalendarSelector from '../calendarSelector/CalendarSelector';
import type { CalendarType, EventType } from '../../types/calendarTypes';
import { getCalendars, createCalendar, updateCalendar, deleteCalendar } from '../../services/calendarApi';

const Dashboard: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendars, setCalendars] = useState<CalendarType[]>([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState<number | null>(null);

  useEffect(() => {
    getCalendars().then((data) => {
      setCalendars(data);
      if (data.length > 0) setSelectedCalendarId(data[0].id);
    });
  }, []);

  const selectedCalendar = calendars.find((c) => c.id === selectedCalendarId);

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  const handleAddEvent = (event: EventType) => {
    setCalendars((cals) =>
      cals.map((cal) =>
        cal.id === selectedCalendarId ? { ...cal, events: [...cal.events, event] } : cal,
      ),
    );
  };

  const handleEditEvent = (event: EventType) => {
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

  const handleDeleteEvent = (event: EventType) => {
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

  // Si necesitas pasar los shifts a Calendar o EventModal, hazlo así:
  // selectedCalendar?.shifts

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <main className="flex-grow flex flex-col p-0 m-0 h-full min-h-0">
        <div className="flex-1 flex flex-col h-full min-h-0 px-2 sm:px-4 md:px-8 py-4 sm:py-6 md:py-10">
          <CalendarSelector
            calendars={calendars.map(cal => ({
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

export default Dashboard;
