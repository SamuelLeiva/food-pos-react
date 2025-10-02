import React, { useState } from 'react';
import type { LoginDto } from '../types/auth';
import { useAuth } from '../../../contexts/auth/useAuth.ts';

type LoginFormProps = {
  onSwitchToRegister: () => void;
  onClose: () => void; // ✅ Prop para cerrar el modal
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onClose }) => {
  const [formData, setFormData] = useState<LoginDto>({ userName: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(formData);
      onClose(); // ✅ Cierra el modal si el login es exitoso
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Credenciales inválidas. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Log In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Log In
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <button onClick={onSwitchToRegister} className="text-blue-600 hover:underline font-medium">
          Sign up
        </button>
      </p>
    </div>
  );
};