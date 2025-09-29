import { PRODUCTS_ROUTES_URL } from "../../../constants/apiRoutes";
import type { ApiResponse } from "../../../types/Responses";
import type { MenuItem } from "../types/MenuItem";
import type { PaginatedResponse } from "../types/PaginatedResponse";

export const fetchMenuItemsByCategory = async (
  categoryId: number,
  pageIndex: number = 1,
  pageSize: number = 5,
  search: string = " "
): Promise<PaginatedResponse<MenuItem>> => {
  const response = await fetch(`${PRODUCTS_ROUTES_URL}/category/${categoryId}?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);

  const fullResponse: ApiResponse<PaginatedResponse<MenuItem>>= await response.json();

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
  
  // ✅ CAMBIO CLAVE: Devolver solo la propiedad 'data' que contiene la PaginatedResponse
  return fullResponse.data;
};