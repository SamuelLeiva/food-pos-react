import type { ICategory } from "../Category/ICategory";

export interface IProduct{
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isActive: boolean;
    category: ICategory;
}