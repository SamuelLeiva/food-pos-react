import { useState } from 'react';
import {
  PiHouse,
  PiChartBar,
  PiReceipt,
  PiGear,
  PiPlugs,
  PiX
} from 'react-icons/pi';

// El logo puede ser un SVG o una imagen
const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#3B82F6" /> {/* Usando un azul de Tailwind: blue-500 */}
    <path d="M20 28C24.4183 28 28 24.4183 28 20C28 15.5817 24.4183 12 20 12C15.5817 12 12 15.5817 12 20C12 24.4183 15.5817 28 20 28Z" fill="white" />
  </svg>
);

const menuItems = [
  { id: 'home', icon: <PiHouse size={24} /> },
  { id: 'stats', icon: <PiChartBar size={24} /> },
  { id: 'receipts', icon: <PiReceipt size={24} /> },
  { id: 'plugins', icon: <PiPlugs size={24} /> },
];

type SidebarProps = {
  onClose?: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <nav className="sticky top-0 h-screen w-20 md:w-20 flex flex-col justify-between items-center bg-white border-r border-gray-200 py-6">
      <div className="flex flex-col items-center gap-10 w-full"> {/* Añadimos w-full */}
        {/* Botón para cerrar en móviles */}
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 md:hidden">
            <PiX size={24} />
          </button>
        )}

        {/* Logo */}
        <div className="cursor-pointer">
          <Logo />
        </div>

        {/* Menú de Navegación */}
        <ul className="flex flex-col items-center gap-6">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                if (onClose) onClose(); // Cierra el menú en móviles al seleccionar
              }}
              className={`
                w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer
                transition-colors duration-200 ease-in-out
                ${
                  activeItem === item.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-blue-500'
                }
              `}
            >
              {item.icon}
            </li>
          ))}
        </ul>
      </div>

      {/* Menú inferior (Configuración) */}
      <div className="w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-blue-500 transition-colors duration-200 ease-in-out">
        <PiGear size={24} />
      </div>
    </nav>
  );
};