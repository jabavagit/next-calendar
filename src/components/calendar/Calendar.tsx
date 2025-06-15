import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDayNames from './CalendarDayNames';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import QuickCreateModal from './QuickCreateModal';
import FloatingActionButton from './FloatingActionButton';
import { useCalendarLogic } from '../../hooks/useCalendarLogic';
import { IEventType, IShiftType } from '@/interfaces/components/calendar.interface';

interface CalendarProps {
  currentMonth: Date;
  events: IEventType[];
  fabPosition?: 'left' | 'right';
  shifts?: IShiftType[];
  onMonthChange: (newMonth: Date) => void;
  onAddEvent: (event: IEventType) => void;
  onEditEvent: (event: IEventType) => void;
  onDeleteEvent: (event: IEventType) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  events,
  fabPosition = 'right',
  shifts = [],
  onMonthChange,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Generar celdas del calendario
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay();
  startDay = startDay === 0 ? 6 : startDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getEventsForDate = (date: Date) =>
    events.filter((event) => {
      // Siempre convierte ambos a "YYYY-MM-DD" en local
      const cellDateStr = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
      ].join('-');
      const eventDateStr =
        typeof event.date === 'string'
          ? event.date
          : [
            event.date.getFullYear(),
            String(event.date.getMonth() + 1).padStart(2, '0'),
            String(event.date.getDate()).padStart(2, '0'),
          ].join('-');
      return eventDateStr === cellDateStr;
    });

  const cells: (
    | { type: 'blank' }
    | { type: 'day'; date: Date; dayNum: number; events: IEventType[] }
  )[] = [];
  for (let i = 0; i < startDay; i++) cells.push({ type: 'blank' });
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    cells.push({
      type: 'day',
      date,
      dayNum: i,
      events: getEventsForDate(date),
    });
  }
  while (cells.length % 7 !== 0) cells.push({ type: 'blank' });

  // Usa el hook para la lógica
  const logic = useCalendarLogic(events, onAddEvent, onEditEvent, onDeleteEvent);

  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const years = Array.from({ length: 11 }, (_, i) => year - 5 + i);

  const goToToday = () => {
    onMonthChange(new Date());
  };

  return (
    <div>
      <CalendarHeader
        year={year}
        month={month}
        months={months}
        years={years}
        onMonthChange={onMonthChange}
        goToToday={goToToday}
      />
      <CalendarDayNames />
      <CalendarGrid
        cells={cells}
        shifts={shifts}
        onDayClick={logic.handleDayClick}
        onEditEvent={logic.handleEditEvent}
        onDelete={logic.handleDelete}
      />
      <FloatingActionButton onClick={() => logic.setShowQuickCreate(true)} position={fabPosition} />
      <QuickCreateModal
        open={logic.showQuickCreate}
        onClose={() => logic.setShowQuickCreate(false)}
        onCreate={logic.handleQuickCreate}
        quickEventTitle={logic.quickEventTitle}
        setQuickEventTitle={logic.setQuickEventTitle}
        quickEventDate={logic.quickEventDate}
        setQuickEventDate={logic.setQuickEventDate}
      />
      <EventModal
        open={!!logic.selectedDate}
        onClose={() => {
          logic.setSelectedDate(null);
          logic.setEditingEvent(null);
        }}
        onSave={logic.handleSaveEvent}
        eventTitle={logic.eventTitle}
        setEventTitle={logic.setEventTitle}
        editingEvent={logic.editingEvent}
        selectedDate={logic.selectedDate}
        shifts={shifts}
      />
    </div>
  );
};

export default Calendar;
