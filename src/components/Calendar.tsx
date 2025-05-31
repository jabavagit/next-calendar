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

  // Prepara un array plano con blanks y días
  const cells: ({ type: 'blank' } | { type: 'day', date: Date, dayNum: number, events: EventType[] })[] = [];
  for (let i = 0; i < startDay; i++) {
    cells.push({ type: 'blank' });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    cells.push({
      type: 'day',
      date,
      dayNum: i,
      events: getEventsForDate(date),
    });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ type: 'blank' });
  }

  // Renderiza el grid, calculando el colIdx real para cada celda
  const calendarCells = cells.map((cell, idx) => {
    const colIdx = idx % 7;
    const isWeekend = colIdx === 5 || colIdx === 6;

    if (cell.type === 'blank') {
      return <div key={`blank-${idx}`} className="bg-transparent" />;
    }
    const { date, dayNum, events } = cell;
    return (
      <div
        key={`day-${idx}`}
        className={`card p-2 flex flex-col items-start min-h-[80px] transition-colors
          ${isToday(date) ? 'border-2 border-primary bg-primary/10' : ''}
          ${isWeekend ? 'bg-warning/10' : 'bg-base-100'}
          hover:bg-base-200 shadow-sm`}
      >
        <div className={`font-bold ${isToday(date) ? 'text-primary' : ''}`}>{dayNum}</div>
        {events.map((event, eidx) => (
          <div key={eidx} className="badge badge-primary mt-1">{event.title}</div>
        ))}
      </div>
    );
  });

  // Botón para ir a hoy
  const goToToday = () => {
    onMonthChange(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  // Selectores de mes y año
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const years = Array.from({ length: 21 }, (_, i) => today.getFullYear() - 10 + i);

  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMonthChange(new Date(year, parseInt(e.target.value), 1));
  };

  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMonthChange(new Date(parseInt(e.target.value), month, 1));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        {/* Flecha Mes Anterior */}
        <button
          className="btn btn-sm btn-ghost rounded-full p-2 hover:bg-base-200 transition"
          onClick={() => onMonthChange(new Date(year, month - 1, 1))}
          aria-label="Mes anterior"
          style={{ minWidth: 36, minHeight: 36 }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Selectores Mes y Año + Hoy */}
        <div className="flex items-center gap-2 mx-2 flex-1 justify-center">
          <select
            className="select select-sm max-w-[120px]"
            value={month}
            onChange={handleMonthSelect}
          >
            {months.map((m, idx) => (
              <option key={m} value={idx}>{m}</option>
            ))}
          </select>
          <select
            className="select select-sm max-w-[90px]"
            value={year}
            onChange={handleYearSelect}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button
            className="btn btn-link btn-xs px-2 py-0 ml-1"
            style={{ minHeight: 0, height: 28 }}
            onClick={goToToday}
            type="button"
          >
            Hoy
          </button>
        </div>

        {/* Flecha Mes Siguiente */}
        <button
          className="btn btn-sm btn-ghost rounded-full p-2 hover:bg-base-200 transition"
          onClick={() => onMonthChange(new Date(year, month + 1, 1))}
          aria-label="Mes siguiente"
          style={{ minWidth: 36, minHeight: 36 }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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