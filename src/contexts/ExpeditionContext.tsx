'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { expeditions as initialExpeditions } from '@/lib/constants';

export interface Expedition {
    id: number;
    title: string;
    description: string;
    fullDescription?: string; // Added for detail page
    duration: string;
    category: string;
    price: string;
    discountedPrice?: string; // Added for discounts
    season: string;
    image: string;
    highlights: string[];
    gallery?: string[]; // Added for detail page
    location?: string; // Added for detail page
    status: 'active' | 'paused'; // Added for admin
    availableDates?: string[]; // Added for booking
    floraFauna?: string;
    safariExperience?: string;
    safariTimings?: string;
    packages?: { name: string; price: string; desc: string }[];
    inclusions?: string[];
    exclusions?: string[];
    policy?: string;
}

interface ExpeditionContextType {
    expeditions: Expedition[];
    addExpedition: (expedition: Omit<Expedition, 'id'>) => void;
    updateExpedition: (id: number, updates: Partial<Expedition>) => void;
    deleteExpedition: (id: number) => void;
    toggleStatus: (id: number) => void;
    applyDiscount: (id: number | 'all', type: 'percent' | 'flat', value: number) => void;
}

const ExpeditionContext = createContext<ExpeditionContextType | undefined>(undefined);

export function ExpeditionProvider({ children }: { children: ReactNode }) {
    const [expeditions, setExpeditions] = useState<Expedition[]>([]);

    // Initialize with data from constants, enriched with new fields if missing
    useEffect(() => {
        // const stored = localStorage.getItem('expeditions_data');
        // if (stored) {
        //     setExpeditions(JSON.parse(stored));
        // } else {
        const enriched = initialExpeditions.map(exp => ({
            ...exp,
            fullDescription: exp.description, // Default if missing
            gallery: [exp.image],
            location: 'Unknown Location',
            status: 'active' as const,
            price: exp.price.replace(/,/g, ''), // Ensure clean number string if needed, currently keeping string format but will need parsing for math
        }));
        setExpeditions(enriched);
        // }
    }, []);

    // Sync to localStorage whenever expeditions change
    useEffect(() => {
        if (expeditions.length > 0) {
            localStorage.setItem('expeditions_data', JSON.stringify(expeditions));
        }
    }, [expeditions]);

    const addExpedition = (expedition: Omit<Expedition, 'id'>) => {
        const newId = Math.max(...expeditions.map(e => e.id), 0) + 1;
        setExpeditions([...expeditions, { ...expedition, id: newId }]);
    };

    const updateExpedition = (id: number, updates: Partial<Expedition>) => {
        setExpeditions(expeditions.map(e => e.id === id ? { ...e, ...updates } : e));
    };

    const deleteExpedition = (id: number) => {
        setExpeditions(expeditions.filter(e => e.id !== id));
    };

    const toggleStatus = (id: number) => {
        setExpeditions(expeditions.map(e =>
            e.id === id ? { ...e, status: e.status === 'active' ? 'paused' : 'active' } : e
        ));
    };

    const applyDiscount = (id: number | 'all', type: 'percent' | 'flat', value: number) => {
        setExpeditions(expeditions.map(e => {
            if (id !== 'all' && e.id !== id) return e;

            const currentPriceNum = parseFloat(e.price.replace(/[^0-9.-]+/g, ""));
            if (isNaN(currentPriceNum)) return e;

            let newPriceNum = currentPriceNum;
            if (type === 'percent') {
                newPriceNum = currentPriceNum * (1 - value / 100);
            } else {
                newPriceNum = currentPriceNum - value;
            }

            return {
                ...e,
                discountedPrice: `$${newPriceNum.toFixed(0)}`
            };
        }));
    };

    return (
        <ExpeditionContext.Provider value={{
            expeditions,
            addExpedition,
            updateExpedition,
            deleteExpedition,
            toggleStatus,
            applyDiscount
        }}>
            {children}
        </ExpeditionContext.Provider>
    );
}

export function useExpeditions() {
    const context = useContext(ExpeditionContext);
    if (context === undefined) {
        throw new Error('useExpeditions must be used within an ExpeditionProvider');
    }
    return context;
}
