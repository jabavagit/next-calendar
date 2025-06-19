import { getEventsTransformer } from '@/libs/event.transformers';
import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import type { IEventExtended } from '@/interfaces/calendar.interface';

const API_URL = '/api/events';

export async function getEvents(): Promise<IEventExtended[]> {
  const data = await apiGet<IEventExtended[]>(API_URL);

  return getEventsTransformer(data);
}

export async function createEvent(event: Omit<IEventExtended, 'id'>): Promise<IEventExtended> {
  return apiPost<IEventExtended>(API_URL, event);
}

export async function updateEvent(event: IEventExtended): Promise<IEventExtended> {
  return apiPut<IEventExtended>(API_URL, event);
}

export async function deleteEvent(id: number): Promise<void> {
  return apiDelete(`${API_URL}?id=${id}`);
}