import { useCalendarSelector } from '@/hooks/useCalendarSelector';
import { ICalendarExtended } from '@/interfaces/calendar.interface';
import React from 'react';
import TooltipInput from './TooltipInput';

interface CalendarSelectorProps {
  calendars: ICalendarExtended[];
  selectedCalendarId: number | null;
  setSelectedCalendarId: (id: number | null) => void;
  setCalendars: React.Dispatch<React.SetStateAction<ICalendarExtended[]>>;
}

const CalendarSelector: React.FC<CalendarSelectorProps> = ({
  calendars,
  selectedCalendarId,
  setSelectedCalendarId,
  setCalendars,
}) => {
  const {
    newCalendarName,
    setNewCalendarName,
    editingCalendarId,
    setEditingCalendarId,
    editingCalendarName,
    setEditingCalendarName,
    showInput,
    setShowInput,
    showDeleteConfirm,
    setShowDeleteConfirm,
    inputTooltipRef,
    handleCreateCalendar,
    handleDeleteCalendar,
    handleRenameCalendar,
  } = useCalendarSelector(calendars, setCalendars, setSelectedCalendarId);

  // Si no hay calendarios, solo mostrar el botón +
  if (calendars.length === 0) {
    return (
      <div className="mb-4 flex items-center gap-2">
        <div className="relative">
          <button
            className="btn btn-sm btn-accent flex items-center h-9 rounded-l-md rounded-r-none"
            onClick={() => setShowInput(true)}
            title="Crear calendario"
            style={{ minHeight: '36px' }}
          >
            <span className="text-lg font-bold">+</span>
          </button>
          {showInput && (
            <div
              ref={inputTooltipRef}
              className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 p-5 rounded shadow border flex gap-3 items-center min-w-[320px]"
            >
              <input
                className="input input-sm flex-1 h-9"
                placeholder="Nuevo calendario"
                value={newCalendarName}
                onChange={(e) => setNewCalendarName(e.target.value)}
                /* onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateCalendar();
                }} */
                autoFocus
                style={{ minHeight: '36px' }}
              />
              <div className="flex gap-0">
                <button
                  className="btn btn-sm btn-success h-9 rounded-none rounded-l-md"
                >
                  Crear
                </button>
                <button
                  className="btn btn-sm btn-ghost h-9 rounded-none rounded-r-md"
                  onClick={() => setShowInput(false)}
                >
                  ✖
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mostrar dropdown, +, editar y eliminar
  const currentId = selectedCalendarId ?? calendars[0]?.id;
  const currentCalendar = calendars.find((c) => c.id === currentId);

  return (
    <div className="mb-4 flex items-center gap-0">
      <select
        className="select select-sm h-9 rounded-l-md rounded-r-none focus:outline-none focus:ring-primary focus:border-primary bg-accent/10 text-neutral"
        style={{ minHeight: '36px', borderRight: '0' }}
        value={currentId}
        onChange={(e) => setSelectedCalendarId(Number(e.target.value))}
      >
        {calendars.map((cal) => (
          <option key={cal.id} value={cal.id}>
            {cal.name}
          </option>
        ))}
      </select>
      {/* Botón + con TooltipInput */}
      <div className="relative">
        <button
          className="btn btn-sm btn-accent flex items-center h-9 rounded-none"
          onClick={() => setShowInput(true)}
          title="Crear calendario"
          style={{ minHeight: '36px' }}
        >
          <span className="text-lg font-bold">+</span>
        </button>
        <TooltipInput
          open={showInput}
          onClose={() => setShowInput(false)}
          value={newCalendarName}
          onChange={setNewCalendarName}
          onConfirm={handleCreateCalendar}
          onCancel={() => setShowInput(false)}
          confirmLabel="Crear"
          cancelLabel="✖"
          placeholder="Nuevo calendario"
          inputClassName="input input-sm flex-1 h-9 rounded-none focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      {/* Editar con TooltipInput */}
      <div className="relative">
        <button
          className="btn btn-sm btn-ghost h-9 rounded-none"
          title="Renombrar"
          style={{ minHeight: '36px' }}
          onClick={() => {
            setEditingCalendarId(currentId);
            setEditingCalendarName(currentCalendar?.name || '');
          }}
        >
          ✏️
        </button>
        <TooltipInput
          open={editingCalendarId === currentId}
          onClose={() => setEditingCalendarId(null)}
          value={editingCalendarName}
          onChange={setEditingCalendarName}
          onConfirm={async () => handleRenameCalendar(currentId)}
          onCancel={() => setEditingCalendarId(null)}
          confirmLabel="✔"
          cancelLabel="✖"
          placeholder="Renombrar calendario"
        />
      </div>
      {/* Eliminar con TooltipInput para confirmación */}
      {calendars.length > 1 && (
        <div className="relative">
          <button
            className="btn btn-sm btn-ghost h-9 rounded-none rounded-r-md"
            title="Borrar"
            style={{ minHeight: '36px' }}
            onClick={() => setShowDeleteConfirm(true)}
          >
            🗑️
          </button>
          <TooltipInput
            open={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            value=""
            onChange={() => { }}
            onConfirm={async () => handleDeleteCalendar(currentId)}
            onCancel={() => setShowDeleteConfirm(false)}
            confirmLabel="Sí"
            cancelLabel="No"
          >
            <span className="ml-3 text-base">¿Eliminar calendario?</span>
          </TooltipInput>
        </div>
      )}
    </div>
  );
};

export default CalendarSelector;
