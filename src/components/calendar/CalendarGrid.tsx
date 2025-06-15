import { IEventType, IShiftType } from '@/interfaces/components/calendar.interface';
import React from 'react';

interface CalendarGridProps {
  cells: ({ type: 'blank' } | { type: 'day'; date: Date; dayNum: number; events: IEventType[] })[];
  onDayClick: (date: Date) => void;
  onEditEvent: (event: IEventType) => void;
  onDelete: (event: IEventType) => void;
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

// Helper para obtener las iniciales de cada palabra
function getInitials(title: string) {
  return title
    .split(' ')
    .map((word) => word[0]?.toUpperCase() || '')
    .join('');
}

const CalendarGrid: React.FC<CalendarGridProps & { shifts?: IShiftType[] }> = ({
  cells,
  onDayClick,
  onEditEvent,
  shifts: shifts = [],
}) => (
  <div className="grid grid-cols-7 gap-2">
    {cells.map((cell, idx) => {
      if (cell.type === 'blank') {
        return <div key={`blank-${idx}`} className="bg-transparent" />;
      }
      const { date, dayNum, events } = cell;
      const colIdx = idx % 7;
      const isWeekend = colIdx === 5 || colIdx === 6;
      const hasEvents = events.length > 0;

      const event: IEventType | undefined = hasEvents ? events[0] : undefined;
      const shift = event?.shiftId ? shifts.find((s) => s.id === event.shiftId) : undefined;
      const eventBgColor = shift?.color ? shift.color : '';

      return (
        <div
          key={`day-${idx}`}
          className={`card p-0 flex flex-col min-h-[80px] transition-colors
            ${isToday(date) ? 'border-2 border-primary bg-primary/10' : ''}
            ${isWeekend ? 'bg-warning/10' : 'bg-base-100'}
            hover:bg-base-200 shadow-sm cursor-pointer`}
          onClick={() => onDayClick(date)}
        >
          <div className="flex flex-col flex-1 w-full h-full">
            <div
              className={`font-bold px-2 pt-2 text-left ${eventBgColor ? 'text-base-100' : ''} ${isToday(date) ? 'text-primary' : ''}`}
              style={{ backgroundColor: eventBgColor ? eventBgColor : '' }}
            >
              {dayNum}
            </div>
            {event ? (
              <div
                className="flex-1 w-full flex items-center justify-center text-base-100 text-2xl font-bold rounded-b cursor-pointer"
                style={{ backgroundColor: eventBgColor }}
                onClick={(e) => {
                  e.stopPropagation();
                  onEditEvent(event);
                }}
                title={shift?.name || event.title}
              >
                {getInitials(shift?.name || event.title)}
              </div>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      );
    })}
  </div>
);

export default CalendarGrid;
