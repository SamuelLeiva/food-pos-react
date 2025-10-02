export type CreateOrderItemDto = {
  productId: number;
  quantity: number;
};

export type CreateOrderDto = {
  orderItems: CreateOrderItemDto[];
  receiptEmail: string | undefined;
  status: string;
};

export type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    productId: number;
    productName: string;
}

export type Order = {
  id: number;
  status: number;
  totalAmount: number;
  paymentIntentId: string;
  stripeCustomerId: string;
  receiptEmail: string;
  orderItems: OrderItem
};
