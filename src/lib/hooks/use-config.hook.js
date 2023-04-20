import { useContext } from 'react';
import { SmartTableContext } from '../smart-table-config.context';
import { deepMerge } from '../functions/deep-merge.fn';
export function useConfig(localConfig = {}) {
    const config = useContext(SmartTableContext);
    return deepMerge(config, localConfig);
}
