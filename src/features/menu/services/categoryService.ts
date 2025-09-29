import { CATEGORIES_ROUTES_URL } from "../../../constants/apiRoutes";
import type { ApiResponse } from "../../../types/Responses";
import type { Category } from "../types/Category";

export const fetchCategories = async () => {
  const response  = await fetch(CATEGORIES_ROUTES_URL);
  const fullResponse: ApiResponse<Category[]> = await response.json();
  const categories = fullResponse.data ?? []
  return categories;
};
