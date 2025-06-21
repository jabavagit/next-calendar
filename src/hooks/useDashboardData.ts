import { useEffect, useState } from "react";
import { db } from "@/db/calendarDB";
import { getDashboardData } from "@/server/services/api/dashboardApi";
import { ICalendar, IEvent, IShift } from "@/interfaces/calendar.interface";

export function useDashboardData() {
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (navigator.onLine) {
        const { calendars, events, shifts } = await getDashboardData();
        setCalendars(calendars);
        setEvents(events);
        setShifts(shifts);
        if (calendars.length > 0) setSelectedCalendarId(calendars[0].id);

        // Actualiza IndexedDB
        await db.calendars.clear();
        await db.calendars.bulkAdd(calendars);
        await db.events.clear();
        await db.events.bulkAdd(events);
        await db.shifts.clear();
        await db.shifts.bulkAdd(shifts);
      } else {
        // Carga desde IndexedDB
        const calendars = await db.calendars.toArray();
        const events = await db.events.toArray();
        const shifts = await db.shifts.toArray();
        setCalendars(calendars);
        setEvents(events);
        setShifts(shifts);
        if (calendars.length > 0) setSelectedCalendarId(calendars[0].id);
      }
    }
    fetchData();
  }, []);

  return {
    calendars,
    events,
    shifts,
    selectedCalendarId,
    setSelectedCalendarId,
    setCalendars,
    setEvents,
    setShifts,
  };
}