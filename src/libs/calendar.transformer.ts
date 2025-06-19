import { ISCalendarType } from "@/interfaces/calendarTypes";
import { ICalendarType } from "@/interfaces/components/calendar.interface";

export const getCalendarsTransformer = (data: ISCalendarType[]): ICalendarType[] => {
  return data.map((calendar) => ({
    id: calendar.id,
    name: calendar.name,
    events: calendar.events.map((event) => ({
      id: event.id,
      date: new Date(event.date),
      title: event.title,
      shiftId: event.id,
    })),
    shifts: calendar.shifts || [],
  }));
};

/* export const setCalendarsTransformer = (data: ICalendarType): ISCalendarType[] => {
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