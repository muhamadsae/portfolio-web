import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for persisted session (mock)
    const storedUser = localStorage.getItem('elevateai_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string) => {
    // Mock login
    const mockUser: User = {
      name: 'Office Pro',
      email: email,
      purchasedCourses: []
    };
    setUser(mockUser);
    localStorage.setItem('elevateai_user', JSON.stringify(mockUser));
  };

  const register = (name: string, email: string) => {
    // Mock register
    const newUser: User = {
      name,
      email,
      purchasedCourses: []
    };
    setUser(newUser);
    localStorage.setItem('elevateai_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('elevateai_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};