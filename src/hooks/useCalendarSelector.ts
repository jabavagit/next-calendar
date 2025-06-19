import { createCalendar } from '@/server/services/calendarApi';
import { useState, useRef, useEffect } from 'react';
import { ICalendarType } from '@/interfaces/components/calendar.interface';

// Add the type definition for ISetSelectedCalendarIdFn if not already imported
type ISetSelectedCalendarIdFn = (id: number | null) => void;

// Add the type definition for ISetCalendarsFn
type ISetCalendarsFn = React.Dispatch<React.SetStateAction<ICalendarType[]>>;

export function useCalendarSelector(
  calendars: ICalendarType[],
  setCalendars: ISetCalendarsFn,
  setSelectedCalendarId: ISetSelectedCalendarIdFn,
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

  const handleCreateCalendar = async (newCalendar: Omit<ICalendarType, 'id'>) => {
    try {
      // Ensure shifts is always an array to match ISCalendarType
      const calendarToCreate = {
        ...newCalendar,
        shifts: newCalendar.shifts ?? [],
      };
      const created = await createCalendar(calendarToCreate as Omit<any, 'id'>);
      // Map 'created' to ICalendarType to ensure type compatibility
      const mappedCreated: ICalendarType = {
        ...created,
        shifts: (created.shifts ?? []).map((shift: any) => ({
          ...shift,
          id: shift.id ?? 0, // fallback if id is undefined
        })),
        events: (created.events ?? []).map((event: any) => ({
          ...event,
          shift: event.shift && {
            ...event.shift,
            id: event.shift.id ?? 0, // fallback if id is undefined
          },
        })),
      };
      setCalendars((prev) => [...prev, mappedCreated]);
      setSelectedCalendarId(mappedCreated.id);
    } catch (error) {
      // Maneja el error (puedes mostrar un toast, etc)
      console.error('Error al crear calendario', error);
    }
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
