import { useState } from 'react';
import { Modal } from '../components/Modal';
import { LoginForm } from '../features/Auth/LoginForm';
import { RegisterForm } from '../features/Auth/RegisterForm';

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'register'>('login');

  const openLoginModal = () => {
    setModalType('login');
    setIsModalOpen(true);
  };

  const openRegisterModal = () => {
    setModalType('register');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm p-4 flex justify-between items-center z-30">
        <h1 className="text-xl font-bold text-gray-800">
          FoodPos
        </h1>
        
        <div className="flex items-center gap-4">
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
        </div>
      </header>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalType === 'login' ? (
          <LoginForm onSwitchToRegister={openRegisterModal} />
        ) : (
          <RegisterForm onSwitchToLogin={openLoginModal} />
        )}
      </Modal>
    </>
  );
};