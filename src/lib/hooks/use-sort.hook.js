import { sort, prop, path, ascend, descend } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
export var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["Ascending"] = 0] = "Ascending";
    SortDirection[SortDirection["Descending"] = 1] = "Descending";
})(SortDirection || (SortDirection = {}));
export const useSort = (items, predicate, direction) => {
    const [sortedItems, setSortedItems] = useState(items || []);
    const sortDirectionFn = useMemo(() => {
        return direction === SortDirection.Ascending ? ascend : descend;
    }, [direction]);
    useEffect(() => {
        if (typeof predicate === 'function') {
            const sortByPredicate = sort(sortDirectionFn(predicate));
            setSortedItems(sortByPredicate(items));
            return;
        }
        if (Array.isArray(predicate)) {
            const sortByPath = sort(sortDirectionFn(path(predicate)));
            setSortedItems(sortByPath(items));
            return;
        }
        const sortByProp = sort(sortDirectionFn(prop(predicate)));
        setSortedItems(sortByProp(items));
        return;
    }, [items, predicate, direction, sortDirectionFn]);
    return sortedItems;
};
