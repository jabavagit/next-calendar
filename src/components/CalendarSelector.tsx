import React, { useState, useRef, useEffect } from 'react';

interface CalendarType {
  id: number;
  name: string;
  events: any[];
}

interface CalendarSelectorProps {
  calendars: CalendarType[];
  selectedCalendarId: number | null;
  setSelectedCalendarId: (id: number) => void;
  setCalendars: React.Dispatch<React.SetStateAction<CalendarType[]>>;
}

const CalendarSelector: React.FC<CalendarSelectorProps> = ({
  calendars,
  selectedCalendarId,
  setSelectedCalendarId,
  setCalendars,
}) => {
  const [newCalendarName, setNewCalendarName] = useState('');
  const [editingCalendarId, setEditingCalendarId] = useState<number | null>(null);
  const [editingCalendarName, setEditingCalendarName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Refs para tooltips
  const inputTooltipRef = useRef<HTMLDivElement>(null);
  const editTooltipRef = useRef<HTMLDivElement>(null);
  const deleteTooltipRef = useRef<HTMLDivElement>(null);

  // Cerrar tooltip al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showInput &&
        inputTooltipRef.current &&
        !inputTooltipRef.current.contains(event.target as Node)
      ) {
        setShowInput(false);
      }
      if (
        editingCalendarId !== null &&
        editTooltipRef.current &&
        !editTooltipRef.current.contains(event.target as Node)
      ) {
        setEditingCalendarId(null);
      }
      if (
        showDeleteConfirm &&
        deleteTooltipRef.current &&
        !deleteTooltipRef.current.contains(event.target as Node)
      ) {
        setShowDeleteConfirm(false);
      }
    }
    if (showInput || editingCalendarId !== null || showDeleteConfirm) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInput, editingCalendarId, showDeleteConfirm]);

  const handleCreateCalendar = () => {
    if (!newCalendarName.trim()) return;
    const newId = Math.max(0, ...calendars.map(c => c.id)) + 1;
    setCalendars([...calendars, { id: newId, name: newCalendarName, events: [] }]);
    setNewCalendarName('');
    setShowInput(false);
    setSelectedCalendarId(newId);
  };

  const handleDeleteCalendar = (id: number) => {
    const filtered = calendars.filter(c => c.id !== id);
    setCalendars(filtered);
    if (filtered.length) setSelectedCalendarId(filtered[0].id);
    else setSelectedCalendarId(null);
    setShowDeleteConfirm(false);
  };

  const handleRenameCalendar = (id: number) => {
    setCalendars(cals =>
      cals.map(cal =>
        cal.id === id ? { ...cal, name: editingCalendarName } : cal
      )
    );
    setEditingCalendarId(null);
    setEditingCalendarName('');
  };

  // Si no hay calendarios, solo mostrar el botón +
  if (calendars.length === 0) {
    return (
      <div className="mb-4 flex items-center gap-2">
        <div className="relative">
          <button
            className="btn btn-xs btn-accent flex items-center"
            onClick={() => setShowInput(true)}
            title="Crear calendario"
          >
            <span className="text-lg font-bold">+</span>
          </button>
          {showInput && (
            <div
              ref={inputTooltipRef}
              className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 bg-base-100 p-5 rounded shadow border flex gap-3 items-center min-w-[320px]"
            >
              <input
                className="input input-sm flex-1"
                placeholder="Nuevo calendario"
                value={newCalendarName}
                onChange={e => setNewCalendarName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleCreateCalendar(); }}
                autoFocus
              />
              <div className="flex gap-0">
                <button className="btn btn-sm btn-success rounded-none rounded-l" onClick={handleCreateCalendar}>Crear</button>
                <button className="btn btn-sm btn-ghost rounded-none rounded-r" onClick={() => setShowInput(false)}>✖</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mostrar dropdown, +, editar y eliminar
  const currentId = selectedCalendarId ?? calendars[0]?.id;
  const currentCalendar = calendars.find(c => c.id === currentId);

  return (
    <div className="mb-4 flex items-center gap-0">
      <select
        className="select select-sm"
        value={currentId}
        onChange={e => setSelectedCalendarId(Number(e.target.value))}
      >
        {calendars.map(cal => (
          <option key={cal.id} value={cal.id}>{cal.name}</option>
        ))}
      </select>
      {/* Botón + con tooltip */}
      <div className="relative">
        <button
          className="btn btn-xs btn-accent flex items-center rounded-none rounded-l"
          onClick={() => setShowInput(true)}
          title="Crear calendario"
        >
          <span className="text-lg font-bold">+</span>
        </button>
        {showInput && (
          <div
            ref={inputTooltipRef}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 bg-base-100 p-5 rounded shadow border flex gap-3 items-center min-w-[320px]"
          >
            <input
              className="input input-sm flex-1"
              placeholder="Nuevo calendario"
              value={newCalendarName}
              onChange={e => setNewCalendarName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleCreateCalendar(); }}
              autoFocus
            />
            <div className="flex gap-0">
              <button className="btn btn-sm btn-success rounded-none rounded-l" onClick={handleCreateCalendar}>Crear</button>
              <button className="btn btn-sm btn-ghost rounded-none rounded-r" onClick={() => setShowInput(false)}>✖</button>
            </div>
          </div>
        )}
      </div>
      {/* Editar con tooltip */}
      <div className="relative">
        <button
          className="btn btn-xs btn-ghost rounded-none"
          title="Renombrar"
          onClick={() => {
            setEditingCalendarId(currentId);
            setEditingCalendarName(currentCalendar?.name || '');
          }}
        >✏️</button>
        {editingCalendarId === currentId && (
          <div
            ref={editTooltipRef}
            className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 bg-base-100 p-5 rounded shadow border flex gap-3 items-center min-w-[320px]"
          >
            <input
              className="input input-sm flex-1"
              value={editingCalendarName}
              onChange={e => setEditingCalendarName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleRenameCalendar(currentId);
              }}
              autoFocus
            />
            <div className="flex gap-0">
              <button className="btn btn-sm btn-success rounded-none rounded-l" onClick={() => handleRenameCalendar(currentId)}>✔</button>
              <button className="btn btn-sm btn-ghost rounded-none rounded-r" onClick={() => setEditingCalendarId(null)}>✖</button>
            </div>
          </div>
        )}
      </div>
      {/* Eliminar con tooltip de confirmación */}
      {calendars.length > 1 && (
        <div className="relative">
          <button
            className="btn btn-xs btn-ghost rounded-none rounded-r"
            title="Borrar"
            onClick={() => setShowDeleteConfirm(true)}
          >🗑️</button>
          {showDeleteConfirm && (
            <div
              ref={deleteTooltipRef}
              className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 bg-base-100 p-5 rounded shadow border flex flex-col items-center min-w-[320px]"
            >
              <span className="mb-3 text-base">¿Eliminar calendario?</span>
              <div className="flex gap-0">
                <button className="btn btn-sm btn-error rounded-none rounded-l" onClick={() => handleDeleteCalendar(currentId)}>Sí</button>
                <button className="btn btn-sm btn-ghost rounded-none rounded-r" onClick={() => setShowDeleteConfirm(false)}>No</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarSelector;