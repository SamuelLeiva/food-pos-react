import { useEffect, useState, type ReactNode } from "react";
import type { MenuItem } from "../../features/menu/types/MenuItem";
import { CartContext, type CartItem } from "./CartContext";

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Uso de localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return [];
    }
  });

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage:", error);
    }
  }, [cartItems]);

  // Function to add or update an item
  const addItem = (item: MenuItem, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.item.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevItems, { item, quantity }];
      }
    });
  };

  const removeItem = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.item.id !== itemId)
    );
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.item.id === itemId
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems: number = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const subtotal: number = cartItems.reduce(
    (acc, item) => acc + item.item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
