import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../contexts/cart/useCart';

export const CartPanel = () => {
  const { cartItems, updateQuantity, removeItem, subtotal, clearCart } = useCart();

  const vat = subtotal * 0.0; // Assuming 0% VAT for now
  const discount = 0.0;
  const total = subtotal + vat - discount;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-none w-96 hidden lg:block">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
        <button className="text-gray-500 hover:text-red-500" onClick={clearCart}>
          Clear
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          cartItems.map(cartItem => (
            <div key={cartItem.item.id} className="flex items-center gap-4">
              <img src={cartItem.item.imageUrl} alt={cartItem.item.name} className="w-16 h-16 rounded-md object-cover" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{cartItem.item.name}</h4>
                <p className="text-sm text-gray-600">${cartItem.item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                  className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                >
                  <FaMinus size={12} />
                </button>
                <span className="font-medium">{cartItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                  className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                >
                  <FaPlus size={12} />
                </button>
              </div>
              <button
                onClick={() => removeItem(cartItem.item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <FaTrash size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Sub Total</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-red-500">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">VAT (0%)</span>
          <span className="font-medium">${vat.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg">Hold</button>
        <button className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg">Proceed Payment</button>
      </div>
    </div>
  );
};