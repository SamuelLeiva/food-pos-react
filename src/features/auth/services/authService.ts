import { type AxiosResponse } from "axios";
import { tokenManager } from "../../../utils/tokenManager";
import type {
  LoginDto,
  RefreshTokenResponse,
  RegisterDto,
  UserDataDto,
} from "../types/auth";
import type { ApiResponse } from "../../../types/Responses";
import apiClient from "../../../utils/apiClient";

const AuthService = {
  register: async (data: RegisterDto): Promise<void> => {
    const response: AxiosResponse<ApiResponse<unknown>> =
      await apiClient.post("users/register", data);

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
      await apiClient.post("users/token", data);

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
      return apiClient.post("users/logout", { refreshToken });
    }
    return Promise.resolve(); // Resuelve si no hay token que enviar
  },

  // Método para manejar la lógica de actualización del token manualmente si es necesario
  refreshToken: async (token: string): Promise<RefreshTokenResponse> => {
    const response: AxiosResponse<ApiResponse<RefreshTokenResponse>> =
      await apiClient.post("users/refresh-token", { refreshToken: token });

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
