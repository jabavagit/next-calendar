import React, { useState } from 'react';
import { ShiftType } from './types';

interface EventType {
  id: number;
  date: Date;
  title: string;
}

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  eventTitle: string;
  setEventTitle: (v: string) => void;
  editingEvent: EventType | null;
  selectedDate: Date | null;
  onDelete?: () => void;
  shifts: ShiftType[];
  onAddShiftType: (shift: ShiftType) => void;
  eventShiftType?: string;
  setEventShiftType: (v: string) => void;
}

const EventModal: React.FC<EventModalProps> = ({
  open, onClose, onSave, eventTitle, setEventTitle, editingEvent, selectedDate, onDelete,
  shifts, onAddShiftType, eventShiftType, setEventShiftType
}) => {
  const [newShiftName, setNewShiftName] = useState('');
  const [newShiftColor, setNewShiftColor] = useState('#e07a5f');

  if (!open || !selectedDate) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded shadow-lg min-w-[320px] flex flex-col gap-3">
        <div className="text-lg font-semibold mb-2">
          {editingEvent ? 'Editar evento' : 'Nuevo evento'} - {selectedDate.toLocaleDateString()}
        </div>
        <input
          className="input input-bordered w-full"
          placeholder="Título del evento"
          value={eventTitle}
          onChange={e => setEventTitle(e.target.value)}
          autoFocus
        />
        <label className="block mt-2">Turno</label>
        <select
          className="select select-sm w-full"
          value={eventShiftType || ''}
          onChange={e => setEventShiftType(e.target.value)}
        >
          <option value="">Sin turno</option>
          {shifts.map(s => (
            <option key={s.name} value={s.name}>{s.name}</option>
          ))}
        </select>
        <div className="flex gap-2 mt-2">
          <input
            className="input input-sm"
            placeholder="Nuevo turno"
            value={newShiftName}
            onChange={e => setNewShiftName(e.target.value)}
          />
          <input
            type="color"
            value={newShiftColor}
            onChange={e => setNewShiftColor(e.target.value)}
            className="w-10 h-10 p-0 border-none"
          />
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              if (newShiftName.trim()) {
                onAddShiftType({ name: newShiftName, color: newShiftColor });
                setNewShiftName('');
                setNewShiftColor('#e07a5f');
              }
            }}
          >
            Añadir turno
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="btn btn-primary btn-sm" onClick={onSave}>
            {editingEvent ? 'Guardar' : 'Crear'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            Cancelar
          </button>
          {editingEvent && onDelete && (
            <button className="btn btn-error btn-sm ml-auto" onClick={onDelete}>
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;