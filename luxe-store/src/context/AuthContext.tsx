import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "@/types";
import { generateId } from "@/utils/helpers";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, _password: string) => Promise<boolean>;
  register: (name: string, email: string, _password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const MOCK_USER: User = {
  id: "u1", name: "Alex Morgan", email: "alex@example.com",
  avatar: "https://i.pravatar.cc/100?img=15",
  phone: "+44 7700 900123", addresses: [], createdAt: "2024-01-01",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>("luxe-user", null);

  const login = async (email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800)); // simulate network
    if (email && _password.length >= 6) {
      setUser({ ...MOCK_USER, email, id: generateId() });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1000));
    if (name && email && _password.length >= 6) {
      setUser({ ...MOCK_USER, name, email, id: generateId(), createdAt: new Date().toISOString() });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);
  const updateProfile = (data: Partial<User>) => setUser(prev => prev ? { ...prev, ...data } : null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
