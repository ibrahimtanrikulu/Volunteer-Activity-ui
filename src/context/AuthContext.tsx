// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getStoredUser, logout as doLogout } from "../services/auth";

type Role = "volunteer" | "organization" | "admin";
type User = { id: number; email: string; username: string; role: Role; first_name?: string; last_name?: string };

type Ctx = {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
};

const Ctx = createContext<Ctx | null>(null);
export const useAuth = () => useContext(Ctx)!;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const u = getStoredUser();
    if (u) setUser(u);
  }, []);

  const logout = () => {
    doLogout();
    setUser(null);
  };

  return <Ctx.Provider value={{ user, setUser, logout }}>{children}</Ctx.Provider>;
}