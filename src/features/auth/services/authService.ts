import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { tokenManager } from "../../../utils/tokenManager";
import type {
  LoginDto,
  RefreshTokenResponse,
  RegisterDto,
  UserDataDto,
} from "../types/auth";
import type { ApiResponse } from "../../../types/Responses";
import { AUTH_ROUTES_URL } from "../../../constants/apiRoutes";

// Instancia de Axios para manejar intercepciones y reintentos
const apiClient: AxiosInstance = axios.create({
  baseURL: AUTH_ROUTES_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el JWT a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers!["Authorization"] = `Bearer ${token}`;
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
          const res = await apiClient.post<RefreshTokenResponse>(
            "refresh-token",
            { refreshToken }
          );
          tokenManager.setAccessToken(res.data.token);
          tokenManager.setRefreshToken(res.data.refreshToken);
          // Vuelve a intentar la solicitud original con el nuevo token
          return apiClient(originalRequest);
        } catch (err) {
          // Si el refresh token falla, cierra la sesión
          tokenManager.clearTokens();
          // Redirige al usuario a la página de login o emite un evento
          // Aquí podrías usar una librería como 'history' o un contexto de React
          window.location.href = "/login";
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

const AuthService = {
  register: async (data: RegisterDto): Promise<void> => {
    const response: AxiosResponse<ApiResponse<unknown>> =
      await apiClient.post("register", data);

    const fullResponse = response.data;

    if (fullResponse.statusCode!==201) {
      throw new Error(
        fullResponse.message || "Registro fallido."
      );
    }
  },
  login: async (data: LoginDto): Promise<UserDataDto> => {
    // La respuesta de Axios contiene la estructura ApiResponse<UserDataDto> en su propiedad 'data'
    const response: AxiosResponse<ApiResponse<UserDataDto>> =
      await apiClient.post("token", data);

    const fullResponse = response.data;

    // 1. Verificar si la data útil existe
    if (!fullResponse.data) {
      // Lanzamos un error si la estructura es inválida
      throw new Error(
        fullResponse.message ||
          "Login exitoso, pero datos de usuario no recibidos."
      );
    }

    // 2. Devolvemos solo la data útil (UserDataDto)
    return fullResponse.data;
  },

  logout: () => {
    const refreshToken = tokenManager.getRefreshToken();
    if (refreshToken) {
      // Envía el token de actualización para revocarlo en el servidor
      return apiClient.post("logout", { refreshToken });
    }
    return Promise.resolve(); // Resuelve si no hay token que enviar
  },

  // Método para manejar la lógica de actualización del token manualmente si es necesario
  refreshToken: async (token: string): Promise<RefreshTokenResponse> => {
    const response: AxiosResponse<ApiResponse<RefreshTokenResponse>> =
      await apiClient.post("refresh-token", { refreshToken: token });

    const fullResponse = response.data;

    if (!fullResponse.data) {
      throw new Error(
        fullResponse.message ||
          "Fallo al refrescar el token o datos no recibidos."
      );
    }
    return fullResponse.data;
  },
};

export default AuthService;
