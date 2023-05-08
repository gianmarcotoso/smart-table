import { jsx, jsxs } from 'react/jsx-runtime';
import { useMemo, useCallback, createContext, useContext, useRef, useEffect, useState } from 'react';
import { uniq, concat, isNil, mergeWith, splitEvery, ascend, descend, sort, path, prop } from 'ramda';

function isIntrinsicComponent(Component) {
  return !(typeof Component === "function" || typeof Component === "object" && Component.prototype && Component.prototype.isReactComponent);
}

function deepMerge(v1, v2) {
  if (Array.isArray(v1) && Array.isArray(v2)) {
    return uniq(concat(v1, v2));
  } else if (typeof v1 === "object" && typeof v2 === "object" && !isNil(v1) && !isNil(v2)) {
    return mergeWith(deepMerge, v1, v2);
  } else {
    return v2;
  }
}

function DefaultPaginatorItem({ active = false, className, onClick, children, ...rest }) {
  return /* @__PURE__ */ jsx("div", { "data-active": active, onClick, className, ...rest, children });
}
function DefaultPaginator({ children }) {
  const _config = useConfig();
  return /* @__PURE__ */ jsx("div", { className: _config.pagination.paginatorClassName, children });
}
function Paginator({ activePage, pageCount, onSetActivePage, config }) {
  const _config = useConfig(config);
  const Components = _config.components;
  const Glyphs = _config.pagination.glyphs;
  const shownPages = useMemo(() => {
    return pageCount > _config.pagination.maxPagesToShow ? _config.pagination.maxPagesToShow : pageCount;
  }, [_config.pagination.maxPagesToShow, pageCount]);
  const threshold = useMemo(() => {
    let threshold2 = activePage - Math.floor(_config.pagination.maxPagesToShow / 2) > 0 ? activePage - Math.floor(_config.pagination.maxPagesToShow / 2) : 0;
    if (activePage > pageCount - _config.pagination.maxPagesToShow) {
      threshold2 = pageCount - _config.pagination.maxPagesToShow;
    }
    return threshold2 > 0 ? threshold2 : 0;
  }, [activePage, _config.pagination.maxPagesToShow, pageCount]);
  const handleSetActivePage = useCallback(
    function(event) {
      event.preventDefault();
      event.stopPropagation();
      const { currentTarget } = event;
      const page = Number(currentTarget.dataset.page ?? 0);
      if (page < 0) {
        return onSetActivePage(0);
      }
      if (page > pageCount - 1) {
        return onSetActivePage(pageCount - 1);
      }
      return onSetActivePage(page);
    },
    [onSetActivePage, pageCount]
  );
  if (_config.pagination.useCustomPagination) {
    return /* @__PURE__ */ jsx(Components.Paginator, { activePage, pageCount, onSetActivePage });
  }
  if (pageCount < 2) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Components.Paginator, { children: [
    /* @__PURE__ */ jsx(Components.PaginatorItem, { "data-page": 0, onClick: handleSetActivePage, children: /* @__PURE__ */ jsx(Glyphs.FirstPage, {}) }),
    /* @__PURE__ */ jsx(Components.PaginatorItem, { "data-page": activePage - 1, onClick: handleSetActivePage, children: /* @__PURE__ */ jsx(Glyphs.PreviousPage, {}) }),
    threshold + activePage >= _config.pagination.maxPagesToShow && /* @__PURE__ */ jsx(
      Components.PaginatorItem,
      {
        "data-page": activePage - _config.pagination.maxPagesToShow,
        onClick: handleSetActivePage,
        children: /* @__PURE__ */ jsx(Glyphs.Ellipsis, {})
      }
    ),
    Array.from(Array(shownPages)).map((_, i) => {
      return /* @__PURE__ */ jsx(
        Components.PaginatorItem,
        {
          "data-page": i + threshold,
          active: i + threshold === activePage,
          className: i + threshold === activePage ? _config.pagination.activePageItemClassName : "",
          onClick: handleSetActivePage,
          children: i + 1 + threshold
        },
        i + threshold
      );
    }),
    threshold + _config.pagination.maxPagesToShow < pageCount && /* @__PURE__ */ jsx(
      Components.PaginatorItem,
      {
        "data-page": activePage + _config.pagination.maxPagesToShow,
        onClick: handleSetActivePage,
        children: /* @__PURE__ */ jsx(Glyphs.Ellipsis, {})
      }
    ),
    /* @__PURE__ */ jsx(Components.PaginatorItem, { "data-page": activePage + 1, onClick: handleSetActivePage, children: /* @__PURE__ */ jsx(Glyphs.NextPage, {}) }),
    /* @__PURE__ */ jsx(Components.PaginatorItem, { "data-page": pageCount - 1, onClick: handleSetActivePage, children: /* @__PURE__ */ jsx(Glyphs.LastPage, {}) })
  ] });
}

const DefaultSmartTableConfig = {
  components: {
    TableContainer: "div",
    Table: "table",
    TableHead: "thead",
    TableBody: "tbody",
    TableHeader: "th",
    TableRow: "tr",
    TableCell: "td",
    Paginator: DefaultPaginator,
    PaginatorItem: DefaultPaginatorItem
  },
  table: {
    sortGlyphs: {
      Ascending: () => /* @__PURE__ */ jsx("span", { children: "↑" }),
      Descending: () => /* @__PURE__ */ jsx("span", { children: "↓" })
    }
  },
  pagination: {
    showPaginatorAboveTable: false,
    showPaginatorBelowTable: true,
    maxPagesToShow: 5,
    activePageItemClassName: "active-page-item",
    useCustomPagination: false,
    paginatorClassName: "paginator",
    paginatorItemClassName: "paginator-item",
    glyphs: {
      FirstPage: () => /* @__PURE__ */ jsx("span", { children: "«" }),
      PreviousPage: () => /* @__PURE__ */ jsx("span", { children: "‹" }),
      NextPage: () => /* @__PURE__ */ jsx("span", { children: "›" }),
      LastPage: () => /* @__PURE__ */ jsx("span", { children: "»" }),
      Ellipsis: () => /* @__PURE__ */ jsx("span", { children: "..." })
    }
  }
};
const SmartTableContext = createContext(DefaultSmartTableConfig);
function SmartTableConfigProvider({ config, children }) {
  const mergedConfig = deepMerge(DefaultSmartTableConfig, config);
  return /* @__PURE__ */ jsx(SmartTableContext.Provider, { value: mergedConfig, children });
}

function useConfig(localConfig = {}) {
  const config = useContext(SmartTableContext);
  return deepMerge(config, localConfig);
}

function useStableCallback(fn) {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  });
  const stableCallback = useCallback((...args) => ref.current(...args), []);
  return stableCallback;
}

function usePagination({ items = [], options, onPageChange }) {
  const [activePage, setActivePage] = useState(0);
  const stableOnPageChange = useStableCallback(
    onPageChange ?? (() => {
    })
  );
  useEffect(() => {
    setActivePage(0);
  }, [options?.pageSize]);
  useEffect(() => {
    stableOnPageChange?.(activePage);
  }, [activePage, stableOnPageChange]);
  const [pageItems, pageCount] = useMemo(() => {
    if (!options?.totalItems) {
      const pages = splitEvery(options?.pageSize ?? DEFAULT_PAGE_SIZE, items);
      if (pages.length === 0) {
        return [[], 0];
      }
      const pageItems3 = pages[activePage] || [];
      const pageCount3 = pages.length;
      return [pageItems3, pageCount3];
    }
    const pageCount2 = Math.ceil(options.totalItems / options.pageSize);
    const pageItems2 = items;
    return [pageItems2, pageCount2];
  }, [items, options?.pageSize, options?.totalItems, activePage]);
  return { pageItems, pageCount, activePage, setActivePage };
}

var SortDirection = /* @__PURE__ */ ((SortDirection2) => {
  SortDirection2[SortDirection2["Ascending"] = 0] = "Ascending";
  SortDirection2[SortDirection2["Descending"] = 1] = "Descending";
  return SortDirection2;
})(SortDirection || {});
const useSort = (items, predicate, direction) => {
  const [sortedItems, setSortedItems] = useState(items || []);
  const sortDirectionFn = useMemo(() => {
    return direction === 0 /* Ascending */ ? ascend : descend;
  }, [direction]);
  useEffect(() => {
    if (typeof predicate === "function") {
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

const DEFAULT_PAGE_SIZE = 25;
function TableHeader({ column, sortProperties, onSort, config }) {
  const _config = useConfig(config);
  const TableComponents = _config.components;
  const isSortingSelected = useMemo(() => {
    return column.getSortProperty === sortProperties.property;
  }, [column.getSortProperty, sortProperties.property]);
  if (!column.getSortProperty) {
    return /* @__PURE__ */ jsx(TableComponents.TableHeader, { className: column.headerClassName, children: column.title }, column.key);
  }
  const SortGlyphs = _config.table.sortGlyphs;
  const isSortable = !!column.getSortProperty;
  const isSortingActive = !!column.getSortProperty && isSortingSelected;
  const isIntrinsic = isIntrinsicComponent(TableComponents.TableHeader);
  if (isIntrinsic) {
    return /* @__PURE__ */ jsxs(
      TableComponents.TableHeader,
      {
        onClick: () => onSort(column.getSortProperty),
        className: column.headerClassName,
        "data-is-sortable": isSortable,
        children: [
          column.title,
          isSortingActive && (sortProperties.direction === SortDirection.Ascending ? /* @__PURE__ */ jsx(SortGlyphs.Ascending, {}) : /* @__PURE__ */ jsx(SortGlyphs.Descending, {}))
        ]
      },
      column.key
    );
  }
  return /* @__PURE__ */ jsxs(
    TableComponents.TableHeader,
    {
      onClick: () => onSort(column.getSortProperty),
      className: column.headerClassName,
      isSortable,
      children: [
        column.title,
        isSortingActive && (sortProperties.direction === SortDirection.Ascending ? /* @__PURE__ */ jsx(SortGlyphs.Ascending, {}) : /* @__PURE__ */ jsx(SortGlyphs.Descending, {}))
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
  paginationOptions,
  onPageChange,
  config
}) {
  const _config = useConfig(config);
  const [sortProperties, setSortProperties] = useState({
    property: defaultSortProperties?.property ?? getItemKey,
    direction: defaultSortProperties?.direction ?? SortDirection.Ascending
  });
  const sortedItems = useSort(items, sortProperties.property, sortProperties.direction);
  const { pageItems, pageCount, activePage, setActivePage } = usePagination({
    items: sortedItems,
    options: paginationOptions,
    onPageChange
  });
  useEffect(() => {
    if (!paginationOptions?.totalItems) {
      setActivePage(0);
    }
  }, [items, setActivePage, paginationOptions?.totalItems]);
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
  return /* @__PURE__ */ jsxs(TableComponents.TableContainer, { children: [
    _config.pagination.showPaginatorAboveTable && /* @__PURE__ */ jsx(
      Paginator,
      {
        activePage,
        pageCount,
        onSetActivePage: setActivePage,
        config
      }
    ),
    /* @__PURE__ */ jsxs(TableComponents.Table, { className: tableClassName, children: [
      /* @__PURE__ */ jsx(TableComponents.TableHead, { children: /* @__PURE__ */ jsx(TableComponents.TableRow, { className: headerRowClassName, children: validColumns.map((column) => {
        if (column.renderHeader) {
          return column.renderHeader({
            column,
            sortProperties,
            onSort: handleSortPropertyChange
          });
        }
        return /* @__PURE__ */ jsx(
          TableHeader,
          {
            column,
            sortProperties,
            onSort: handleSortPropertyChange
          },
          column.key
        );
      }) }) }),
      /* @__PURE__ */ jsx(TableComponents.TableBody, { children: pageItems.map((item, index) => {
        const rowClass = typeof rowClassName === "function" ? rowClassName(item) : rowClassName;
        return /* @__PURE__ */ jsx(
          TableComponents.TableRow,
          {
            onClick: handleRowClick,
            "data-itemkey": getItemKey(item),
            className: rowClass,
            children: validColumns.map((column) => {
              const commonCellClass = typeof commonCellClassName === "function" ? commonCellClassName(item) : commonCellClassName;
              const cellClass = typeof column.cellClassName === "function" ? column.cellClassName(item) : column.cellClassName;
              return /* @__PURE__ */ jsx(
                TableComponents.TableCell,
                {
                  className: `${commonCellClass} ${cellClass}`,
                  width: column.width,
                  children: column.getValue?.(
                    item,
                    activePage * (paginationOptions?.pageSize ?? DEFAULT_PAGE_SIZE) + index,
                    sortedItems
                  ) ?? item[column.key] ?? column.value
                },
                column.key
              );
            })
          },
          getItemKey(item)
        );
      }) })
    ] }),
    _config.pagination.showPaginatorBelowTable && /* @__PURE__ */ jsx(
      Paginator,
      {
        activePage,
        pageCount,
        onSetActivePage: setActivePage,
        config
      }
    )
  ] });
}

export { SmartTable, SmartTableConfigProvider, SortDirection, useConfig, usePagination, useSort };
//# sourceMappingURL=index.js.map
