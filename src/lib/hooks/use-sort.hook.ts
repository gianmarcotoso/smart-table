import { sort, prop, path, ascend, descend } from 'ramda'
import { useEffect, useMemo, useState } from 'react'

export enum SortDirection {
	Ascending,
	Descending,
}

export type SortPredicate<T = any> = ((item: T) => string | number) | string | string[]

export const useSort = <T>(items: T[], predicate: SortPredicate, direction: SortDirection) => {
	const [sortedItems, setSortedItems] = useState(items || [])
	const sortDirectionFn = useMemo(() => {
		return direction === SortDirection.Ascending ? ascend : descend
	}, [direction])

	useEffect(() => {
		if (!items || items.length === 0) {
			return
		}

		if (typeof predicate === 'function') {
			const sortByPredicate = sort(sortDirectionFn(predicate))

			setSortedItems(sortByPredicate(items))
			return
		}

		if (Array.isArray(predicate)) {
			const sortByPath = sort(sortDirectionFn(path<any>(predicate)))

			setSortedItems(sortByPath(items))
			return
		}

		const sortByProp = sort<any>(sortDirectionFn(prop(predicate)))

		setSortedItems(sortByProp(items))
		return
	}, [items, predicate, direction, sortDirectionFn])

	return sortedItems
}
