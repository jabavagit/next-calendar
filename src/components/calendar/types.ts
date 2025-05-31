export interface ShiftType {
    id: number;
    name: string;
    color: string;
    horaInicio: string;
    horaSalida: string;
}

export interface EventType {
    id: number;
    date: Date;
    title: string;
    shiftId?: number;
}

export interface CalendarType {
    id: number;
    name: string;
    events: EventType[];
    shifts?: ShiftType[];
}