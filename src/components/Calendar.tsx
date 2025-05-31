import React from 'react';

interface EventType {
  date: Date;
  title: string;
}

interface CalendarProps {
  currentMonth: Date;
  events: EventType[];
  onMonthChange: (newMonth: Date) => void;
  onAddEvent: (event: EventType) => void;
}

const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  events,
  onMonthChange,
  onAddEvent,
}) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const today = new Date();
  const isToday = (date: Date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  // Primer día del mes (0=Domingo, 1=Lunes, ...)
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay();
  startDay = startDay === 0 ? 6 : startDay - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generar celdas vacías antes del primer día del mes
  const blanks = Array.from({ length: startDay }, (_, i) => (
    <div key={`blank-${i}`} className="bg-transparent" />
  ));

  // Generar los días del mes
  const getEventsForDate = (date: Date) =>
    events.filter(event => event.date.toDateString() === date.toDateString());

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dailyEvents = getEventsForDate(date);

    // Calcular el índice de columna (0=Lun, ..., 6=Dom)
    const colIdx = (startDay + i - 1) % 7;
    const isWeekend = colIdx === 5 || colIdx === 6;

    days.push(
      <div
        key={i}
        className={`card p-2 flex flex-col items-start min-h-[80px] transition-colors
          ${isToday(date) ? 'border-2 border-primary bg-primary/10' : ''}
          ${isWeekend ? 'bg-warning/10' : 'bg-base-100'}
          hover:bg-base-200 shadow-sm`}
      >
        <div className={`font-bold ${isToday(date) ? 'text-primary' : ''}`}>{i}</div>
        {dailyEvents.map((event, idx) => (
          <div key={idx} className="badge badge-primary mt-1">{event.title}</div>
        ))}
      </div>
    );
  }

  // Unir celdas vacías y días
  const calendarCells = [...blanks, ...days];

  // Rellenar la última semana si es necesario
  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(<div key={`end-blank-${calendarCells.length}`} className="bg-transparent" />);
  }

  // Botón para ir a hoy
  const goToToday = () => {
    onMonthChange(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
        <button
          className="btn btn-sm btn-outline"
          onClick={() =>
            onMonthChange(new Date(year, month - 1, 1))
          }
        >
          &#8592; Anterior
        </button>
        <span className="text-lg font-semibold capitalize">
          {currentMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </span>
        <button
          className="btn btn-sm btn-outline"
          onClick={() =>
            onMonthChange(new Date(year, month + 1, 1))
          }
        >
          Siguiente &#8594;
        </button>
        <button
          className="btn btn-sm btn-primary ml-2"
          onClick={goToToday}
        >
          Hoy
        </button>
      </div>
      {/* Nombres de los días */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day, idx) => (
          <div
            key={day}
            className={`text-center font-semibold py-1 rounded
              ${idx === 5 || idx === 6 ? 'bg-warning/30 text-warning' : 'bg-base-200 text-base-content/70'}`}
          >
            {day}
          </div>
        ))}
      </div>
      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-2">
        {calendarCells}
      </div>
    </div>
  );
};

export default Calendar;