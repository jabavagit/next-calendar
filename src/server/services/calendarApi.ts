import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import type { ICalendarExtended, IShiftExtended } from '@/interfaces/calendar.interface';

const API_URL = '/api/calendars';

export async function getCalendars(): Promise<ICalendarExtended[]> {
  const data = await apiGet<ICalendarExtended[]>(API_URL);
  return data;
}

export async function createCalendar(calendar: Omit<ICalendarExtended, 'id'>): Promise<ICalendarExtended> {
  return apiPost<ICalendarExtended>(API_URL, calendar);
}

export async function updateCalendar(calendar: ICalendarExtended): Promise<ICalendarExtended> {
  return apiPut<ICalendarExtended>(API_URL, calendar);
}

export async function deleteCalendar(id: number): Promise<void> {
  return apiDelete(`${API_URL}?id=${id}`);
}

export async function addShiftToCalendar(calendarId: number, shift: IShiftExtended): Promise<IShiftExtended> {
  return apiPut<IShiftExtended>(API_URL, { calendarId, shift });
}