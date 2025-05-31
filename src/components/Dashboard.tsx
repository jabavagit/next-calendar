import React, { useState } from 'react';
import Calendar from './Calendar';
import Navbar from './Navbar';

interface EventType {
    id: number;
    title: string;
    date: Date;
    [key: string]: any;
}

const Dashboard: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [events, setEvents] = useState<EventType[]>([]);

    const handleMonthChange = (newMonth: Date) => {
        setCurrentMonth(newMonth);
    };

    const handleAddEvent = (event: EventType) => {
        setEvents([...events, event]);
    };

    return (
        <div className="flex flex-col min-h-screen bg-base-100">
            <Navbar />
            <main className="flex-grow p-4 flex justify-center items-start">
                <div className="w-full max-w-5xl">
                    <Calendar 
                        currentMonth={currentMonth} 
                        events={events} 
                        onMonthChange={handleMonthChange} 
                        onAddEvent={handleAddEvent} 
                    />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;