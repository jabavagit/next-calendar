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
  'border-primary',
  'border-secondary',
  'border-accent',
  'border-info',
  'border-success',
  'border-warning',
  'border-error',
];

const iconColorPalette = [
  'text-primary',
  'text-secondary',
  'text-accent',
  'text-info',
  'text-success',
  'text-warning',
  'text-error',
];

const hoverBorderPalette = [
  'hover:border-primary',
  'hover:border-secondary',
  'hover:border-accent',
  'hover:border-info',
  'hover:border-success',
  'hover:border-warning',
  'hover:border-error',
];

const TabsCalendars: React.FC<TabsCalendarsProps> = ({
  calendars,
  selectedCalendarId,
  setSelectedCalendarId,
  onAddCalendar,
  children,
}) => {
  // Encuentra el índice del calendario seleccionado para el color
  const selectedIdx = calendars.findIndex((c) => c.id === selectedCalendarId);
  const borderColor =
    selectedIdx >= 0 ? colorPalette[selectedIdx % colorPalette.length] : 'border-base-300';
  const iconColor =
    selectedIdx >= 0
      ? iconColorPalette[selectedIdx % iconColorPalette.length]
      : 'text-base-content';

  function getTabClass({ isSelected, idx }: { isSelected: boolean; idx: number }) {
    let base =
      'tab transition-all duration-200 flex items-center gap-2 transition-colors border-b-1';
    if (isSelected) {
      base += ` tab-active font-bold ${colorPalette[idx % colorPalette.length]}`;
    } else {
      base += ` bg-gray-100 border-transparent hover:border-b-2 ${hoverBorderPalette[idx % hoverBorderPalette.length]}`;
    }
    return base;
  }

  return (
    <div className="mb-4">
      {/* Tabs para escritorio */}
      <div className={`tabs flex-wrap sm:flex-nowrap bg-base-100 ${borderColor}`}>
        {/* <div className={`hidden sm:flex tabs tabs-lift rounded-t-lg ${borderColor} shadow-sm`} > */}
        {calendars.map((calendar, idx) => (
          <button
            key={calendar.id}
            className={getTabClass({
              isSelected: selectedCalendarId === calendar.id,
              idx,
            })}
            type="button"
            onClick={() => setSelectedCalendarId(calendar.id)}
            style={{ borderBottomWidth: 3 }}
          >
            <span
              className={`inline-flex items-center justify-center rounded-full ${iconColorPalette[idx % iconColorPalette.length]} bg-base-200`}
              style={{ width: 28, height: 28 }}
            >
              <CalendarDaysIcon className="w-5 h-5" />
            </span>
            <span className="truncate">{calendar.name}</span>
          </button>
        ))}
        <button
          className="tab flex items-center justify-center border-b-2 border-transparent"
          type="button"
          onClick={onAddCalendar}
          title="Añadir calendario"
          style={{ borderBottomWidth: 3 }}
        >
          <span
            className="inline-flex items-center justify-center rounded-full bg-base-300"
            style={{ width: 28, height: 28 }}
          >
            <PlusIcon className="w-5 h-5" />
          </span>
        </button>
      </div>
      {/* Dropdown para móvil */}
      <div className="sm:hidden flex items-center gap-2 mb-3">
        <select
          className="select select-bordered w-full"
          value={selectedCalendarId ?? ''}
          onChange={(e) => setSelectedCalendarId(Number(e.target.value))}
        >
          {calendars.map((calendar) => (
            <option key={calendar.id} value={calendar.id}>
              {calendar.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-square btn-outline"
          type="button"
          onClick={onAddCalendar}
          title="Añadir calendario"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      {/* Renderiza children debajo de las tabs/dropdown, con borde del color del tab activo */}
      {children && <div className={` pb-10 rounded-b-lg`}>{children}</div>}
    </div>
  );
};

export default TabsCalendars;
