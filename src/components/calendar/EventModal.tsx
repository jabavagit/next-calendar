import React, { useState, useEffect } from 'react';
import type { IEventExtended, IShiftExtended } from '@/interfaces/calendar.interface';
import { useShiftState } from '@/hooks/useShiftState';

export interface EventFormValues {
  id: number;
  date: Date;
  title: string;
  shift: IShiftExtended;
  isNew?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
}

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: EventFormValues) => void;
  eventTitle: string;
  setEventTitle: (v: string) => void;
  editingEvent: IEventExtended | null;
  selectedDate: Date | null;
  shifts: IShiftExtended[];
}

const EventModal: React.FC<EventModalProps> = ({
  open,
  onClose,
  onSave,
  eventTitle,
  setEventTitle,
  editingEvent,
  selectedDate,
  shifts = []
}) => {
  const {
    date, setDate,
    shift, setShift,
    newShift, setNewShift,
    handleShiftSelect,
    handleNewShiftChange,
  } = useShiftState(editingEvent, selectedDate, shifts);

  const handleSave = () => {
    let shiftToSave: IShiftExtended;
    if (shift === 'new') {
      shiftToSave = { ...newShift, id: Date.now(), isNew: true };
    } else {
      (shift as IShiftExtended).isEdit = true;
      shiftToSave = shift as IShiftExtended;
    }
    onSave({
      id: editingEvent?.id ?? Date.now(),
      date: new Date(date),
      title: eventTitle,
      shift: shiftToSave,
      isNew: !editingEvent,
      isEdit: !!editingEvent
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded shadow-lg min-w-[320px] flex flex-col gap-3 w-full max-w-md">
        <div className="text-lg font-semibold mb-2">
          {editingEvent ? 'Edit event' : 'New event'} -{' '}
          {date ? new Date(date + 'T00:00:00').toLocaleDateString() : ''}
        </div>
        <label className="block text-sm font-medium mb-1">Event name</label>
        <input
          className="input input-bordered w-full"
          placeholder="Event title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          autoFocus
        />
        <label className="block text-sm font-medium mt-2 mb-1">Date</label>
        <input
          type="date"
          className="input input-bordered w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label className="block text-sm font-medium mt-2 mb-1">Shift</label>
        <select
          className="input input-bordered w-full"
          value={
            shift === 'new'
              ? 'new'
              : typeof shift === 'object' && shift.id
                ? shift.id
                : ''
          }
          onChange={handleShiftSelect}
        >
          <option value="">Select a shift</option>
          {shifts.map(shiftOption => (
            <option key={shiftOption.id} value={shiftOption.id}>
              {shiftOption.name} ({shiftOption.startHour} - {shiftOption.endHour})
            </option>
          ))}
          <option value="new">+ New shift...</option>
        </select>
        {shift === 'new' && (
          <div className="mt-2 p-2 border rounded bg-gray-50 flex flex-col gap-2">
            <input
              className="input input-bordered"
              placeholder="Shift name"
              value={newShift.name}
              onChange={e => handleNewShiftChange('name', e.target.value)}
            />
            <input
              type="color"
              className="w-10 h-10"
              value={newShift.color}
              onChange={e => handleNewShiftChange('color', e.target.value)}
            />
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="time"
                className="input input-bordered flex-1"
                value={newShift.startHour}
                onChange={e => handleNewShiftChange('startHour', e.target.value)}
                placeholder="Start hour"
              />
              <input
                type="time"
                className="input input-bordered flex-1"
                value={newShift.endHour}
                onChange={e => handleNewShiftChange('endHour', e.target.value)}
                placeholder="End hour"
              />
            </div>
          </div>
        )}
        <div className="flex gap-2 mt-4">
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSave}
            disabled={!eventTitle || !date || (shift === 'new'
              ? !newShift.name || !newShift.startHour || !newShift.endHour
              : typeof shift === 'object' && !shift.id)}
          >
            {editingEvent ? 'Save' : 'Create'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
