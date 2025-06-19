import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import type { IShiftExtended } from '@/interfaces/calendarTypes';

const API_URL = '/api/shifts';

export async function getShifts(): Promise<IShiftExtended[]> {
  return apiGet(API_URL);
}

export async function createShift(shift: Omit<IShiftExtended, 'id'>): Promise<IShiftExtended> {
  return apiPost(API_URL, shift);
}

export async function updateShift(shift: IShiftExtended): Promise<IShiftExtended> {
  return apiPut(API_URL, shift);
}

export async function deleteShift(id: number): Promise<void> {
  return apiDelete(`${API_URL}?id=${id}`);
}