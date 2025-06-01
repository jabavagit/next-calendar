import { EventType } from '@/components/calendar/types';
import { useState } from 'react';

export function useCalendarLogic(
  events: EventType[],
  onAddEvent: (e: EventType) => void,
  onEditEvent: (e: EventType) => void,
  onDeleteEvent: (e: EventType) => void,
) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);

  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [quickEventTitle, setQuickEventTitle] = useState('');
  const [quickEventDate, setQuickEventDate] = useState('');

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setEventTitle('');
    setEditingEvent(null);
  };

  const handleEditEvent = (event: EventType) => {
    setSelectedDate(event.date);
    setEventTitle(event.title);
    setEditingEvent(event);
  };

  const handleSaveEvent = () => {
    if (!eventTitle.trim() || !selectedDate) return;
    if (editingEvent) {
      onEditEvent({ ...editingEvent, title: eventTitle, date: selectedDate });
    } else {
      onAddEvent({ id: Date.now(), title: eventTitle, date: selectedDate });
    }
    setSelectedDate(null);
    setEventTitle('');
    setEditingEvent(null);
  };

  const handleDelete = (event: EventType) => {
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
