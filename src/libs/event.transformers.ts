import { IEvent, IEventExtended } from "@/interfaces/calendar.interface";

export const getEventsTransformer = (data: IEvent[]): IEventExtended[] => { 
  return data.map((event) => ({
    id: event.id,
    calendarId: event.calendarId,
    title: event.title,
    date: event.date,
    shiftsId: event.shiftsId || [],
    createdAt: event.createdAt || undefined,
    updatedAt: event.updatedAt || undefined,
    isEdit: false,
    isDelete: false,
    isNew: false,
    dateObject: event.date ? new Date(event.date) : undefined,
  }));
}