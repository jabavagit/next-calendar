import { toEventsExtended, toEventsBase } from '@/libs/event.transformers';
import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import type { IEvent, IEventExtended } from '@/interfaces/calendar.interface';

const API_URL = '/api/events';

export async function getEvents(): Promise<IEventExtended[]> {
  const data = await apiGet<IEvent[]>(API_URL);
  return toEventsExtended(data);
}

export async function createEvent(event: Omit<IEventExtended, 'id'>): Promise<IEventExtended> {
  const baseEvent = toEventsBase([event as IEventExtended])[0];
  const created = await apiPost<IEvent>(API_URL, baseEvent);
  return toEventsExtended([created])[0];
}

export async function updateEvent(event: IEventExtended): Promise<IEventExtended> {
  const baseEvent = toEventsBase([event])[0];
  const updated = await apiPut<IEvent>(API_URL, baseEvent);
  return toEventsExtended([updated])[0];
}

export async function deleteEvent(id: number): Promise<void> {
  return apiDelete(`${API_URL}?id=${id}`);
}

// --- Batch endpoints ---

export async function createEventsBatch(
  events: Omit<IEventExtended, 'id'>[],
): Promise<IEventExtended[]> {
  const baseEvents = toEventsBase(events as IEventExtended[]);
  const created = await apiPost<IEvent[]>(`${API_URL}/batch`, baseEvents);
  return toEventsExtended(created);
}

export async function updateEventsBatch(events: IEventExtended[]): Promise<IEventExtended[]> {
  const baseEvents = toEventsBase(events);
  const updated = await apiPut<IEvent[]>(`${API_URL}/batch`, baseEvents);
  return toEventsExtended(updated);
}
