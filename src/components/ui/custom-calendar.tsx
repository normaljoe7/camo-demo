
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomCalendarProps {
    date: Date | null;
    onChange: (date: Date) => void;
    className?: string;
}

export default function CustomCalendar({ date, onChange, className }: CustomCalendarProps) {
    const [viewDate, setViewDate] = useState(date || new Date());

    useEffect(() => {
        if (date) {
            setViewDate(date);
        }
    }, [date]);

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

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentYear, currentMonth, day);
        onChange(newDate);
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        );
    };

    const isSelected = (day: number) => {
        if (!date) return false;
        return (
            day === date.getDate() &&
            currentMonth === date.getMonth() &&
            currentYear === date.getFullYear()
        );
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const renderDays = () => {
        const days = [];
        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
        }
        // Days of current month
        for (let i = 1; i <= daysInMonth; i++) {
            const selected = isSelected(i);
            const today = isToday(i);
            days.push(
                <button
                    key={i}
                    onClick={(e) => {
                        e.preventDefault();
                        handleDateClick(i);
                    }}
                    className={cn(
                        "w-8 h-8 flex items-center justify-center text-sm rounded-full transition-all",
                        selected ? "bg-white text-black font-bold" : "text-gray-300 hover:bg-white/10 hover:text-white",
                        today && !selected && "border border-white/20"
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
