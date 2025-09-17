export interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
  note?: string;
}