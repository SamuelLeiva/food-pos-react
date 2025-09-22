import { useState } from 'react';

type LoginFormProps = {
  onSwitchToRegister: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', { email, password });
    // Aquí iría la lógica para llamar al servicio de login
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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