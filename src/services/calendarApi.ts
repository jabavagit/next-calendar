import { get } from 'http';
import type { ISCalendarType, ISShiftType } from '../interfaces/calendarTypes';
import { getCalendarsTransformer } from '@/libs/calendar.transformer';
import { ICalendarType } from '@/interfaces/components/calendar.interface';

const API_URL = '/api/calendars';

export async function getCalendars(): Promise<ICalendarType[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener calendarios');
  const data = await res.json();
  return getCalendarsTransformer(data);
}

export async function createCalendar(calendar: Omit<ISCalendarType, 'id'>): Promise<ISCalendarType> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(calendar),
  });
  if (!res.ok) throw new Error('Error al crear calendario');
  return res.json();
}

export async function updateCalendar(calendar: ISCalendarType): Promise<ISCalendarType> {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(calendar),
  });
  if (!res.ok) throw new Error('Error al actualizar calendario');
  return res.json();
}

export async function deleteCalendar(id: number): Promise<void> {
  const res = await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar calendario');
}

export async function addShiftToCalendar(calendarId: number, shift: ISShiftType): Promise<ISShiftType> {
  const res = await fetch(`/api/calendars`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ calendarId, shift }),
  });
  if (!res.ok) throw new Error('Error adding shift');
  return shift;
}