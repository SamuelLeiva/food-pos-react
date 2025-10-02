import { useEffect, useState, type ReactNode } from "react";
import type { LoginDto, RegisterDto, UserDataDto } from "../../features/auth/types/auth";
import AuthService from "../../features/auth/services/authService";
import { tokenManager } from "../../utils/tokenManager";
import { AuthContext } from "./AuthContext.ts";

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
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
      const userData: UserDataDto = await AuthService.login(data);

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
      await AuthService.register(data)
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
