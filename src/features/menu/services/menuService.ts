import type { AxiosResponse } from "axios";
import type { ApiResponse } from "../../../types/Responses";
import type { MenuItem } from "../types/MenuItem";
import type { PaginatedResponse } from "../types/PaginatedResponse";
import apiClient from "../../../utils/apiClient";

export const fetchMenuItemsByCategory = async (
  categoryId: number,
  pageIndex: number = 1,
  pageSize: number = 5,
  search: string = " "
): Promise<PaginatedResponse<MenuItem>> => {
  const response: AxiosResponse<ApiResponse<PaginatedResponse<MenuItem>>> =
    await apiClient.get(
      `products/category/${categoryId}?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`,
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
};
