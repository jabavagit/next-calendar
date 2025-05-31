import React, { useState } from 'react';
import Calendar from './Calendar';
import Navbar from './Navbar';
import CalendarSelector from './CalendarSelector';

interface EventType {
    id: number;
    title: string;
    date: Date;
    [key: string]: any;
}

interface CalendarType {
    id: number;
    name: string;
    events: EventType[];
}

const Dashboard: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [calendars, setCalendars] = useState<CalendarType[]>([
        { id: 1, name: 'Laboral', events: [] }
    ]);
    const [selectedCalendarId, setSelectedCalendarId] = useState<number>(1);
    const [newCalendarName, setNewCalendarName] = useState('');
    const [editingCalendarId, setEditingCalendarId] = useState<number | null>(null);
    const [editingCalendarName, setEditingCalendarName] = useState('');

    const selectedCalendar = calendars.find(c => c.id === selectedCalendarId);

    const handleMonthChange = (newMonth: Date) => {
        setCurrentMonth(newMonth);
    };

    const handleAddEvent = (event: EventType) => {
        setCalendars(cals =>
            cals.map(cal =>
                cal.id === selectedCalendarId
                    ? { ...cal, events: [...cal.events, event] }
                    : cal
            )
        );
    };

    const handleCreateCalendar = () => {
        if (!newCalendarName.trim()) return;
        const newId = Math.max(0, ...calendars.map(c => c.id)) + 1;
        setCalendars([...calendars, { id: newId, name: newCalendarName, events: [] }]);
        setNewCalendarName('');
        setSelectedCalendarId(newId);
    };

    const handleDeleteCalendar = (id: number) => {
        const filtered = calendars.filter(c => c.id !== id);
        setCalendars(filtered);
        if (filtered.length) setSelectedCalendarId(filtered[0].id);
    };

    const handleRenameCalendar = (id: number) => {
        setCalendars(cals =>
            cals.map(cal =>
                cal.id === id ? { ...cal, name: editingCalendarName } : cal
            )
        );
        setEditingCalendarId(null);
        setEditingCalendarName('');
    };

    return (
        <div className="flex flex-col min-h-screen bg-base-100">
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
                            events={selectedCalendar.events}
                            onMonthChange={handleMonthChange}
                            onAddEvent={handleAddEvent}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;