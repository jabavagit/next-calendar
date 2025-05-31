export const formatDate = (date: Date, format: string): string => {
    const options: Intl.DateTimeFormatOptions = {};
    
    if (format.includes('year')) options.year = 'numeric';
    if (format.includes('month')) options.month = 'long';
    if (format.includes('day')) options.day = 'numeric';

    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const getStartOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getEndOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
};