import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { CartPanel } from './CartPanel'; // Import the large-screen cart
import { CartDropdown } from './CartDropdown'; // Import the mobile cart

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 p-0 overflow-y-auto">
        <Navbar />
        <div className="p-6 flex gap-6"> {/* Use flexbox to arrange the main content and cart panel */}
          <div className="flex-1">
            {children}
          </div>
          <CartPanel /> {/* Display the large-screen cart panel */}
        </div>
      </main>
      <CartDropdown /> {/* Display the mobile cart dropdown */}
    </div>
  );
};