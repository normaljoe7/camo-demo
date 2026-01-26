'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Booking {
    id: string;
    userId: string;
    userName: string;
    expeditionId: string;
    expeditionTitle: string;
    startDate: Date;
    endDate: Date; // Calculated from duration
    passengers: number;
    totalPrice: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    bookedAt: Date;
}

interface BookingContextType {
    bookings: Booking[];
    addBooking: (booking: Omit<Booking, 'id' | 'bookedAt'>) => void;
    updateBookingStatus: (id: string, status: Booking['status']) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    // Initial mock data for testing
    const [bookings, setBookings] = useState<Booking[]>([
        {
            id: '1',
            userId: 'user1',
            userName: 'John Doe',
            expeditionId: '1',
            expeditionTitle: 'Bandipur Safari',
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
            passengers: 2,
            totalPrice: '₹170,000',
            status: 'confirmed',
            bookedAt: new Date()
        }
    ]);

    const addBooking = (bookingData: Omit<Booking, 'id' | 'bookedAt'>) => {
        const newBooking: Booking = {
            ...bookingData,
            id: Math.random().toString(36).substr(2, 9),
            bookedAt: new Date()
        };
        setBookings(prev => [...prev, newBooking]);
    };

    const updateBookingStatus = (id: string, status: Booking['status']) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    };

    return (
        <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBookings() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBookings must be used within a BookingProvider');
    }
    return context;
}
