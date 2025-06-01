export interface ShiftType {
  id: number;
  name: string;
  color: string;
  horaInicio: string;
  horaSalida: string;
}

export interface EventType {
  id: number;
  title: string;
  date: Date;
  shiftId?: number;
}

export interface CalendarType {
  id: number;
  name: string;
  events: EventType[];
  shifts: ShiftType[];
}

// Funciones para setState
export type SetCalendarsFn = (
  calendars: CalendarType[] | ((prev: CalendarType[]) => CalendarType[]),
) => void;
export type SetSelectedCalendarIdFn = (id: number | null) => void;
