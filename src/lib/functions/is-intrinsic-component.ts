export function isIntrinsicComponent(Component: any) {
	return !(
		typeof Component === 'function' ||
		(typeof Component === 'object' && Component.prototype && Component.prototype.isReactComponent)
	)
}
