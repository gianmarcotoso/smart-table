export type PaginationOptions = {
    pageSize: number;
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
    setActivePage: import("react").Dispatch<import("react").SetStateAction<number>>;
};
