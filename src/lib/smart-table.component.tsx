import { useEffect } from 'react'
import { useCallback, useMemo } from 'react'
import { useState } from 'react'

import { useConfig } from './hooks/use-config.hook'
import { usePagination } from './hooks/use-pagination.hook'
import { SortDirection, SortPredicate, SortPredicateResult, useSort } from './hooks/use-sort.hook'
import { Paginator } from './paginator.component'
import { DeepPartial, SmartTableConfig } from './smart-table-config.context'
import { isIntrinsicComponent } from './functions/is-intrinsic-component'

export type TableColumn<T = Record<string, unknown>> = {
	key: string
	title: string
	getValue?: (item: T, index: number, items: T[]) => React.ReactNode
	getSortProperty?: SortPredicateResult<T>
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
	defaultSortProperties?: SortProperties<T>
	pageSize?: number
	config?: DeepPartial<SmartTableConfig>
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
	defaultSortProperties,
	pageSize = 20,
	config,
}: TableProps<T>) {
	const _config = useConfig(config)

	const [sortProperties, setSortProperties] = useState({
		property: defaultSortProperties?.property ?? getItemKey,
		direction: defaultSortProperties?.direction ?? SortDirection.Ascending,
	})

	const sortedItems = useSort(items, sortProperties.property, sortProperties.direction)

	const { pageItems, pageCount, activePage, setActivePage } = usePagination(sortedItems, pageSize)

	useEffect(() => {
		setActivePage(0)
	}, [items, setActivePage])

	const handleSortPropertyChange = useCallback(
		function handleSortPropertyChange(property: SortPredicate) {
			if (sortProperties.property === property) {
				setSortProperties((p) => {
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

			setSortProperties({
				property,
				direction: SortDirection.Ascending,
			})
		},
		[sortProperties],
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

	const validColumns = useMemo(() => {
		return columns.filter((c) => !!c)
	}, [columns])

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
									sortProperties: sortProperties,
									onSort: handleSortPropertyChange,
								})
							}

							return (
								<TableHeader
									column={column}
									sortProperties={sortProperties}
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
											{column.getValue?.(item, activePage * pageSize + index, sortedItems) ??
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
