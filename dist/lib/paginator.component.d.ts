import React from 'react';
import { DeepPartial, SmartTableConfig } from './smart-table-config.context';
type PaginatorItemProps = {
    active?: boolean;
    className?: string;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
    config?: DeepPartial<SmartTableConfig>;
    [x: string]: unknown;
};
export declare function DefaultPaginatorItem({ active, className, onClick, children, ...rest }: PaginatorItemProps): JSX.Element;
export type PaginatorProps = {
    activePage: number;
    pageCount: number;
    onSetActivePage: (number: number) => void;
    config?: DeepPartial<SmartTableConfig>;
    children?: React.ReactNode;
};
export declare function DefaultPaginator({ children }: PaginatorProps): JSX.Element;
export declare function Paginator({ activePage, pageCount, onSetActivePage, config }: PaginatorProps): JSX.Element | null;
export {};
