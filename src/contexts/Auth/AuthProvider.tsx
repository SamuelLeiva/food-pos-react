import { useEffect, useState, type ReactNode } from "react";
import type { LoginDto, RegisterDto, UserDataDto } from "../../types/Auth/auth";
import AuthService from "../../services/authService";
import { tokenManager } from "../../utils/tokenManager";
import { AuthContext } from "./AuthContext";


type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataDto | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (data: LoginDto) => {
    try {
      const response = await AuthService.login(data);
      const userData = response.data;

      // Almacenar el token y la información del usuario
      tokenManager.setAccessToken(userData.token);
      tokenManager.setRefreshToken(userData.refreshToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      const response = await AuthService.register(data);
      // Al registrar, el backend puede devolver el token directamente o requerir un login posterior
      // Asumiendo que el backend te pide loguearte luego
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    // Llamar al servicio de logout y limpiar el estado y tokens
    AuthService.logout();
    tokenManager.clearTokens();
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
