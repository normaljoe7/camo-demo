'use client';

import { Calendar, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/button';

export default function UserMenu() {
    const { user, isLoggedIn, login, logout } = useAuth();

    if (isLoggedIn && user) {
        return (
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-accent uppercase tracking-wider font-bold">
                        {user.completedExpeditions} Expeditions
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={logout}
                        title="Logout"
                        className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                    {user.role === 'admin' && (
                        <div className="p-2 bg-accent/20 rounded-full text-accent" title="Admin">
                            <Shield className="w-4 h-4" />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                onClick={() => login('user', 0)}
                variant="outline"
                className="text-xs py-2 h-auto"
            >
                Login
            </Button>
            {/* Dev Tools for testing */}
            <div className="hidden group-hover:flex flex-col absolute top-full mt-2 bg-black p-2 border border-white/20 rounded-lg">
                <button onClick={() => login('user', 0)} className="text-xs text-gray-400 hover:text-white p-1">New User</button>
                <button onClick={() => login('user', 2)} className="text-xs text-gray-400 hover:text-white p-1">Exp. User</button>
                <button onClick={() => login('admin', 5)} className="text-xs text-gray-400 hover:text-white p-1">Admin</button>
            </div>
        </div>
    );
}
