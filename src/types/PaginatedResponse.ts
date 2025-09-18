export interface PaginatedResponse<T> {
    search: null | number;
    pageIndex: number;
    pageSize: number;
    total: number;
    registers: T[];
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}