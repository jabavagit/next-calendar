import { EventFormValues } from '@/components/calendar/EventModal';
import { IEventExtended, IShiftExtended } from '@/interfaces/calendar.interface';
import { useState } from 'react';

export function useCalendarLogic(
  events: IEventExtended[],
  onSaveEvent: (e: IEventExtended) => void,
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
  
  const handleSaveEvent = (form: EventFormValues) => {
    if (!form.title.trim() || !form.date || !form.shift) return;

    // Si hay un evento en edición, actualiza sus campos
    const isEdit = !!editingEvent;
    const eventToSave: IEventExtended = {
      id: isEdit ? editingEvent!.id : form.id ?? Date.now(),
      title: form.title,
      dateObject: new Date(form.date),
      calendarId: editingEvent?.calendarId ?? 0,
      date: new Date(form.date).toISOString(),
      shift: form.shift.isNew ? form.shift : form.shift,
      createdAt: isEdit ? editingEvent!.createdAt : new Date().toISOString(),
      isEdit: isEdit,
      isNew: !isEdit,
    };

    onSaveEvent(eventToSave);
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
    onSaveEvent({
      id: Date.now(),
      title: quickEventTitle,
      date: new Date(quickEventDate).toISOString(),
      calendarId: 0
    } as IEventExtended);
    setShowQuickCreate(false);
    setQuickEventTitle('');
    setQuickEventDate('');
  };

  // handleEditEvent solo prepara el formulario, no guarda
  const handleEditEvent = (event: IEventExtended) => {
    setSelectedDate(event.dateObject ? event.dateObject : new Date(event.date));
    setEventTitle(event.title);
    setEditingEvent(event);
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
