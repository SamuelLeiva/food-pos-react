import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { PiList } from 'react-icons/pi'; // Ícono para el menú hamburguesa
import { Navbar } from './Navbar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 relative"> {/* Añadimos 'relative' */}
      
      {/* Sidebar para pantallas grandes */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Botón de Menú Hamburguesa para móviles */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg text-gray-600 bg-white shadow-md"
      >
        <PiList size={24} />
      </button>

      {/* Menú Overlay para móviles (aparece al hacer clic) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white shadow-lg w-64`}
      >
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} /> {/* Pasamos una prop para cerrar */}
      </div>

      <main className="flex-1 p-6 overflow-y-auto">
        <Navbar />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};