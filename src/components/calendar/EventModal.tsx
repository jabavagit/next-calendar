import React from 'react';

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
}

const EventModal: React.FC<EventModalProps> = ({
  open, onClose, onSave, eventTitle, setEventTitle, editingEvent, selectedDate, onDelete
}) => {
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