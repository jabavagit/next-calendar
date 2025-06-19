import { IShiftExtended } from "@/interfaces/calendar.interface";
import { useState, useEffect } from "react";


const defaultShift: IShiftExtended = {
  id: Date.now(),
  eventId: 0,
  name: "",
  color: "",
  startHour: "",
  endHour: "",
  createdAt: ""
};

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function useShiftState(editingEvent: any, selectedDate: Date | null, shifts: IShiftExtended[]) {
  const [date, setDate] = useState(selectedDate ? toLocalDateString(selectedDate) : '');
  const [shift, setShift] = useState<IShiftExtended | 'new' | ''>(defaultShift);
  const [newShift, setNewShift] = useState<IShiftExtended>({
    id: Date.now(),
    name: '',
    color: '#e07a5f',
    startHour: '',
    endHour: '',
    eventId: 0,
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (selectedDate) setDate(toLocalDateString(selectedDate));
    if (editingEvent?.shiftId) {
      const found = shifts.find(s => s.id === editingEvent.shiftId);
      setShift(found ?? defaultShift);
    } else {
      setShift(defaultShift);
    }
  }, [selectedDate, editingEvent, shifts]);

  const handleShiftSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'new') setShift('new');
    else if (e.target.value === '') setShift(defaultShift);
    else {
      const found = shifts.find(s => s.id === Number(e.target.value));
      if (found) setShift(found);
    }
  };

  const handleNewShiftChange = (field: keyof IShiftExtended, value: string) => {
    setNewShift(prev => ({ ...prev, [field]: value }));
  };

  return {
    date, setDate,
    shift, setShift,
    newShift, setNewShift,
    handleShiftSelect,
    handleNewShiftChange,
  };
}