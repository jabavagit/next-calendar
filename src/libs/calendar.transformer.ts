import { ICalendar, ICalendarExtended } from '@/interfaces/calendar.interface';

// Transforma un ICalendar en ICalendarExtended
function toCalendarExtended(calendar: ICalendar): ICalendarExtended {
  return {
    ...calendar,
    type: calendar.type ?? '',
    active: calendar.active ?? false,
    isEdit: false,
    isDelete: false,
    isNew: false,
  };
}

// Transforma un array de ICalendar en ICalendarExtended[]
export const toCalendarsExtended = (data: ICalendar[]): ICalendarExtended[] =>
  data.map(toCalendarExtended);

// Transforma un ICalendarExtended en ICalendar (elimina campos extendidos)
export function toCalendarBase(calendar: ICalendarExtended): ICalendar {
  const { isEdit, isDelete, isNew, events, shifts, ...base } = calendar;
  return base;
}

// Transforma un array de ICalendarExtended en ICalendar[]
export const toCalendarsBase = (data: ICalendarExtended[]): ICalendar[] => data.map(toCalendarBase);
