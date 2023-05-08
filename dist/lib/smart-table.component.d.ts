import { SortDirection, SortPredicate, SortPredicateResult } from './hooks/use-sort.hook';
import { DeepPartial, SmartTableConfig } from './smart-table-config.context';
export declare const DEFAULT_PAGE_SIZE = 25;
export type PaginationOptions = {
    pageSize: number;
    totalItems?: number;
};
export type TableColumn<T = Record<string, unknown>> = {
    key: string;
    title: string;
    getValue?: (item: T, index: number, items: T[]) => React.ReactNode;
    getSortProperty?: SortPredicateResult<T>;
    width?: number | string;
    headerClassName?: string;
    cellClassName?: string | ((item: T) => string);
    renderHeader?: (props: TableHeaderProps<T>) => React.ReactNode;
    value?: React.ReactNode;
};
export type SortPredicateMap<T> = {
    [key: string]: SortPredicate<T>;
};
export type SortProperties<T> = {
    direction: SortDirection;
    property: SortPredicate<T>;
};
export type TableHeaderProps<T> = {
    column: TableColumn<T>;
    sortProperties: SortProperties<T>;
    onSort: (property: SortPredicate) => void;
    config?: DeepPartial<SmartTableConfig>;
};
export type TableProps<T> = {
    columns: TableColumn<T>[];
    items: T[];
    getItemKey: (item: T) => string | number;
    tableClassName?: string;
    rowClassName?: string | ((item: T) => string);
    commonCellClassName?: string | ((item: T) => string);
    headerRowClassName?: string;
    onRowClick?: (item: T) => void;
    parseDatasetValue?: (value: string) => any;
    defaultSortProperties?: SortProperties<T>;
    config?: DeepPartial<SmartTableConfig>;
    paginationOptions?: PaginationOptions;
    onPageChange?: (page: number) => void;
};
export declare function TableHeader<T>({ column, sortProperties, onSort, config }: TableHeaderProps<T>): JSX.Element;
export declare function SmartTable<T extends Record<string, unknown>>({ columns, items, getItemKey, tableClassName, rowClassName, commonCellClassName, headerRowClassName, onRowClick, parseDatasetValue, defaultSortProperties, paginationOptions, onPageChange, config, }: TableProps<T>): JSX.Element;
