import { splitEvery } from 'ramda';
import { useMemo, useState, useEffect } from 'react';
export function usePagination(items = [], pageSize = 10) {
    const [activePage, setActivePage] = useState(0);
    useEffect(() => {
        setActivePage(0);
    }, [pageSize]);
    const [pageItems, pageCount] = useMemo(() => {
        const pages = splitEvery(pageSize, items);
        if (pages.length === 0) {
            return [[], 0];
        }
        const pageItems = pages[activePage] || [];
        return [pageItems, pages.length];
    }, [items, pageSize, activePage]);
    return { pageItems, pageCount, activePage, setActivePage };
}
