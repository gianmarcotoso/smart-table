import { useCallback, useEffect, useMemo, useState } from 'react'

import { isIntrinsicComponent } from './functions/is-intrinsic-component'
import { useConfig } from './hooks/use-config.hook'
import { PaginationOptions, usePagination } from './hooks/use-pagination.hook'
import { SortDirection, SortPredicate, useSort } from './hooks/use-sort.hook'
import { Paginator } from './paginator.component'
import { DeepPartial, SmartTableConfig } from './smart-table-config.context'
import { useStableCallback } from './hooks/use-stable-callback.hook'

export const DEFAULT_PAGE_SIZE = 25 // eslint-disable-line

export type TableColumn<T = Record<string, unknown>> = {
	key: string
	title: string
	getValue?: (item: T, index: number, items: T[]) => React.ReactNode
	getSortProperty?: SortPredicate<T>
	width?: number | string
	headerClassName?: string
	cellClassName?: string | ((item: T) => string)
	renderHeader?: (props: TableHeaderProps<T>) => React.ReactNode
	value?: React.ReactNode
}

export type SortPredicateMap<T> = { [key: string]: SortPredicate<T> }

export type SortProperties<T> = {
	direction: SortDirection
	property: SortPredicate<T>
}

export type TableHeaderProps<T> = {
	column: TableColumn<T>
	sortProperties: SortProperties<T>
	onSort: (property: SortPredicate) => void
	config?: DeepPartial<SmartTableConfig>
}

export type TableProps<T> = {
	columns: TableColumn<T>[]
	items: T[]
	getItemKey: (item: T) => string | number
	tableClassName?: string
	rowClassName?: string | ((item: T) => string)
	commonCellClassName?: string | ((item: T) => string)
	headerRowClassName?: string
	onRowClick?: (item: T) => void
	parseDatasetValue?: (value: string) => any
	sortProperties?: SortProperties<T>
	defaultSortProperties?: SortProperties<T>
	config?: DeepPartial<SmartTableConfig>
	paginationOptions?: PaginationOptions
	serverSideSorting?: boolean
	onSortChange?: (sortProperty: SortProperties<T>) => void
	onPageChange?: (page: number) => void
}

export function TableHeader<T>({ column, sortProperties, onSort, config }: TableHeaderProps<T>) {
	const _config = useConfig(config)
	const TableComponents = _config.components

	const isSortingSelected = useMemo(() => {
		return column.getSortProperty === sortProperties.property
	}, [column.getSortProperty, sortProperties.property])

	if (!column.getSortProperty) {
		return (
			<TableComponents.TableHeader key={column.key} className={column.headerClassName}>
				{column.title}
			</TableComponents.TableHeader>
		)
	}

	const SortGlyphs = _config.table.sortGlyphs

	const isSortable = !!column.getSortProperty
	const isSortingActive = !!column.getSortProperty && isSortingSelected

	const isIntrinsic = isIntrinsicComponent(TableComponents.TableHeader)

	if (isIntrinsic) {
		return (
			<TableComponents.TableHeader
				key={column.key}
				onClick={() => onSort(column.getSortProperty!)}
				className={column.headerClassName}
				data-is-sortable={isSortable}
			>
				{column.title}
				{isSortingActive &&
					(sortProperties.direction === SortDirection.Ascending ? (
						<SortGlyphs.Ascending />
					) : (
						<SortGlyphs.Descending />
					))}
			</TableComponents.TableHeader>
		)
	}

	return (
		<TableComponents.TableHeader
			key={column.key}
			onClick={() => onSort(column.getSortProperty!)}
			className={column.headerClassName}
			isSortable={isSortable}
		>
			{column.title}
			{isSortingActive &&
				(sortProperties.direction === SortDirection.Ascending ? (
					<SortGlyphs.Ascending />
				) : (
					<SortGlyphs.Descending />
				))}
		</TableComponents.TableHeader>
	)
}

export function SmartTable<T extends Record<string, unknown>>({
	columns,
	items = [],
	getItemKey,
	tableClassName = '',
	rowClassName = '',
	commonCellClassName = '',
	headerRowClassName = '',
	onRowClick,
	parseDatasetValue = (value) => value,
	sortProperties,
	defaultSortProperties,
	paginationOptions,
	onPageChange,
	serverSideSorting = false,
	onSortChange,
	config,
}: TableProps<T>) {
	const _config = useConfig(config)
	const stableOnSortChange = useStableCallback(
		onSortChange ??
			(() => {
				// do nothing
			}),
	)

	const [uncontrolledSortProperties, setUncontrolledSortProperties] = useState({
		property: defaultSortProperties?.property ?? getItemKey,
		direction: defaultSortProperties?.direction ?? SortDirection.Ascending,
	})

	const sortedItems = useSort(
		items,
		sortProperties?.property ?? uncontrolledSortProperties.property,
		sortProperties?.direction ?? uncontrolledSortProperties.direction,
	)

	const { pageItems, pageCount, activePage, setActivePage } = usePagination({
		items: serverSideSorting ? items : sortedItems,
		options: paginationOptions,
		onPageChange,
	})

	useEffect(() => {
		if (!paginationOptions?.totalItems) {
			setActivePage(paginationOptions?.activePage ?? 0)
		}
	}, [items, setActivePage, paginationOptions?.totalItems, paginationOptions?.activePage])

	const handleSortPropertyChange = useCallback(
		function handleSortPropertyChange(property: SortPredicate) {
			if (uncontrolledSortProperties.property === property) {
				stableOnSortChange({
					property,
					direction:
						uncontrolledSortProperties.direction === SortDirection.Ascending
							? SortDirection.Descending
							: SortDirection.Ascending,
				})

				setUncontrolledSortProperties((p) => {
					return {
						...p,
						direction:
							p.direction === SortDirection.Ascending
								? SortDirection.Descending
								: SortDirection.Ascending,
					}
				})

				return
			}

			stableOnSortChange({
				property,
				direction: SortDirection.Ascending,
			})

			setUncontrolledSortProperties({
				property,
				direction: SortDirection.Ascending,
			})
		},
		[stableOnSortChange, uncontrolledSortProperties],
	)

	const handleRowClick = useCallback(
		(event: React.MouseEvent<any>) => {
			if (onRowClick) {
				const item = items.find(
					(i) => getItemKey(i) === parseDatasetValue(event.currentTarget.dataset.itemkey ?? ''),
				)

				if (item) {
					onRowClick(item)
				}
			}
		},
		[items, onRowClick, getItemKey, parseDatasetValue],
	)

	const validColumns = columns.filter((c) => !!c)

	const TableComponents = _config.components

	return (
		<TableComponents.TableContainer>
			{_config.pagination.showPaginatorAboveTable && (
				<Paginator
					activePage={activePage}
					pageCount={pageCount}
					onSetActivePage={setActivePage}
					config={config}
				/>
			)}
			<TableComponents.Table className={tableClassName}>
				<TableComponents.TableHead>
					<TableComponents.TableRow className={headerRowClassName}>
						{validColumns.map((column) => {
							if (column.renderHeader) {
								return column.renderHeader({
									column,
									sortProperties: uncontrolledSortProperties,
									onSort: handleSortPropertyChange,
								})
							}

							return (
								<TableHeader
									column={column}
									sortProperties={uncontrolledSortProperties}
									onSort={handleSortPropertyChange}
									key={column.key}
								/>
							)
						})}
					</TableComponents.TableRow>
				</TableComponents.TableHead>
				<TableComponents.TableBody>
					{pageItems.map((item, index) => {
						const rowClass = typeof rowClassName === 'function' ? rowClassName(item) : rowClassName

						return (
							<TableComponents.TableRow
								onClick={handleRowClick}
								data-itemkey={getItemKey(item)}
								key={getItemKey(item)}
								className={rowClass}
							>
								{validColumns.map((column) => {
									const commonCellClass =
										typeof commonCellClassName === 'function'
											? commonCellClassName(item)
											: commonCellClassName

									const cellClass =
										typeof column.cellClassName === 'function'
											? column.cellClassName(item)
											: column.cellClassName

									return (
										<TableComponents.TableCell
											key={column.key}
											className={`${commonCellClass} ${cellClass}`}
											width={column.width}
										>
											{column.getValue?.(
												item,
												activePage * (paginationOptions?.pageSize ?? DEFAULT_PAGE_SIZE) + index,
												sortedItems,
											) ??
												(item[column.key] as React.ReactNode) ??
												column.value}
										</TableComponents.TableCell>
									)
								})}
							</TableComponents.TableRow>
						)
					})}
				</TableComponents.TableBody>
			</TableComponents.Table>
			{_config.pagination.showPaginatorBelowTable && (
				<Paginator
					activePage={activePage}
					pageCount={pageCount}
					onSetActivePage={setActivePage}
					config={config}
				/>
			)}
		</TableComponents.TableContainer>
	)
}
