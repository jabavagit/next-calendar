export interface Event {
  id: string;
  title: string;
  date: string; // ISO format date
  description?: string;
}

export interface CalendarData {
  month: number; // 0-11 for January-December
  year: number;
  events: Event[];
}
