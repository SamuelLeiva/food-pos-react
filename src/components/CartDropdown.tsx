
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useCart } from '../contexts/cart/useCart';
import { useState } from 'react';

export const CartDropdown = () => {
  const { cartItems, totalItems, subtotal } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const total = subtotal + subtotal * 0.0; // Assuming 0% VAT

  return (
    <div className="lg:hidden fixed bottom-4 right-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative"
      >
        <FaShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-end items-start pt-16">
          <div className="bg-white w-full h-full p-6 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-600">
              <FaTimes size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4">Your Cart</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty.</p>
              ) : (
                cartItems.map(cartItem => (
                  <div key={cartItem.item.id} className="flex items-center gap-4">
                    <img src={cartItem.item.imageUrl} alt={cartItem.item.name} className="w-16 h-16 rounded-md object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{cartItem.item.name}</h4>
                      <p className="text-sm text-gray-600">${cartItem.item.price.toFixed(2)}</p>
                      <p className="text-sm">Qty: {cartItem.quantity}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};