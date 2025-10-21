'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getJson, putJson, deleteJson, fetchCsrfToken } from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  updateProfile: (data: { name: string; email: string }) => Promise<void>;
  changePassword: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);
      const response = await getJson<{ user: User }>('/api/profile/me');
      setUser(response.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: { name: string; email: string }) => {
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await putJson<{ user: User; message: string }>('/api/profile/me', data, csrfToken);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await putJson<{ message: string }>('/api/profile/me/password', data, csrfToken);
      return response;
    } catch (error) {
      console.error('Failed to change password:', error);
      throw error;
    }
  };

  const deleteAccount = async (password: string) => {
    try {
      const csrfToken = await fetchCsrfToken();
      const response = await deleteJson<{ message: string }>('/api/profile/me', { password }, csrfToken);
      setUser(null);
      return response;
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw error;
    }
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await postJson('/api/auth/logout', {});
      setUser(null);
    } catch (error) {
      console.error('Failed to logout:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  // Listen for storage events (when user logs in/out in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      refreshUser();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      loading,
      updateProfile,
      changePassword,
      deleteAccount,
      refreshUser,
      setUser,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
