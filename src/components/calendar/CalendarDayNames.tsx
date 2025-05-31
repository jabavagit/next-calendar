import React from 'react';

const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const CalendarDayNames: React.FC = () => (
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
);

export default CalendarDayNames;