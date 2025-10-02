import { type AxiosResponse } from "axios";
import type { CreateOrderDto, Order } from "../types/Order";
import type { ApiResponse } from "../../../types/Responses";
import apiClient from "../../../utils/apiClient";
import type { PaginatedResponse } from "../types/PaginatedResponse";

const OrderService = {
  createOrder: async (data: CreateOrderDto): Promise<Order> => {
    const response: AxiosResponse<ApiResponse<Order>> = await apiClient.post(
      "orders",
      data
    );

    const fullResponse = response.data;

    if (!fullResponse.data) {
      // Asumimos que un código 201 exitoso siempre debería devolver la orden creada
      throw new Error(
        fullResponse.message ||
          "La orden fue creada, pero no se recibieron los detalles de la orden."
      );
    }

    return fullResponse.data;
  },
  getOrdersByUser: async (
    pageIndex: number = 1,
    pageSize: number = 5,
    search: string = " "
  ): Promise<PaginatedResponse<Order>> => {
    const response: AxiosResponse<ApiResponse<PaginatedResponse<Order>>> =
      await apiClient.get(
        `orders/me?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`,
        {
          params: {
            pageIndex,
            pageSize,
            search: search === " " ? undefined : search, // Axios omite params si el valor es undefined
          },
        }
      );
    const fullResponse = response.data;
    if (!fullResponse.data) {
    // Devuelve una PaginatedResponse con registros vacíos como fallback
    return {
      search: search,
      pageIndex: 1,
      pageSize: pageSize,
      total: 0,
      registers: [],
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    };
  }

  return fullResponse.data;
  },
};

export default OrderService;
