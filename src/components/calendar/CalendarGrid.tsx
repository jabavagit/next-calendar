import { IEventExtended, IShiftExtended } from '@/interfaces/calendar.interface';
import React from 'react';

interface CalendarGridProps {
  cells: (
    | { type: 'blank' }
    | { type: 'day'; date: Date; dayNum: number; events: IEventExtended[] }
  )[];
  onDayClick: (date: Date) => void;
  onEditEvent: (event: IEventExtended) => void;
  onDelete: (event: IEventExtended) => void;
}

interface propsHandlerClick {
  e: React.MouseEvent<HTMLDivElement, MouseEvent>;
  event?: IEventExtended;
  date?: string;
  onDayClick: (date: Date) => void;
  onEditEvent: (event: IEventExtended) => void;
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
export function getInitials(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length === 1) {
    // Si es una sola palabra, devuelve las dos primeras letras en mayúscula
    return words[0].slice(0, 2).toUpperCase();
  }
  // Si son dos o más palabras, devuelve la primera letra de la primera y segunda palabra en mayúscula
  return (words[0][0] + words[1][0]).toUpperCase();
}

function handlerClick(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  event: IEventExtended | undefined,
  date: Date,
  onDayClick: (date: Date) => void,
  onEditEvent: (event: IEventExtended) => void,
) {
  if (!event) {
    onDayClick(date);
    return;
  }
  e.stopPropagation();
  onEditEvent(event);
}

const CalendarGrid: React.FC<CalendarGridProps & { shifts?: IShiftExtended[] }> = ({
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

      const event: IEventExtended | undefined = hasEvents ? events[0] : undefined;
      const eventShifts =
        event?.shiftsId && Array.isArray(event.shiftsId)
          ? shifts.filter((s) => event.shiftsId!.includes(s.id))
          : [];
      const eventBgColor = eventShifts[0]?.color || '';

      return (
        <div
          key={`day-${idx}`}
          className={`card p-0 flex flex-col min-h-[80px] transition-colors
            ${isToday(date) ? 'border-2 border-primary bg-primary/10' : ''}
            ${isWeekend ? 'bg-warning/10' : 'bg-base-100'}
            hover:bg-base-200 shadow-sm cursor-pointer`}
          onClick={(e) => handlerClick(e, event, date, onDayClick, onEditEvent)}
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
                className="flex-1 w-full flex items-center justify-center text-base-100 text-2xl font-bold rounded-b cursor-pointer hover:border-primary transition-colors"
                style={{ backgroundColor: eventBgColor }}
                title={eventShifts.map((s) => s.name).join(', ') || event.title}
              >
                {eventShifts.length > 0
                  ? eventShifts.map((s) => getInitials(s.name)).join(' ')
                  : getInitials(event.title)}
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
