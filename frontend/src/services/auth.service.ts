import api from '@/lib/axios';
import { AuthResponse, User } from '@/types';
import { z } from 'zod';

// Tipos para los inputs (usaremos esto en los formularios)
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Nombre requerido"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

// Las rutas aquí NO llevan '/api' porque ya está en la baseURL de axios
export const loginRequest = async (data: LoginInput) => {
  return await api.post<AuthResponse>('/auth/login', data);
};

export const registerRequest = async (data: RegisterInput) => {
  return await api.post<AuthResponse>('/auth/register', data);
};

export const logoutRequest = async () => {
  return await api.post('/auth/logout');
};

export const verifyTokenRequest = async () => {
  return await api.get<{ success: boolean; user: User }>('/auth/verify');
};