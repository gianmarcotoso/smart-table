import { default as React, ComponentType } from 'react';
type DeepPartialInner<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export type DeepPartial<T> = T extends object ? DeepPartialInner<T> : T;
export type SmartTableConfig = {
    components: {
        TableContainer: ComponentType<any> | keyof React.JSX.IntrinsicElements;
        Table: ComponentType<any> | keyof React.JSX.IntrinsicElements;
        TableHead: ComponentType<any> | keyof React.JSX.IntrinsicElements;
        TableBody: ComponentType<any> | keyof React.JSX.IntrinsicElements;
        TableHeader: ComponentType<any> | keyof React.JSX.IntrinsicElements;
        TableRow: ComponentType<any> | keyof React.JSX.IntrinsicElements;
        TableCell: ComponentType<any> | keyof React.JSX.IntrinsicElements;
        Paginator: ComponentType<any>;
        PaginatorItem: ComponentType<any>;
    };
    table: {
        sortGlyphs: {
            Ascending: ComponentType<any>;
            Descending: ComponentType<any>;
        };
    };
    pagination: {
        showPaginatorAboveTable: boolean;
        showPaginatorBelowTable: boolean;
        maxPagesToShow: number;
        activePageItemClassName: string;
        useCustomPagination: boolean;
        paginatorClassName: string;
        paginatorItemClassName: string;
        glyphs: {
            FirstPage: ComponentType<any>;
            PreviousPage: ComponentType<any>;
            NextPage: ComponentType<any>;
            LastPage: ComponentType<any>;
            Ellipsis: ComponentType<any>;
        };
    };
};
export declare const DefaultSmartTableConfig: SmartTableConfig;
export type SmartTableConfigProps = {
    config: DeepPartial<SmartTableConfig>;
    children: React.ReactNode;
};
export declare const SmartTableContext: React.Context<SmartTableConfig>;
export declare function SmartTableConfigProvider({ config, children }: SmartTableConfigProps): import("react/jsx-runtime").JSX.Element;
export {};
