export interface PaginatedResponse<T> {
    search: null | string;
    pageIndex: number;
    pageSize: number;
    total: number;
    registers: T[];
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}