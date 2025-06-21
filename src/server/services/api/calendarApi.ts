import { toCalendarsExtended, toCalendarsBase } from '@/libs/calendar.transformer';
import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import type { ICalendarExtended, IShiftExtended, ICalendar } from '@/interfaces/calendar.interface';

const API_URL = '/api/calendars';

export async function getCalendars(): Promise<ICalendarExtended[]> {
  const data = await apiGet<ICalendar[]>(API_URL);
  return toCalendarsExtended(data);
}

export async function createCalendar(
  calendar: Omit<ICalendarExtended, 'id'>,
): Promise<ICalendarExtended> {
  // Transforma a ICalendar antes de enviar
  const baseCalendar = toCalendarsBase([calendar as ICalendarExtended])[0];
  const created = await apiPost<ICalendar>(API_URL, baseCalendar);
  return toCalendarsExtended([created])[0];
}

export async function updateCalendar(calendar: ICalendarExtended): Promise<ICalendarExtended> {
  const baseCalendar = toCalendarsBase([calendar])[0];
  const updated = await apiPut<ICalendar>(API_URL, baseCalendar);
  return toCalendarsExtended([updated])[0];
}

export async function deleteCalendar(id: number): Promise<void> {
  return apiDelete(`${API_URL}?id=${id}`);
}

export async function addShiftToCalendar(
  calendarId: number,
  shift: IShiftExtended,
): Promise<IShiftExtended> {
  return apiPut<IShiftExtended>(API_URL, { calendarId, shift });
}

// --- Batch endpoints ---

export async function createCalendarsBatch(
  calendars: Omit<ICalendarExtended, 'id'>[],
): Promise<ICalendarExtended[]> {
  const baseCalendars = toCalendarsBase(calendars as ICalendarExtended[]);
  const created = await apiPost<ICalendar[]>(`${API_URL}/batch`, baseCalendars);
  return toCalendarsExtended(created);
}

export async function updateCalendarsBatch(
  calendars: ICalendarExtended[],
): Promise<ICalendarExtended[]> {
  const baseCalendars = toCalendarsBase(calendars);
  const updated = await apiPut<ICalendar[]>(`${API_URL}/batch`, baseCalendars);
  return toCalendarsExtended(updated);
}
