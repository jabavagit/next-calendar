import { ICalendarExtended } from '@/interfaces/calendar.interface';
import React, { useRef, useEffect } from 'react';

interface TooltipInputProps {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (v: string) => void;
  onConfirm: (newCalendar: Omit<ICalendarExtended, "id">) => Promise<void>
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  placeholder?: string;
  inputType?: string;
  autoFocus?: boolean;
  children?: React.ReactNode;
  inputClassName?: string;
}

const TooltipInput: React.FC<TooltipInputProps> = ({
  open,
  onClose,
  value,
  onChange,
  onConfirm,
  onCancel,
  cancelLabel = '✖',
  placeholder = '',
  inputType = 'text',
  autoFocus = true,
  children,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={tooltipRef}
      className="absolute left-1/2 z-20 -translate-x-1/2 mt-2 p-5 rounded shadow border border-accent flex items-center min-w-[320px]"
      style={{ gap: 0 }}
    >
      <input
        className="input input-sm flex-1 h-9 rounded-none focus:outline-none focus: focus:ring-primary focus:border-primary bg-accent/10 text-neutral"
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        /* onKeyDown={(e) => {
          if (e.key === 'Enter') onConfirm();
        }} */
        autoFocus={autoFocus}
        style={{ minHeight: '36px' }}
      />
      {<button className="btn btn-sm btn-accent h-9 rounded-none">
        <span className="text-lg font-bold">+</span>
      </button>}
      <button
        className="btn btn-sm btn-ghost h-9 rounded-none rounded-r-md"
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        onClick={onCancel || onClose}
      >
        {cancelLabel}
      </button>
      {children}
    </div>
  );
};

export default TooltipInput;
