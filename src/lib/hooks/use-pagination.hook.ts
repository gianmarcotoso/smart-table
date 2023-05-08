import { splitEvery } from 'ramda'
import { useMemo, useState, useEffect } from 'react'
import { useStableCallback } from './use-stable-callback.hook'
import { DEFAULT_PAGE_SIZE } from '../smart-table.component'

export type PaginationOptions = {
	pageSize: number
	totalItems?: number
}

export type PaginationHookData<T> = {
	items: T[]
	options?: PaginationOptions
	onPageChange?: (page: number) => void
}

export function usePagination<T>({ items = [], options, onPageChange }: PaginationHookData<T>) {
	const [activePage, setActivePage] = useState(0)
	const stableOnPageChange = useStableCallback(
		onPageChange ??
			(() => {
				// Do nothing
			}),
	)

	useEffect(() => {
		setActivePage(0)
	}, [options?.pageSize])

	useEffect(() => {
		stableOnPageChange?.(activePage)
	}, [activePage, stableOnPageChange])

	const [pageItems, pageCount] = useMemo(() => {
		if (!options?.totalItems) {
			const pages = splitEvery(options?.pageSize ?? DEFAULT_PAGE_SIZE, items)

			if (pages.length === 0) {
				return [[], 0]
			}

			const pageItems = pages[activePage] || []
			const pageCount = pages.length

			return [pageItems, pageCount]
		}

		const pageCount = Math.ceil(options.totalItems / options.pageSize)
		const pageItems = items

		return [pageItems, pageCount]
	}, [items, options?.pageSize, options?.totalItems, activePage])

	return { pageItems, pageCount, activePage, setActivePage }
}
