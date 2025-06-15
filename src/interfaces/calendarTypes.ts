export interface ISShiftType {
  id?: number;
  name: string;
  color: string;
  startHour: string;
  endHour: string;
  isEdit?: boolean;
  isDelete?: boolean;
  isNew?: boolean;
}

export interface ISEventType {
  id: number;
  title: string;
  date: Date;
  shift?: ISShiftType;
}

export interface ISCalendarType {
  id: number;
  name: string;
  events: ISEventType[];
  shifts: ISShiftType[];
}

// Funciones para setState
export type ISSetCalendarsFn = (
  calendars: ISCalendarType[] | ((prev: ISCalendarType[]) => ISCalendarType[]),
) => void;
export type ISSetSelectedCalendarIdFn = (id: number | null) => void;
