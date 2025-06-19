import { EventFormValues } from '@/components/calendar/EventModal';
import { IEventType, IShiftType } from '@/interfaces/components/calendar.interface';
import { useState } from 'react';

export function useCalendarLogic(
  events: IEventType[],
  onAddEvent: (e: IEventType) => void,
  onEditEvent: (e: IEventType) => void,
  onDeleteEvent: (e: IEventType) => void,
) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [editingEvent, setEditingEvent] = useState<IEventType | null>(null);

  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [quickEventTitle, setQuickEventTitle] = useState('');
  const [quickEventDate, setQuickEventDate] = useState('');

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setEventTitle('');
    setEditingEvent(null);
  };

  const handleEditEvent = (event: IEventType) => {
    setSelectedDate(typeof event.date === 'string' ? new Date(event.date) : event.date);
    setEventTitle(event.title);
    setEditingEvent(event);
  };

  const handleSaveEvent = ({ id, date, title, shift }: EventFormValues) => {
    if (!title.trim() || !date || !shift) return;

    const eventToSave: IEventType = {
      id: id ?? Date.now(),
      title,
      date,
      shift,
    };

    if (shift.isNew) {
      onAddEvent(eventToSave);
    } else if (editingEvent) {
      onEditEvent(eventToSave);
    } 

    setSelectedDate(null);
    setEventTitle('');
    setEditingEvent(null);
  };

  const handleDelete = (event: IEventType) => {
    onDeleteEvent(event);
    setSelectedDate(null);
    setEventTitle('');
    setEditingEvent(null);
  };

  const handleQuickCreate = () => {
    if (!quickEventTitle.trim() || !quickEventDate) return;
    onAddEvent({
      id: Date.now(),
      title: quickEventTitle,
      date: new Date(quickEventDate),
      shift: undefined, // O puedes pedir un shift por defecto si lo necesitas
    });
    setShowQuickCreate(false);
    setQuickEventTitle('');
    setQuickEventDate('');
  };

  return {
    selectedDate,
    setSelectedDate,
    eventTitle,
    setEventTitle,
    editingEvent,
    setEditingEvent,
    showQuickCreate,
    setShowQuickCreate,
    quickEventTitle,
    setQuickEventTitle,
    quickEventDate,
    setQuickEventDate,
    handleDayClick,
    handleEditEvent,
    handleSaveEvent,
    handleDelete,
    handleQuickCreate,
  };
}
