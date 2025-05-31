import React from 'react';

interface QuickCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  quickEventTitle: string;
  setQuickEventTitle: (v: string) => void;
  quickEventDate: string;
  setQuickEventDate: (v: string) => void;
}

const QuickCreateModal: React.FC<QuickCreateModalProps> = ({
  open, onClose, onCreate, quickEventTitle, setQuickEventTitle, quickEventDate, setQuickEventDate
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded shadow-lg min-w-[320px] flex flex-col gap-3">
        <div className="text-lg font-semibold mb-2">Nuevo evento</div>
        <input
          className="input input-bordered w-full"
          placeholder="Título del evento"
          value={quickEventTitle}
          onChange={e => setQuickEventTitle(e.target.value)}
          autoFocus
        />
        <input
          className="input input-bordered w-full"
          type="date"
          value={quickEventDate}
          onChange={e => setQuickEventDate(e.target.value)}
        />
        <div className="flex gap-2 mt-2">
          <button className="btn btn-primary btn-sm" onClick={onCreate}>
            Crear
          </button>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickCreateModal;