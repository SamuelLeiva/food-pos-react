// src/types/auth.ts

// Tipos para los datos de entrada
export type RegisterDto = {
  names: string;
  firstSurname: string;
  lastSurname: string;
  email: string;
  userName: string;
  password: string;
};

export type LoginDto = {
  userName: string;
  password: string;
};

// Tipo para la respuesta de un inicio de sesión exitoso
export type UserDataDto = {
  isAuth: boolean;
  message: string;
  token: string;
  email: string;
  userName: string;
  roles: string[];
  refreshToken: string;
  refreshTokenExpiration: string;
};

// Tipo para la respuesta de la API de Refresh Token
export type RefreshTokenResponse = {
  isAuth: boolean;
  message: string;
  token: string;
  email: string;
  userName: string;
  roles: string[];
  refreshToken: string;
  refreshTokenExpiration: string;
};

// Tipo para la respuesta de la API genérica (éxito o error)
export type ApiResponse = {
  statusCode: number;
  message: string;
};