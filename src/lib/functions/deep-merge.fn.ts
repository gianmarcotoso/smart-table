import { uniq, concat, isNil, mergeWith } from 'ramda'

export function deepMerge(v1: any, v2: any): any {
	if (Array.isArray(v1) && Array.isArray(v2)) {
		return uniq(concat(v1, v2))
	} else if (typeof v1 === 'object' && typeof v2 === 'object' && !isNil(v1) && !isNil(v2)) {
		return mergeWith(deepMerge, v1, v2)
	} else {
		return v2
	}
}
