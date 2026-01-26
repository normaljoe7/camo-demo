'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
    id: string;
    expeditionId: string;
    expeditionTitle: string;
    expeditionImage: string;
    startDate: Date;
    duration: string;
    passengers: number;
    packageType: string;
    pricePerPerson: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'id'>) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (item: Omit<CartItem, 'id'>) => {
        const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
        setItems(prev => [...prev, newItem]);
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalAmount = items.reduce((sum, item) => sum + (item.pricePerPerson * item.passengers), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
