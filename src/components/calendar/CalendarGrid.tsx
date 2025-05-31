import React from 'react';

interface EventType {
  id: number;
  date: Date;
  title: string;
}

interface CalendarGridProps {
  cells: ({ type: 'blank' } | { type: 'day', date: Date, dayNum: number, events: EventType[] })[];
  onDayClick: (date: Date) => void;
  onEditEvent: (event: EventType) => void;
  onDelete: (event: EventType) => void;
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
    .map(word => word[0]?.toUpperCase() || '')
    .join('');
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ cells, onDayClick, onEditEvent, onDelete }) => (
  <div className="grid grid-cols-7 gap-2">
    {cells.map((cell, idx) => {
      if (cell.type === 'blank') {
        return <div key={`blank-${idx}`} className="bg-transparent" />;
      }
      const { date, dayNum, events } = cell;
      const colIdx = idx % 7;
      const isWeekend = colIdx === 5 || colIdx === 6;
      const hasEvents = events.length > 0;

      return (
        <div
          key={`day-${idx}`}
          className={`card p-0 flex flex-col min-h-[80px] transition-colors
            ${isToday(date) ? 'border-2 border-primary bg-primary/10' : ''}
            ${isWeekend ? 'bg-warning/10' : 'bg-base-100'}
            hover:bg-base-200 shadow-sm cursor-pointer`}
          onClick={() => onDayClick(date)}
        >
          {hasEvents ? (
            <div
              className="flex-1 flex flex-col justify-end"
            >
              <div className={`font-bold px-2 pt-2 bg-primary/80 text-base-100 ${isToday(date) ? 'text-primary' : ''}`}>{dayNum}</div>
              <div
                className="w-full h-full flex items-center justify-center bg-primary/80 text-base-100 text-2xl font-bold rounded-b cursor-pointer"
                style={{ minHeight: 0, flex: 1 }}
                onClick={e => { e.stopPropagation(); onEditEvent(events[0]); }}
                title={events[0].title}
              >
                {getInitials(events[0].title)}
                <button
                  className="ml-2 text-xs text-error hover:text-error/80 bg-transparent border-0"
                  onClick={ev => { ev.stopPropagation(); onDelete(events[0]); }}
                  title="Eliminar"
                >✖</button>
              </div>
            </div>
          ) : (
            <>
              <div className={`font-bold px-2 pt-2 ${isToday(date) ? 'text-primary' : ''}`}>{dayNum}</div>
              <div className="flex-1" />
            </>
          )}
        </div>
      );
    })}
  </div>
);

export default CalendarGrid;