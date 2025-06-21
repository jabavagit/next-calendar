import { IEvent, IEventExtended } from "@/interfaces/calendar.interface";

// Transforma un IEvent en IEventExtended
function toEventExtended(event: IEvent): IEventExtended {
  return {
    ...event,
    shiftsId: event.shiftsId || [],
    isEdit: false,
    isDelete: false,
    isNew: false,
    dateObject: event.date ? new Date(event.date) : undefined,
  };
}

// Transforma un array de IEvent en IEventExtended[]
export const toEventsExtended = (data: IEvent[]): IEventExtended[] =>
  data.map(toEventExtended);

// Transforma un IEventExtended en IEvent (elimina campos extendidos)
export function toEventBase(event: IEventExtended): IEvent {
  const { isEdit, isDelete, isNew, dateObject, ...base } = event;
  return base;
}

// Transforma un array de IEventExtended en IEvent[]
export const toEventsBase = (data: IEventExtended[]): IEvent[] => data.map(toEventBase);