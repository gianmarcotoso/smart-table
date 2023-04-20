import React from 'react';
import { DeepPartial, SmartTableConfig } from './smart-table-config.context';
type PaginatorItemProps = {
    active?: boolean;
    activeClassName?: string;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
    [x: string]: unknown;
};
export declare function PaginatorItem({ active, activeClassName, onClick, children, ...rest }: PaginatorItemProps): JSX.Element;
export type PaginatorProps = {
    activePage: number;
    pageCount: number;
    onSetActivePage: (number: number) => void;
    config?: DeepPartial<SmartTableConfig>;
};
export declare function Paginator({ activePage, pageCount, onSetActivePage, config }: PaginatorProps): JSX.Element | null;
export {};
