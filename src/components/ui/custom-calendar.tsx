
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateRange {
    from: Date | undefined;
    to?: Date | undefined;
}

interface CustomCalendarProps {
    date?: Date | null; // For single mode
    dateRange?: DateRange; // For range mode
    mode?: 'single' | 'range';
    onChange?: (date: Date) => void; // For single mode
    onRangeChange?: (range: DateRange) => void; // For range mode
    className?: string;
}

export default function CustomCalendar({ date, dateRange, mode = 'single', onChange, onRangeChange, className }: CustomCalendarProps) {
    const [viewDate, setViewDate] = useState(date || (dateRange?.from) || new Date());

    useEffect(() => {
        if (mode === 'single' && date) {
            setViewDate(date);
        } else if (mode === 'range' && dateRange?.from) {
            setViewDate(dateRange.from);
        }
    }, [date, dateRange, mode]);

    // Helper functions
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const currentYear = viewDate.getFullYear();
    const currentMonth = viewDate.getMonth();

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const prevMonth = () => {
        setViewDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const nextMonth = () => {
        setViewDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        );
    };

    const isSameDay = (d1: Date, d2: Date) => d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentYear, currentMonth, day);

        if (mode === 'single') {
            onChange?.(newDate);
        } else {
            // Range logic
            let newRange: DateRange = { from: dateRange?.from, to: dateRange?.to };

            if (!newRange.from || (newRange.from && newRange.to)) {
                // Start selection over
                newRange = { from: newDate, to: undefined };
            } else {
                // Have 'from', select 'to'
                if (newDate < newRange.from) {
                    newRange = { from: newDate, to: undefined };
                } else {
                    newRange = { ...newRange, to: newDate };
                }
            }
            onRangeChange?.(newRange);
        }
    };

    const isSelected = (day: number) => {
        const checkDate = new Date(currentYear, currentMonth, day);
        if (mode === 'single') {
            if (!date) return false;
            return checkDate.toDateString() === date.toDateString();
        } else {
            if (!dateRange?.from) return false;
            if (dateRange.from.toDateString() === checkDate.toDateString()) return true;
            if (dateRange.to && dateRange.to.toDateString() === checkDate.toDateString()) return true;

            if (dateRange.from && dateRange.to) {
                return checkDate > dateRange.from && checkDate < dateRange.to;
            }
            return false;
        }
    };

    // Check if a day is in range (for styling middle differently if needed)
    const isInRange = (day: number) => {
        if (mode !== 'range' || !dateRange?.from || !dateRange?.to) return false;
        const checkDate = new Date(currentYear, currentMonth, day);
        return checkDate > dateRange.from && checkDate < dateRange.to;
    };

    const renderDays = () => {
        const days = [];
        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const isRangeStart = mode === 'range' && dateRange?.from && isSameDay(dateRange.from, new Date(currentYear, currentMonth, i));
            const isRangeEnd = mode === 'range' && dateRange?.to && isSameDay(dateRange.to, new Date(currentYear, currentMonth, i));
            const inRange = isInRange(i);

            const selected = mode === 'single' ? isSelected(i) : (isRangeStart || isRangeEnd);
            const today = isToday(i);

            days.push(
                <button
                    key={i}
                    onClick={(e) => {
                        e.preventDefault();
                        handleDateClick(i);
                    }}
                    className={cn(
                        "w-8 h-8 flex items-center justify-center text-sm rounded-full transition-all relative z-10",
                        selected ? "bg-white text-black font-bold shadow-lg" :
                            inRange ? "bg-white/20 text-white rounded-none" :
                                "text-gray-300 hover:bg-white/10 hover:text-white",
                        today && !selected && !inRange && "border border-white/20",
                        // Connector styles for ranges
                        isRangeStart && dateRange?.to && "rounded-r-none pr-1",
                        isRangeEnd && dateRange?.from && "rounded-l-none pl-1"
                    )}
                >
                    {i}
                </button>
            );
        }
        return days;
    };

    return (
        <div
            className={cn("p-4 bg-black border border-white/10 rounded-xl shadow-2xl w-[280px] relative z-50", className)}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between mb-4">
                <button onClick={(e) => { e.preventDefault(); prevMonth(); }} className="p-1 hover:bg-white/10 rounded-full text-white transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-white font-medium">
                    {months[currentMonth]} {currentYear}
                </div>
                <button onClick={(e) => { e.preventDefault(); nextMonth(); }} className="p-1 hover:bg-white/10 rounded-full text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="w-8 text-center text-xs text-gray-500">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 place-items-center">
                {renderDays()}
            </div>
        </div>
    );
}
