import axios, { type AxiosResponse } from "axios";
import { ORDERS_ROUTES_URL } from "../../../constants/apiRoutes";
import type { CreateOrderDto, Order } from "../types/Order";
import type { ApiResponse } from "../../../types/Responses";

const apiClient = axios.create({
    baseURL: ORDERS_ROUTES_URL, // Usamos la URL específica de orders
    headers: {
        'Content-Type': 'application/json',
    },
    // Nota: Si esta operación requiere autenticación,
    // incluir interceptores o headers de token aquí.
});

const OrderService = {
    createOrder: async (data: CreateOrderDto): Promise<Order> => {
        const response: AxiosResponse<ApiResponse<Order>> = await apiClient.post("/", data);

        const fullResponse = response.data;

        if (!fullResponse.data) {
            // Asumimos que un código 201 exitoso siempre debería devolver la orden creada
            throw new Error(fullResponse.message || 'La orden fue creada, pero no se recibieron los detalles de la orden.');
        }

        return fullResponse.data;
    }
};

export default OrderService;
