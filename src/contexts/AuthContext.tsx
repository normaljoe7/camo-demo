'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Mock User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  completedExpeditions: number; // 0 means new user, >0 means experienced
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (role?: 'user' | 'admin', completedExpeditions?: number) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial mock load
  useEffect(() => {
    // Check localStorage for persisted mock session
    const storedUser = localStorage.getItem('mock_user_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (role: 'user' | 'admin' = 'user', completedExpeditions: number = 0) => {
    const mockUser: User = {
      id: '1',
      name: role === 'admin' ? 'Admin User' : 'John Doe',
      email: 'user@example.com',
      completedExpeditions: completedExpeditions,
      role: role
    };
    setUser(mockUser);
    localStorage.setItem('mock_user_session', JSON.stringify(mockUser));
  };

  const signup = (name: string, email: string, password: string) => {
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      completedExpeditions: 0,
      role: 'user'
    };
    setUser(mockUser);
    localStorage.setItem('mock_user_session', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock_user_session');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      signup,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
