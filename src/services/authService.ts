import axios from "axios";
import { tokenManager } from "../utils/tokenManager";
import type { LoginDto, RefreshTokenResponse, RegisterDto, UserDataDto } from "../types/Auth/auth";

const API_URL = 'https://api20250917102933-bch7ehdme6d5geft.canadacentral-01.azurewebsites.net/api/users'; // Reemplaza con la URL de tu backend

// Instancia de Axios para manejar intercepciones y reintentos
const apiClient: Axios.AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el JWT a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar la expiración del token y la actualización
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Si la respuesta es 401 Unauthorized y no es una solicitud de Refresh Token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenManager.getRefreshToken();
      if (refreshToken) {
        try {
          const res = await apiClient.post<RefreshTokenResponse>('refresh-token', { refreshToken });
          tokenManager.setAccessToken(res.data.token);
          tokenManager.setRefreshToken(res.data.refreshToken);
          // Vuelve a intentar la solicitud original con el nuevo token
          return apiClient(originalRequest);
        } catch (err) {
          // Si el refresh token falla, cierra la sesión
          tokenManager.clearTokens();
          // Redirige al usuario a la página de login o emite un evento
          // Aquí podrías usar una librería como 'history' o un contexto de React
          window.location.href = '/login'; 
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

const AuthService = {
  register: (data: RegisterDto) => {
    return apiClient.post('register', data);
  },

  login: (data: LoginDto) => {
    return apiClient.post<UserDataDto>('token', data);
  },

  logout: () => {
    const refreshToken = tokenManager.getRefreshToken();
    if (refreshToken) {
      // Envía el token de actualización para revocarlo en el servidor
      return apiClient.post('logout', { refreshToken });
    }
    return Promise.resolve(); // Resuelve si no hay token que enviar
  },

  // Método para manejar la lógica de actualización del token manualmente si es necesario
  refreshToken: (token: string) => {
    return apiClient.post<RefreshTokenResponse>('refresh-token', { refreshToken: token });
  }
};

export default AuthService;