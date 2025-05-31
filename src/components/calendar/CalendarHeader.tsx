import React from 'react';

interface CalendarHeaderProps {
  year: number;
  month: number;
  months: string[];
  years: number[];
  onMonthChange: (date: Date) => void;
  goToToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year, month, months, years, onMonthChange, goToToday
}) => (
  <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
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
    <div className="flex items-center gap-2 mx-2 flex-1 justify-center">
      <select
        className="select select-sm max-w-[120px]"
        value={month}
        onChange={e => onMonthChange(new Date(year, Number(e.target.value), 1))}
      >
        {months.map((m, idx) => (
          <option key={m} value={idx}>{m}</option>
        ))}
      </select>
      <select
        className="select select-sm max-w-[90px]"
        value={year}
        onChange={e => onMonthChange(new Date(Number(e.target.value), month, 1))}
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
);

export default CalendarHeader;