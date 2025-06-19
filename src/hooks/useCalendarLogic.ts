import { EventFormValues } from '@/components/calendar/EventModal';
import { IEventExtended, IShiftExtended } from '@/interfaces/calendar.interface';
import { useState } from 'react';

export function useCalendarLogic(
  events: IEventExtended[],
  onAddEvent: (e: IEventExtended) => void,
  onEditEvent: (e: IEventExtended) => void,
  onDeleteEvent: (e: IEventExtended) => void,
) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [editingEvent, setEditingEvent] = useState<IEventExtended | null>(null);

  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [quickEventTitle, setQuickEventTitle] = useState('');
  const [quickEventDate, setQuickEventDate] = useState('');

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setEventTitle('');
    setEditingEvent(null);
  };

  const handleEditEvent = (event: IEventExtended) => {
    setSelectedDate(event.dateObject ? event.dateObject : new Date(event.date));
    setEventTitle(event.title);
    setEditingEvent(event);
  };

  const handleSaveEvent = ({ id, date, title, shift }: EventFormValues) => {
    if (!title.trim() || !date || !shift) return;

    const eventToSave: IEventExtended = {
      id: id ?? Date.now(),
      title,
      dateObject: new Date(date),
      calendarId: 0,
      date: new Date(date).toISOString()
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

  const handleDelete = (event: IEventExtended) => {
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
      date: new Date(quickEventDate).toISOString(),
      calendarId: 0
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
