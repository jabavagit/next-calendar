export interface ICalendarExtended extends ICalendar {
  events?: IEventExtended[];
  shifts?: IShiftExtended[];
  isEdit?: boolean;
  isDelete?: boolean;
  isNew?: boolean;
}

export interface ICalendar {
  id: number;
  name: string;
  description?: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
  active: boolean;
}

export interface IShift {
  id: number;
  name: string;
  color: string;
  startHour: string;
  endHour: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEvent {
  id: number;
  calendarId: number;
  title: string;
  date: string; // formato ISO: "2025-06-20",
  shiftsId?: number[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IShiftExtended extends IShift {
  isEdit?: boolean;
  isDelete?: boolean;
  isNew?: boolean;
  dateObject?: Date; // Para uso en el cliente
}

export interface IEventExtended extends IEvent {
  isEdit?: boolean;
  isDelete?: boolean;
  isNew?: boolean;
  dateObject?: Date; // Para uso en el cliente
  shift?: IShiftExtended; // Para uso en el cliente
}

export interface ICalendarExtended extends ICalendar {
  events?: IEventExtended[];
  shifts?: IShiftExtended[];
  isEdit?: boolean;
  isDelete?: boolean;
  isNew?: boolean;
  dateObject?: Date; // Para uso en el cliente
}