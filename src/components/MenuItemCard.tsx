import React from 'react';
import type { MenuItem } from '../features/menu/types/MenuItem';
import { useCart } from '../contexts/cart/useCart';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(item, 1);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 relative">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-32 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-gray-800 font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-blue-600">
            ${item.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart} 
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            aria-label="Add to cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};