'use client';

import { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

export interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, type = 'info', isVisible, onClose, duration = 3000 }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const bgColors = {
        success: 'bg-green-900/40 border-green-500/30 text-green-400',
        error: 'bg-red-900/40 border-red-500/30 text-red-400',
        info: 'bg-zinc-900/80 border-white/10 text-white',
    };

    const icons = {
        success: <CheckCircle className="w-5 h-5 flex-shrink-0" />,
        error: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
        info: <Info className="w-5 h-5 flex-shrink-0 text-accent" />,
    };

    return (
        <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-4 px-6 py-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 animate-slide-in-right ${bgColors[type]} max-w-sm`}>
            {icons[type]}
            <p className="font-medium text-sm leading-snug">{message}</p>
            <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0 -mr-2"
            >
                <X className="w-4 h-4 opacity-70" />
            </button>
        </div>
    );
}
