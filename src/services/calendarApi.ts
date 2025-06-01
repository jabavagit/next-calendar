import type { CalendarType } from '../types/calendarTypes';

const API_URL = '/api/calendars';

export async function getCalendars(): Promise<CalendarType[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener calendarios');
  return res.json();
}

export async function createCalendar(calendar: Omit<CalendarType, 'id'>): Promise<CalendarType> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(calendar),
  });
  if (!res.ok) throw new Error('Error al crear calendario');
  return res.json();
}

export async function updateCalendar(calendar: CalendarType): Promise<CalendarType> {
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