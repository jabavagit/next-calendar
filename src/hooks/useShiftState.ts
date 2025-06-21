import { IEventExtended, IShiftExtended } from '@/interfaces/calendar.interface';
import { useState, useEffect } from 'react';

export function useShiftState(
  editingEvent: IEventExtended | null,
  selectedDate: Date | null,
  shifts: IShiftExtended[],
) {
  const [date, setDate] = useState(selectedDate ? selectedDate.toISOString().slice(0, 10) : '');
  const [shift, setShift] = useState<IShiftExtended | string>('');
  const [newShift, setNewShift] = useState<IShiftExtended>({
    id: 0,
    name: '',
    color: '#000000',
    startHour: '',
    endHour: '',
  });

  useEffect(() => {
    if (editingEvent) {
      setDate(editingEvent.date ? editingEvent.date.slice(0, 10) : '');
      // Busca el shift por id en la lista de shifts usando shiftsId (array de id)
      if (editingEvent.shiftsId && editingEvent.shiftsId.length > 0) {
        // Si hay varios, selecciona el primero (ajusta según tu lógica)
        const found = shifts.find((s) => editingEvent.shiftsId!.includes(s.id));
        setShift(found || '');
      } else {
        setShift('');
      }
    } else if (selectedDate) {
      setDate(selectedDate.toISOString().slice(0, 10));
      setShift('');
    }
  }, [editingEvent, selectedDate, shifts]);

  return {
    date,
    setDate,
    shift,
    setShift,
    newShift,
    setNewShift,
    handleShiftSelect: (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (value === 'new') setShift('new');
      else setShift(shifts.find((s) => s.id === Number(value)) || '');
    },
    handleNewShiftChange: (field: keyof IShiftExtended, value: string) => {
      setNewShift((prev) => ({ ...prev, [field]: value }));
    },
  };
}
