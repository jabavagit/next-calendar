import { db } from '@/db/calendarDB';
import {
  getCalendars,
  createCalendarsBatch,
  updateCalendarsBatch,
} from '@/server/services/api/calendarApi';
import {
  getEvents,
  createEventsBatch,
  updateEventsBatch,
} from '@/server/services/api/eventsApi';
import {
  getShifts,
  createShiftsBatch,
  updateShiftsBatch,
} from '@/server/services/api/shiftsApi';
import type {
  ICalendar,
  ICalendarExtended,
  IEvent,
  IEventExtended,
  IShift,
  IShiftExtended,
} from '@/interfaces/calendar.interface';

// Sincroniza los calendarios locales con el backend usando batch
async function syncCalendars() {
  const localCalendars = await db.calendars.toArray();
  let remoteCalendars: ICalendar[] = [];
  try {
    remoteCalendars = await getCalendars();
  } catch (error) {
    console.error('Error obteniendo calendarios remotos:', error);
    return;
  }

  const toUpdate: ICalendarExtended[] = [];
  const toCreate: Omit<ICalendarExtended, 'id'>[] = [];

  for (const calendar of localCalendars) {
    const exists = remoteCalendars.some(c => c.id === calendar.id);
    if (exists) {
      toUpdate.push(calendar);
    } else {
      const { id, ...rest } = calendar;
      toCreate.push(rest as Omit<ICalendarExtended, 'id'>);
    }
  }

  try {
    if (toUpdate.length > 0) {
      await updateCalendarsBatch(toUpdate);
      console.log('Actualizados en backend (batch):', toUpdate);
    }
    if (toCreate.length > 0) {
      await createCalendarsBatch(toCreate);
      console.log('Creados en backend (batch):', toCreate);
    }
  } catch (error) {
    console.error('Error sincronizando calendarios:', error);
  }
}

// Sincroniza los eventos locales con el backend usando batch
async function syncEvents() {
  const localEvents = await db.events.toArray();
  let remoteEvents: IEvent[] = [];
  try {
    remoteEvents = await getEvents();
  } catch (error) {
    console.error('Error obteniendo eventos remotos:', error);
    return;
  }

  const toUpdate: IEventExtended[] = [];
  const toCreate: Omit<IEventExtended, 'id'>[] = [];

  for (const event of localEvents) {
    const exists = remoteEvents.some(e => e.id === event.id);
    if (exists) {
      toUpdate.push(event);
    } else {
      const { id, ...rest } = event;
      toCreate.push(rest as Omit<IEventExtended, 'id'>);
    }
  }

  try {
    if (toUpdate.length > 0) {
      await updateEventsBatch(toUpdate);
      console.log('Actualizados eventos en backend (batch):', toUpdate);
    }
    if (toCreate.length > 0) {
      await createEventsBatch(toCreate);
      console.log('Creados eventos en backend (batch):', toCreate);
    }
  } catch (error) {
    console.error('Error sincronizando eventos:', error);
  }
}

// Sincroniza los turnos locales con el backend usando batch
async function syncShifts() {
  const localShifts = await db.shifts.toArray();
  let remoteShifts: IShift[] = [];
  try {
    remoteShifts = await getShifts();
  } catch (error) {
    console.error('Error obteniendo turnos remotos:', error);
    return;
  }

  const toUpdate: IShiftExtended[] = [];
  const toCreate: Omit<IShiftExtended, 'id'>[] = [];

  for (const shift of localShifts) {
    const exists = remoteShifts.some(s => s.id === shift.id);
    if (exists) {
      toUpdate.push(shift);
    } else {
      const { id, ...rest } = shift;
      toCreate.push(rest as Omit<IShiftExtended, 'id'>);
    }
  }

  try {
    if (toUpdate.length > 0) {
      await updateShiftsBatch(toUpdate);
      console.log('Actualizados turnos en backend (batch):', toUpdate);
    }
    if (toCreate.length > 0) {
      await createShiftsBatch(toCreate);
      console.log('Creados turnos en backend (batch):', toCreate);
    }
  } catch (error) {
    console.error('Error sincronizando turnos:', error);
  }
}

// Sincroniza todo
async function syncWithBackend() {
  await syncCalendars();
  await syncEvents();
  await syncShifts();
}

export function onConnectionChange() {
  window.addEventListener('online', () => {
    console.log('Conexión restaurada. Sincronizando...');
    syncWithBackend();
  });

  window.addEventListener('offline', () => {
    console.log('Sin conexión. Guardando cambios localmente.');
  });
}

// Puedes llamar a onConnectionChange() al iniciar la app