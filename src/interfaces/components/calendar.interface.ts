export interface IShiftType {
  id?: number;
  name: string;
  color: string;
  startHour: string;
  endHour: string;
  isEdit?: boolean;
  isDelete?: boolean;
  isNew?: boolean;
}

export interface IEventType {
  id: number;
  date: Date;
  title: string;
  shiftId?: number;
  shift?: IShiftType;
}

export interface ICalendarType {
  id: number;
  name: string;
  events: IEventType[];
  shifts?: IShiftType[];
}