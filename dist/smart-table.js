import { u as useConfig, j as jsxRuntimeExports, P as Paginator } from './use-config.hook-fc34657f.js';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { splitEvery, ascend, descend, sort, path, prop } from 'ramda';

function usePagination(items = [], pageSize = 10) {
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

var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["Ascending"] = 0] = "Ascending";
    SortDirection[SortDirection["Descending"] = 1] = "Descending";
})(SortDirection || (SortDirection = {}));
const useSort = (items, predicate, direction) => {
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

function TableHeader({ column, sortProperties, onSort, config }) {
  const _config = useConfig(config);
  const TableComponents = _config.components;
  const isSortingSelected = useMemo(() => {
    return column.getSortProperty === sortProperties.property;
  }, [column.getSortProperty, sortProperties.property]);
  if (!column.getSortProperty) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TableComponents.TableHeader, { className: column.headerClassName, children: column.title }, column.key);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    TableComponents.TableHeader,
    {
      onClick: () => onSort(column.getSortProperty),
      className: column.headerClassName,
      children: [
        column.title,
        !!column.getSortProperty && isSortingSelected && (sortProperties.direction === SortDirection.Ascending ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}))
      ]
    },
    column.key
  );
}
function SmartTable({
  columns,
  items = [],
  getItemKey,
  tableClassName = "",
  rowClassName = "",
  commonCellClassName = "",
  headerRowClassName = "",
  onRowClick,
  parseDatasetValue = (value) => value,
  defaultSortProperties,
  pageSize = 20,
  config
}) {
  const _config = useConfig(config);
  const [sortProperties, setSortProperties] = useState({
    property: defaultSortProperties?.property ?? getItemKey,
    direction: defaultSortProperties?.direction ?? SortDirection.Ascending
  });
  const sortedItems = useSort(items, sortProperties.property, sortProperties.direction);
  const { pageItems, pageCount, activePage, setActivePage } = usePagination(sortedItems, pageSize);
  useEffect(() => {
    setActivePage(0);
  }, [items, setActivePage]);
  const handleSortPropertyChange = useCallback(
    function handleSortPropertyChange2(property) {
      if (sortProperties.property === property) {
        setSortProperties((p) => {
          return {
            ...p,
            direction: p.direction === SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending
          };
        });
        return;
      }
      setSortProperties({
        property,
        direction: SortDirection.Ascending
      });
    },
    [sortProperties]
  );
  const handleRowClick = useCallback(
    (event) => {
      if (onRowClick) {
        const item = items.find(
          (i) => getItemKey(i) === parseDatasetValue(event.currentTarget.dataset.itemkey ?? "")
        );
        if (item) {
          onRowClick(item);
        }
      }
    },
    [items, onRowClick, getItemKey, parseDatasetValue]
  );
  const validColumns = useMemo(() => {
    return columns.filter((c) => !!c);
  }, [columns]);
  const TableComponents = _config.components;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableComponents.TableContainer, { children: [
    _config.pagination.showPaginatorAboveTable && /* @__PURE__ */ jsxRuntimeExports.jsx(Paginator, { activePage, pageCount, onSetActivePage: setActivePage }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TableComponents.Table, { className: tableClassName, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableComponents.TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableComponents.TableRow, { className: headerRowClassName, children: validColumns.map((column) => {
        if (column.renderHeader) {
          return column.renderHeader({
            column,
            sortProperties,
            onSort: handleSortPropertyChange
          });
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableHeader,
          {
            column,
            sortProperties,
            onSort: handleSortPropertyChange
          },
          column.key
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableComponents.TableBody, { children: pageItems.map((item, index) => {
        const rowClass = typeof rowClassName === "function" ? rowClassName(item) : rowClassName;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableComponents.TableRow,
          {
            onClick: handleRowClick,
            "data-itemkey": getItemKey(item),
            className: rowClass,
            children: validColumns.map((column) => {
              const commonCellClass = typeof commonCellClassName === "function" ? commonCellClassName(item) : commonCellClassName;
              const cellClass = typeof column.cellClassName === "function" ? column.cellClassName(item) : column.cellClassName;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableComponents.TableCell,
                {
                  className: `${commonCellClass} ${cellClass}`,
                  width: column.width,
                  children: column.getValue?.(item, activePage * pageSize + index, sortedItems) ?? item[column.key] ?? column.value
                },
                column.key
              );
            })
          },
          getItemKey(item)
        );
      }) })
    ] }),
    _config.pagination.showPaginatorBelowTable && /* @__PURE__ */ jsxRuntimeExports.jsx(Paginator, { activePage, pageCount, onSetActivePage: setActivePage })
  ] });
}

export { SmartTable, TableHeader };
//# sourceMappingURL=smart-table.js.map
