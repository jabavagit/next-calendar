import { ICalendar, ICalendarExtended } from "@/interfaces/calendar.interface";


/* export const setCalendarsTransformer = (data: ICalendarExtended): ICalendarExtended[] => {
  return data.map((calendar) => ({
    id: calendar.id,
    name: calendar.name,
    events: calendar.events.map((event) => ({
      id: event.id,
      date: event.date.toISOString(),
      title: event.title,
      shiftId: event.shiftId,
    })),
    shifts: calendar.shifts?.map((shift) => ({
      id: shift.id,
      name: shift.name,
      color: shift.color,
      startHour: shift.startHour,
      endHour: shift.endHour,
    })) || [],
  }));
}; */