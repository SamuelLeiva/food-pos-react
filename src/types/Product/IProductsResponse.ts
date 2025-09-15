import type { IProduct } from "./IProduct";

export interface IProductsResponse {
  search: string | null;
  pageIndex: number;
  pageSize: number;
  total: number;
  registers: IProduct[];
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
