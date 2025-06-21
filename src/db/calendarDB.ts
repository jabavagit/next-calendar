import { ICalendar, IEvent, IShift } from '@/interfaces/calendar.interface';
import Dexie, { Table } from 'dexie';

export class CalendarDB extends Dexie {
  calendars!: Table<ICalendar, number>;
  events!: Table<IEvent, number>;
  shifts!: Table<IShift, number>;

  constructor() {
    super('CalendarDB');
    this.version(1).stores({
      calendars: '++id, name',
      events: '++id, calendarId, date',
      shifts: '++id, name, startHour, endHour',
    });
  }
}

export const db = new CalendarDB();
