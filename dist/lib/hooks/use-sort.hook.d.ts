export declare enum SortDirection {
    Ascending = 0,
    Descending = 1
}
export type SortPredicateResult<T> = ((item: T) => string | number) | string | string[];
export type SortPredicate<T = any> = SortPredicateResult<T>;
export declare const useSort: <T>(items: T[], predicate: SortPredicate, direction: SortDirection) => T[];
