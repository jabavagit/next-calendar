import { IShift, IShiftExtended } from '@/interfaces/calendar.interface';

// Transforma un IShift en IShiftExtended
function toShiftExtended(shift: IShift): IShiftExtended {
  return {
    ...shift,
    isEdit: false,
    isDelete: false,
    isNew: false,
  };
}

// Transforma un array de IShift en IShiftExtended[]
export const toShiftsExtended = (data: IShift[]): IShiftExtended[] => data.map(toShiftExtended);

// Transforma un IShiftExtended en IShift (elimina campos extendidos)
export function toShiftBase(shift: IShiftExtended): IShift {
  const { isEdit, isDelete, isNew, ...base } = shift;
  return base;
}

// Transforma un array de IShiftExtended en IShift[]
export const toShiftsBase = (data: IShiftExtended[]): IShift[] => data.map(toShiftBase);
