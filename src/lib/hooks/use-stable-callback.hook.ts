import { useCallback, useEffect, useRef } from 'react'

export function useStableCallback(fn: CallableFunction) {
	const ref = useRef(fn)

	useEffect(() => {
		ref.current = fn
	})

	const stableCallback = useCallback((...args: any[]) => ref.current(...args), [])

	return stableCallback
}
