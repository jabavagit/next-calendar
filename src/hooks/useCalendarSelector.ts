import { CalendarType, SetCalendarsFn, SetSelectedCalendarIdFn } from '@/types/calendarTypes';
import { useState, useRef, useEffect } from 'react';

export function useCalendarSelector(
  calendars: CalendarType[],
  setCalendars: SetCalendarsFn,
  setSelectedCalendarId: SetSelectedCalendarIdFn,
) {
  const [newCalendarName, setNewCalendarName] = useState('');
  const [editingCalendarId, setEditingCalendarId] = useState<number | null>(null);
  const [editingCalendarName, setEditingCalendarName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const inputTooltipRef = useRef<HTMLDivElement>(null);
  const editTooltipRef = useRef<HTMLDivElement>(null);
  const deleteTooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showInput &&
        inputTooltipRef.current &&
        !inputTooltipRef.current.contains(event.target as Node)
      ) {
        setShowInput(false);
      }
      if (
        editingCalendarId !== null &&
        editTooltipRef.current &&
        !editTooltipRef.current.contains(event.target as Node)
      ) {
        setEditingCalendarId(null);
      }
      if (
        showDeleteConfirm &&
        deleteTooltipRef.current &&
        !deleteTooltipRef.current.contains(event.target as Node)
      ) {
        setShowDeleteConfirm(false);
      }
    }
    if (showInput || editingCalendarId !== null || showDeleteConfirm) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInput, editingCalendarId, showDeleteConfirm]);

  const handleCreateCalendar = () => {
    if (!newCalendarName.trim()) return;
    const newId = Math.max(0, ...calendars.map((c) => c.id)) + 1;
    setCalendars([...calendars, { id: newId, name: newCalendarName, events: [], shifts: [] }]);
    setNewCalendarName('');
    setShowInput(false);
    setSelectedCalendarId(newId);
  };

  const handleDeleteCalendar = (id: number) => {
    const filtered = calendars.filter((c) => c.id !== id);
    setCalendars(filtered);
    if (filtered.length) setSelectedCalendarId(filtered[0].id);
    else setSelectedCalendarId(null);
    setShowDeleteConfirm(false);
  };

  const handleRenameCalendar = (id: number) => {
    setCalendars((cals) =>
      cals.map((cal) => (cal.id === id ? { ...cal, name: editingCalendarName } : cal)),
    );
    setEditingCalendarId(null);
    setEditingCalendarName('');
  };

  return {
    newCalendarName,
    setNewCalendarName,
    editingCalendarId,
    setEditingCalendarId,
    editingCalendarName,
    setEditingCalendarName,
    showInput,
    setShowInput,
    showDeleteConfirm,
    setShowDeleteConfirm,
    inputTooltipRef,
    editTooltipRef,
    deleteTooltipRef,
    handleCreateCalendar,
    handleDeleteCalendar,
    handleRenameCalendar,
  };
}
