import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import { API_BASE_URL } from "../constants/apiRoutes";
import { tokenManager } from "./tokenManager";
import type { ApiResponse } from "../types/Responses";
import type { RefreshTokenResponse } from "../features/auth/types/auth";

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para el jwt
apiClient.interceptors.request.use(
    (config) => {
        const token = tokenManager.getAccessToken();

        // Solo añade el header si es que hay token. Esto hace a nuestro apiClient universal
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar 401 y Refresh Token
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // La URL de refresh debe ser la absoluta o relativa a la BASE_URL
        const isRefreshTokenUrl = originalRequest.url?.includes('refresh-token');

        // Si es 401 Unauthorized y no es una solicitud de Refresh Token y no es un reintento
        if (error.response.status === 401 && !isRefreshTokenUrl && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = tokenManager.getRefreshToken();

            if (refreshToken) {
                try {
                    // Llama al endpoint de refresh
                    const res: AxiosResponse<ApiResponse<RefreshTokenResponse>> = await apiClient.post('users/refresh-token', { refreshToken });
                    
                    const tokens = res.data.data;
                    if (!tokens) throw new Error("No refresh token received.");

                    // Almacenar los nuevos tokens
                    tokenManager.setAccessToken(tokens.token);
                    tokenManager.setRefreshToken(tokens.refreshToken);

                    // Actualizar el header de la solicitud original con el nuevo token
                    originalRequest.headers.Authorization = `Bearer ${tokens.token}`;

                    // Reintentar la solicitud original
                    return apiClient(originalRequest);
                } catch (err) {
                    // Falló el refresh, forzar logout
                    tokenManager.clearTokens();
                    window.location.href = '/login'; 
                    return Promise.reject(err);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;