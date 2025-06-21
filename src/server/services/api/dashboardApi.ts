
import { ICalendarExtended, IEventExtended, IShiftExtended } from '@/interfaces/calendar.interface';
import { getCalendars } from './calendarApi';
import { getEvents } from './eventsApi';
import { getShifts } from './shiftsApi';

export async function getDashboardData(): Promise<{
  calendars: ICalendarExtended[];
  events: IEventExtended[];
  shifts: IShiftExtended[];
}> {
  const [calendars, events, shifts] = await Promise.all([
    getCalendars(),
    getEvents(),
    getShifts(),
  ]);
  return { calendars, events, shifts };
}