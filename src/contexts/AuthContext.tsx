import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful login - with specific IDs for each role
    const mockUser: User = {
      id: role === 'candidate' ? 'c1' : role === 'recruiter' ? 'r1' : 'admin1',
      email,
      name: role === 'candidate' ? 'Nguyen Van A' : role === 'recruiter' ? 'HR Manager' : 'Admin User',
      role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=0F2238&color=fff`,
      createdAt: new Date()
    };

    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    });

    // Store in localStorage for persistence
    localStorage.setItem('smartrecruit_user', JSON.stringify(mockUser));
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, role: UserRole) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=38B65F&color=fff`,
      createdAt: new Date()
    };

    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    });

    localStorage.setItem('smartrecruit_user', JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('smartrecruit_user');
  }, []);

  // Check for existing session on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('smartrecruit_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch {
        localStorage.removeItem('smartrecruit_user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
