export type PaginationOptions = {
    pageSize: number;
    activePage?: number;
    totalItems?: number;
};
export type PaginationHookData<T> = {
    items: T[];
    options?: PaginationOptions;
    onPageChange?: (page: number) => void;
};
export declare function usePagination<T>({ items, options, onPageChange }: PaginationHookData<T>): {
    pageItems: T[];
    pageCount: number;
    activePage: number;
    setActivePage: (page: number) => void;
};
