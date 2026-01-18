// src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('camoscapes_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('camoscapes_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Admin Logic
      if (email === 'admin@expedition.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin',
          name: 'Expedition Admin',
          email: email,
          avatar: 'https://ui-avatars.com/api/?name=Admin',
          isAdmin: true
        };
        setUser(adminUser);
        localStorage.setItem('camoscapes_user', JSON.stringify(adminUser));
        router.push('/admin');
        return;
      }

      // Regular User Logic (Mock)
      if (!email || !password) {
        throw new Error('Please enter email and password');
      }

      const mockUser: User = {
        id: '1',
        name: 'John Adventurer',
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        isAdmin: false
      };

      setUser(mockUser);
      localStorage.setItem('camoscapes_user', JSON.stringify(mockUser));

      // Redirect to dashboard
      router.push('/account/dashboard');

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!name || !email || !password) {
        throw new Error('Please fill all fields');
      }

      const mockUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        isAdmin: false
      };

      setUser(mockUser);
      localStorage.setItem('camoscapes_user', JSON.stringify(mockUser));

      router.push('/account/dashboard');

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('camoscapes_user');
    router.push('/');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('camoscapes_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
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
