import React, { ComponentType, createContext } from 'react'

import { deepMerge } from './functions/deep-merge.fn'
import { DefaultPaginator, DefaultPaginatorItem } from './paginator.component'

type DeepPartialInner<T> = {
	[P in keyof T]?: DeepPartial<T[P]>
}

export type DeepPartial<T> = T extends object ? DeepPartialInner<T> : T

export type SmartTableConfig = {
	components: {
		TableContainer: ComponentType<any> | keyof React.JSX.IntrinsicElements
		Table: ComponentType<any> | keyof React.JSX.IntrinsicElements
		TableHead: ComponentType<any> | keyof React.JSX.IntrinsicElements
		TableBody: ComponentType<any> | keyof React.JSX.IntrinsicElements
		TableHeader: ComponentType<any> | keyof React.JSX.IntrinsicElements
		TableRow: ComponentType<any> | keyof React.JSX.IntrinsicElements
		TableCell: ComponentType<any> | keyof React.JSX.IntrinsicElements
		Paginator: ComponentType<any>
		PaginatorItem: ComponentType<any>
	}
	table: {
		sortGlyphs: {
			Ascending: ComponentType<any>
			Descending: ComponentType<any>
		}
	}
	pagination: {
		showPaginatorAboveTable: boolean
		showPaginatorBelowTable: boolean
		maxPagesToShow: number
		activePageItemClassName: string
		useCustomPagination: boolean
		paginatorClassName: string
		paginatorItemClassName: string
		glyphs: {
			FirstPage: ComponentType<any>
			PreviousPage: ComponentType<any>
			NextPage: ComponentType<any>
			LastPage: ComponentType<any>
			Ellipsis: ComponentType<any>
		}
	}
}

export const DefaultSmartTableConfig: SmartTableConfig = {
	components: {
		TableContainer: 'div',
		Table: 'table',
		TableHead: 'thead',
		TableBody: 'tbody',
		TableHeader: 'th',
		TableRow: 'tr',
		TableCell: 'td',
		Paginator: DefaultPaginator,
		PaginatorItem: DefaultPaginatorItem,
	},
	table: {
		sortGlyphs: {
			Ascending: () => <span>&#8593;</span>,
			Descending: () => <span>&#8595;</span>,
		},
	},
	pagination: {
		showPaginatorAboveTable: false,
		showPaginatorBelowTable: true,
		maxPagesToShow: 5,
		activePageItemClassName: 'active-page-item',
		useCustomPagination: false,
		paginatorClassName: 'paginator',
		paginatorItemClassName: 'paginator-item',
		glyphs: {
			FirstPage: () => <span>&laquo;</span>,
			PreviousPage: () => <span>&lsaquo;</span>,
			NextPage: () => <span>&rsaquo;</span>,
			LastPage: () => <span>&raquo;</span>,
			Ellipsis: () => <span>...</span>,
		},
	},
}

export type SmartTableConfigProps = {
	config: DeepPartial<SmartTableConfig>
	children: React.ReactNode
}

export const SmartTableContext = createContext(DefaultSmartTableConfig)

export function SmartTableConfigProvider({ config, children }: SmartTableConfigProps) {
	const mergedConfig = deepMerge(DefaultSmartTableConfig, config)

	return <SmartTableContext.Provider value={mergedConfig}>{children}</SmartTableContext.Provider>
}
