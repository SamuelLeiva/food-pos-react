import type { AxiosResponse } from "axios";
import type { ApiResponse } from "../../../types/Responses";
import apiClient from "../../../utils/apiClient";
import type { Category } from "../types/Category";

export const fetchCategories = async () => {
  const response: AxiosResponse<ApiResponse<Category[]>>  = await apiClient.get('categories');
  const fullResponse = response.data
  return fullResponse.data;
};
