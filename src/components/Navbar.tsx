import { useState } from 'react';
import { Modal } from './ui/Modal';
import { LoginForm } from '../features/auth/components/LoginForm';
import { RegisterForm } from '../features/auth/components/RegisterForm';
import { useAuth } from '../contexts/auth/useAuth';
// 💡 Importar el nuevo componente de contenido de órdenes
import { OrderHistoryContent } from '../features/order/components/OrderHistoryContent'; 

// ✅ Definimos el nuevo tipo para incluir el historial de órdenes
type ModalType = 'login' | 'register' | 'orders';

export const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType>('login'); // Usamos el nuevo tipo

    const { isAuthenticated, user, logout } = useAuth();

    const openLoginModal = () => {
        setModalType('login');
        setIsModalOpen(true);
    };

    const openRegisterModal = () => {
        setModalType('register');
        setIsModalOpen(true);
    };
    
    // ✅ Función para abrir el modal de órdenes
    const openOrdersModal = () => {
        setModalType('orders');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        logout();
        closeModal();
    };

    return (
        <>
            <header className="bg-white shadow-sm p-4 flex justify-between items-center z-30">
                <h1 className="text-xl font-bold text-gray-800">
                    FoodPos
                </h1>
                
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        // ✅ Condición: Si el usuario está autenticado
                        <>
                            {/* BOTÓN MY ORDERS */}
                            <button
                                onClick={openOrdersModal}
                                className="text-gray-600 font-medium hover:text-blue-600 transition-colors"
                            >
                                My Orders
                            </button>
                            
                            <span className="text-gray-800">
                                Hi, {user?.userName}!
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        // Condición: Si no está autenticado
                        <>
                            <button
                                onClick={openLoginModal}
                                className="text-gray-600 font-medium hover:text-gray-800 transition-colors"
                            >
                                Log in
                            </button>
                            <button
                                onClick={openRegisterModal}
                                className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                            >
                                Sign up
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* ✅ MODAL BASE CON RENDERIZADO CONDICIONAL DE CONTENIDO */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalType === 'login' ? (
                    <LoginForm onSwitchToRegister={openRegisterModal} onClose={closeModal} />
                ) : modalType === 'register' ? (
                    <RegisterForm onSwitchToLogin={openLoginModal} onClose={closeModal} />
                ) : (
                    // ✅ Renderiza el componente de historial de órdenes
                    // Hereda el comportamiento de cerrar del Modal base
                    <OrderHistoryContent /> 
                )}
            </Modal>
        </>
    );
};