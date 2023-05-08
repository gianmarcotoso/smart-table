export declare enum SortDirection {
    Ascending = 0,
    Descending = 1
}
export type SortPredicate<T = any> = ((item: T) => string | number) | string | string[];
export declare const useSort: <T>(items: T[], predicate: SortPredicate, direction: SortDirection) => T[];
