import { useContext } from 'react'

import { DeepPartial, SmartTableConfig, SmartTableContext } from '../smart-table-config.context'
import { deepMerge } from '../functions/deep-merge.fn'

export function useConfig(localConfig: DeepPartial<SmartTableConfig> = {}) {
	const config = useContext(SmartTableContext)

	return deepMerge(config, localConfig) as SmartTableConfig
}
