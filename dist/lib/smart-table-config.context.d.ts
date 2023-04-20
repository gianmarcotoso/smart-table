import { ComponentType } from 'react';
type DeepPartialInner<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export type DeepPartial<T> = T extends object ? DeepPartialInner<T> : T;
export type SmartTableConfig = {
    components: {
        TableContainer: ComponentType<any> | keyof JSX.IntrinsicElements;
        Table: ComponentType<any> | keyof JSX.IntrinsicElements;
        TableHead: ComponentType<any> | keyof JSX.IntrinsicElements;
        TableBody: ComponentType<any> | keyof JSX.IntrinsicElements;
        TableHeader: ComponentType<any> | keyof JSX.IntrinsicElements;
        TableRow: ComponentType<any> | keyof JSX.IntrinsicElements;
        TableCell: ComponentType<any> | keyof JSX.IntrinsicElements;
        Paginator: ComponentType<any>;
        PaginatorItem: ComponentType<any>;
    };
    pagination: {
        showPaginatorAboveTable: boolean;
        showPaginatorBelowTable: boolean;
        maxPagesToShow: number;
        activePageItemClassName: string;
        useCustomPagination: boolean;
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
export declare const SmartTableContext: import("react").Context<SmartTableConfig>;
export declare function SmartTableConfigProvider({ config, children }: SmartTableConfigProps): JSX.Element;
export {};
