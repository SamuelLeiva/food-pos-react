import type { MenuItem } from "../types/MenuItem";
import type { PaginatedResponse } from "../types/PaginatedResponse";

const API_BASE_URL =
  "https://api20250917102933-bch7ehdme6d5geft.canadacentral-01.azurewebsites.net/api/products/category"; // Reemplaza con la URL de tu backend

export const fetchMenuItemsByCategory = async (
  categoryId: number,
  pageIndex: number = 1,
  pageSize: number = 5,
  search: string = " "
): Promise<PaginatedResponse<MenuItem>> => {
  // Simula la llamada a la API con la URL de la imagen
  const response = await fetch(`${API_BASE_URL}/${categoryId}?pageIndex=${pageIndex}&pageSize=${pageSize}&search=${search}`);
  const data = await response.json();
  return data;
};