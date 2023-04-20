export declare function usePagination<T>(items?: T[], pageSize?: number): {
    pageItems: T[];
    pageCount: number;
    activePage: number;
    setActivePage: import("react").Dispatch<import("react").SetStateAction<number>>;
};
