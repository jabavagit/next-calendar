import React, { ReactNode } from 'react';
import { PlusIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import type { ICalendar } from '@/interfaces/calendar.interface';

interface TabsCalendarsProps {
    calendars: ICalendar[];
    selectedCalendarId: number | null;
    setSelectedCalendarId: (id: number) => void;
    onAddCalendar: () => void;
    children?: ReactNode;
}

const colorPalette = [
    'bg-primary text-primary-content',
    'bg-secondary text-secondary-content',
    'bg-accent text-accent-content',
    'bg-info text-info-content',
    'bg-success text-success-content',
    'bg-warning text-warning-content',
    'bg-error text-error-content',
];

const TabsCalendars: React.FC<TabsCalendarsProps> = ({
    calendars,
    selectedCalendarId,
    setSelectedCalendarId,
    onAddCalendar,
    children,
}) => (
    <div className="mb-4">
        <div className="tabs tabs-lift">
            {calendars.map((calendar, idx) => (
                <button
                    key={calendar.id}
                    className={`tab transition-all duration-200 flex items-center gap-2 ${selectedCalendarId === calendar.id ? 'tab-active font-bold' : ''
                        }`}
                    type="button"
                    onClick={() => setSelectedCalendarId(calendar.id)}
                >
                    <span
                        className={`inline-flex items-center justify-center rounded-full ${selectedCalendarId === calendar.id
                            ? colorPalette[idx % colorPalette.length]
                            : 'bg-base-300 text-base-content'
                            }`}
                        style={{ width: 28, height: 28 }}
                    >
                        <CalendarDaysIcon className="w-5 h-5" />
                    </span>
                    <span className="truncate">{calendar.name}</span>
                </button>
            ))}
            <button
                className="tab flex items-center justify-center"
                type="button"
                onClick={onAddCalendar}
                title="Añadir calendario"
            >
                <span className="inline-flex items-center justify-center rounded-full bg-base-300" style={{ width: 28, height: 28 }}>
                    <PlusIcon className="w-5 h-5" />
                </span>
            </button>
        </div>
        {/* Renderiza children debajo de las tabs */}
        {children && <div className="bg-base-100 p-5 pt-5 pb-5">{children}</div>}
    </div>
);

export default TabsCalendars;