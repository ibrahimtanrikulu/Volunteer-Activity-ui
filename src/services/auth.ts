// src/services/auth.ts
import { api } from "../lib/api";

type LoginInput =
  | { username: string; password: string } // Seçenek A
  | { email: string; password: string };   // Seçenek B (email patch'i yaptıysan)

type userResponse = {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: "volunteer" | "organization" | "admin";
  };
};

type registerInput = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  role: string;
};

export async function login(body: LoginInput): Promise<userResponse> {  
  const { data } = await api.post<userResponse>(
    "/api/accounts/auth/token/",
    body as any
  );

  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function Register(body: registerInput): Promise<userResponse> {  
  const { data } = await api.post<userResponse>(
    "/api/accounts/register/",
    body as any
  ); 
  return data;
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
}

export function getStoredUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}
