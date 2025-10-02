import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../contexts/cart/useCart";
import { useEffect, useState } from "react";
import type {
  CreateOrderDto,
  CreateOrderItemDto,
} from "../features/menu/types/Order";
import OrderService from "../features/menu/services/orderService";
import { useAuth } from "../contexts/auth/useAuth";

export const CartPanel = () => {
  const { cartItems, updateQuantity, removeItem, subtotal, clearCart } =
    useCart();
  const { user } = useAuth();

  // States para la funcionalidad de pago
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const vat = subtotal * 0.0; // Assuming 0% VAT for now
  const discount = 0.0;
  const total = subtotal + vat - discount;

  // Mensaje de éxito que desaparece después de 5 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer); // Limpieza del timer
    }
  }, [successMessage]);

  // Procesar el pago y crear la orden
  const handleProceedPayment = async () => {
    if (cartItems.length === 0) {
      setError("No puedes crear una orden con el carrito vacío.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // 1. Mapear los items del carrito al formato esperado por el DTO
    const orderItems: CreateOrderItemDto[] = cartItems.map((item) => ({
      productId: item.item.id,
      quantity: item.quantity,
      // notes: item.notes // Si tienes notas en tu CartItem
    }));

    const orderData: CreateOrderDto = {
      orderItems: orderItems,
      receiptEmail: user?.email,
      status: "Pending",
    };

    try {
      // 2. Llamar al servicio para crear la orden
      const newOrder = await OrderService.createOrder(orderData);

      // 3. Éxito: Limpiar carrito y mostrar mensaje
      clearCart();
      setSuccessMessage(`¡Orden #${newOrder.id} creada y enviada a cocina!`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error al crear la orden:", err);
      // 4. Manejo de error
      setError(err.message || "Error al procesar el pago. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex-none w-96 hidden lg:block relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={clearCart}
        >
          Clear
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          cartItems.map((cartItem) => (
            <div key={cartItem.item.id} className="flex items-center gap-4">
              {/* ... Resto de la UI del item del carrito sin cambios ... */}
              <img
                src={cartItem.item.imageUrl}
                alt={cartItem.item.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">
                  {cartItem.item.name}
                </h4>
                <p className="text-sm text-gray-600">
                  ${cartItem.item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(cartItem.item.id, cartItem.quantity - 1)
                  }
                  className="p-1 rounded-full text-blue-600 hover:bg-blue-100"
                >
                  <FaMinus size={12} />
                </button>
                <span className="font-medium">{cartItem.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(cartItem.item.id, cartItem.quantity + 1)
                  }
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
      {/* Mensaje de Carga y Error */}
      {isLoading && (
        <div className="text-blue-600 font-semibold my-3">
          Cargando... Creando orden. Por favor, espera.
        </div>
      )}
      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded my-3 border border-red-300">
          {error}
        </div>
      )}
      <div className="border-t pt-4 space-y-2">
        {/* ... Resto de la UI de totales sin cambios ... */}
        <div className="flex justify-between">
          <span className="text-gray-600">Sub Total</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-red-500">
            -${discount.toFixed(2)}
          </span>
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
        <button className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg">
          Hold
        </button>
        <button
          className={`flex-1 text-white font-semibold py-2 rounded-lg transition-colors
                        ${
                          isLoading || cartItems.length === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
          onClick={handleProceedPayment}
          disabled={isLoading || cartItems.length === 0} // Deshabilita si carga o está vacío
        >
          {isLoading ? "Creando Orden..." : "Proceed Payment"}
        </button>
      </div>
      {/* Mensaje de Éxito Flotante */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-xl z-50 transition-opacity duration-500 animate-slideUp">
          {successMessage}
        </div>
      )}
      
    </div>
  );
};
