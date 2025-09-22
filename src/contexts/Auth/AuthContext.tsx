import { createContext } from 'react';
import type { LoginDto, RegisterDto, UserDataDto } from '../../types/Auth/auth';

// Define el tipo de dato para el contexto de autenticación
export type AuthContextType = {
  user: UserDataDto | null;
  isAuthenticated: boolean;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
};

// Crea y exporta el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

