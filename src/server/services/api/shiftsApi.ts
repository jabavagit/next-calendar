import { IShift, IShiftExtended } from '@/interfaces/calendar.interface';
import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import { toShiftsExtended, toShiftsBase } from '@/libs/shift.transformer';

const API_URL = '/api/shifts';

export async function getShifts(): Promise<IShiftExtended[]> {
  const data = await apiGet<IShift[]>(API_URL);
  return toShiftsExtended(data);
}

export async function createShift(shift: Omit<IShiftExtended, 'id'>): Promise<IShiftExtended> {
  const baseShift = toShiftsBase([shift as IShiftExtended])[0];
  const created = await apiPost<IShift>(API_URL, baseShift);
  return toShiftsExtended([created])[0];
}

export async function updateShift(shift: IShiftExtended): Promise<IShiftExtended> {
  const baseShift = toShiftsBase([shift])[0];
  const updated = await apiPut<IShift>(API_URL, baseShift);
  return toShiftsExtended([updated])[0];
}

export async function deleteShift(id: number): Promise<void> {
  return apiDelete(`${API_URL}?id=${id}`);
}

// --- Batch endpoints ---

export async function createShiftsBatch(shifts: Omit<IShiftExtended, 'id'>[]): Promise<IShiftExtended[]> {
  const baseShifts = toShiftsBase(shifts as IShiftExtended[]);
  const created = await apiPost<IShift[]>(`${API_URL}/batch`, baseShifts);
  return toShiftsExtended(created);
}

export async function updateShiftsBatch(shifts: IShiftExtended[]): Promise<IShiftExtended[]> {
  const baseShifts = toShiftsBase(shifts);
  const updated = await apiPut<IShift[]>(`${API_URL}/batch`, baseShifts);
  return toShiftsExtended(updated);
}