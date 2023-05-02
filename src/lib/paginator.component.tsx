import React, { useCallback, useMemo } from 'react'

import { useConfig } from './hooks/use-config.hook'
import { DeepPartial, SmartTableConfig } from './smart-table-config.context'

type PaginatorItemProps = {
	active?: boolean
	activeClassName?: string
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void
	children: React.ReactNode
	config?: DeepPartial<SmartTableConfig>
	[x: string]: unknown
}

export function PaginatorItem({
	active = false,
	activeClassName,
	onClick,
	children,
	config,
	...rest
}: PaginatorItemProps) {
	const _config = useConfig(config)

	return (
		<div
			onClick={onClick}
			className={`${_config.pagination.paginatorItemClassName ?? ''} ${active ? activeClassName : ''}`}
			{...rest}
		>
			{children}
		</div>
	)
}

export type PaginatorProps = {
	activePage: number
	pageCount: number
	onSetActivePage: (number: number) => void
	config?: DeepPartial<SmartTableConfig>
	children?: React.ReactNode
}

export function DefaultPaginator({ children }: PaginatorProps) {
	const _config = useConfig()

	return <div className={_config.pagination.paginatorClassName}>{children}</div>
}

export function Paginator({ activePage, pageCount, onSetActivePage, config }: PaginatorProps) {
	const _config = useConfig(config)
	const Components = _config.components
	const Glyphs = _config.pagination.glyphs

	const shownPages = useMemo(() => {
		return pageCount > _config.pagination.maxPagesToShow ? _config.pagination.maxPagesToShow : pageCount
	}, [_config.pagination.maxPagesToShow, pageCount])

	const threshold = useMemo(() => {
		let threshold =
			activePage - Math.floor(_config.pagination.maxPagesToShow / 2) > 0
				? activePage - Math.floor(_config.pagination.maxPagesToShow / 2)
				: 0

		if (activePage > pageCount - _config.pagination.maxPagesToShow) {
			threshold = pageCount - _config.pagination.maxPagesToShow
		}

		return threshold > 0 ? threshold : 0
	}, [activePage, _config.pagination.maxPagesToShow, pageCount])

	const handleSetActivePage = useCallback(
		function (event: React.MouseEvent<HTMLDivElement>) {
			event.preventDefault()
			event.stopPropagation()

			const { currentTarget } = event
			const page = Number(currentTarget.dataset.page ?? 0)

			if (page < 0) {
				return onSetActivePage(0)
			}

			if (page > pageCount - 1) {
				return onSetActivePage(pageCount - 1)
			}

			return onSetActivePage(page)
		},
		[onSetActivePage, pageCount],
	)

	if (_config.pagination.useCustomPagination) {
		return <Components.Paginator activePage={activePage} pageCount={pageCount} onSetActivePage={onSetActivePage} />
	}

	if (pageCount < 2) {
		return null
	}

	return (
		<Components.Paginator>
			<Components.PaginatorItem data-page={0} onClick={handleSetActivePage}>
				<Glyphs.FirstPage />
			</Components.PaginatorItem>
			<Components.PaginatorItem data-page={activePage - 1} onClick={handleSetActivePage}>
				<Glyphs.PreviousPage />
			</Components.PaginatorItem>
			{threshold + activePage >= _config.pagination.maxPagesToShow && (
				<Components.PaginatorItem
					data-page={activePage - _config.pagination.maxPagesToShow}
					onClick={handleSetActivePage}
				>
					<Glyphs.Ellipsis />
				</Components.PaginatorItem>
			)}
			{Array.from(Array(shownPages)).map((_, i) => {
				return (
					<Components.PaginatorItem
						data-page={i + threshold}
						key={i + threshold}
						active={i + threshold === activePage}
						activeClassName={_config.pagination.activePageItemClassName}
						onClick={handleSetActivePage}
					>
						{i + 1 + threshold}
					</Components.PaginatorItem>
				)
			})}
			{threshold + _config.pagination.maxPagesToShow < pageCount && (
				<Components.PaginatorItem
					data-page={activePage + _config.pagination.maxPagesToShow}
					onClick={handleSetActivePage}
				>
					<Glyphs.Ellipsis />
				</Components.PaginatorItem>
			)}
			<Components.PaginatorItem data-page={activePage + 1} onClick={handleSetActivePage}>
				<Glyphs.NextPage />
			</Components.PaginatorItem>
			<Components.PaginatorItem data-page={pageCount - 1} onClick={handleSetActivePage}>
				<Glyphs.LastPage />
			</Components.PaginatorItem>
		</Components.Paginator>
	)
}
