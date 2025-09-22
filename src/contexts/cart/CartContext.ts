import { createContext } from "react";
import type { MenuItem } from "../../features/menu/types/MenuItem";

// Define the type for a single item in the cart
export interface CartItem {
  item: MenuItem;
  quantity: number;
}

// Define the type for the CartContext
interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: MenuItem, quantity: number) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);