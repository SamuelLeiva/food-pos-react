import type { ICategory } from "./Category/ICategory";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isActive: boolean;
  category: ICategory;
}