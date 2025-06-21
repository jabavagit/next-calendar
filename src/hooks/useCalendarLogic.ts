import { EventFormValues } from '@/components/calendar/EventModal';
import { IEventExtended, IShiftExtended } from '@/interfaces/calendar.interface';
import { useState } from 'react';

// Utilidad para formatear fecha local a YYYY-MM-DD
function toLocalISODate(date: Date) {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 10);
}

export function useCalendarLogic(
  events: IEventExtended[],
  onSaveEvent: (e: IEventExtended) => void,
  onDeleteEvent?: (e: IEventExtended) => void,
) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [editingEvent, setEditingEvent] = useState<IEventExtended | null>(null);

  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [quickEventTitle, setQuickEventTitle] = useState('');
  const [quickEventDate, setQuickEventDate] = useState('');

  // Corrige la asignación de fecha para evitar desfase de zona horaria
  const handleDayClick = (date: Date) => {
    // Solo la parte de año, mes y día, sin hora
    
    setSelectedDate(new Date(toLocalISODate(date)));
    setEventTitle('');
    setEditingEvent(null);
  };
  
  const handleSaveEvent = (form: EventFormValues) => {
    if (!form.title.trim() || !form.date || !form.shift) return;

    const isEdit = !!editingEvent;
    // Usa toLocalISODate para guardar la fecha correctamente
    const dateString = typeof form.date === 'string'
      ? form.date
      : toLocalISODate(form.date);

    const eventToSave: IEventExtended = {
      id: isEdit ? editingEvent!.id : form.id ?? Date.now(),
      title: form.title,
      dateObject: new Date(dateString),
      calendarId: editingEvent?.calendarId ?? 0,
      date: dateString,
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
    //onDeleteEvent(event);
    setSelectedDate(null);
    setEventTitle('');
    setEditingEvent(null);
  };

  const handleQuickCreate = () => {
    if (!quickEventTitle.trim() || !quickEventDate) return;
    // Usa toLocalISODate para la fecha rápida
    const dateString = toLocalISODate(new Date(quickEventDate));
    onSaveEvent({
      id: Date.now(),
      title: quickEventTitle,
      date: dateString,
      calendarId: 0
    } as IEventExtended);
    setShowQuickCreate(false);
    setQuickEventTitle('');
    setQuickEventDate('');
  };

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
