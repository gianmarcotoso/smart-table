import { u as _, j as r, P as F } from "./use-config.hook-feb2173b.js";
import { useState as P, useEffect as v, useMemo as T, useCallback as I } from "react";
import { splitEvery as G, ascend as J, descend as L, sort as C, path as O, prop as Q } from "ramda";
function U(e = [], n = 10) {
  const [s, d] = P(0);
  v(() => {
    d(0);
  }, [n]);
  const [o, a] = T(() => {
    const i = G(n, e);
    return i.length === 0 ? [[], 0] : [i[s] || [], i.length];
  }, [e, n, s]);
  return { pageItems: o, pageCount: a, activePage: s, setActivePage: d };
}
var g;
(function(e) {
  e[e.Ascending = 0] = "Ascending", e[e.Descending = 1] = "Descending";
})(g || (g = {}));
const V = (e, n, s) => {
  const [d, o] = P(e || []), a = T(() => s === g.Ascending ? J : L, [s]);
  return v(() => {
    if (typeof n == "function") {
      const p = C(a(n));
      o(p(e));
      return;
    }
    if (Array.isArray(n)) {
      const p = C(a(O(n)));
      o(p(e));
      return;
    }
    const i = C(a(Q(n)));
    o(i(e));
  }, [e, n, s, a]), d;
};
function W({ column: e, sortProperties: n, onSort: s, config: d }) {
  const a = _(d).components, i = T(() => e.getSortProperty === n.property, [e.getSortProperty, n.property]);
  return e.getSortProperty ? /* @__PURE__ */ r.jsxs(
    a.TableHeader,
    {
      onClick: () => s(e.getSortProperty),
      className: e.headerClassName,
      children: [
        e.title,
        !!e.getSortProperty && i && (n.direction === g.Ascending ? /* @__PURE__ */ r.jsx(r.Fragment, {}) : /* @__PURE__ */ r.jsx(r.Fragment, {}))
      ]
    },
    e.key
  ) : /* @__PURE__ */ r.jsx(a.TableHeader, { className: e.headerClassName, children: e.title }, e.key);
}
function z({
  columns: e,
  items: n = [],
  getItemKey: s,
  tableClassName: d = "",
  rowClassName: o = "",
  commonCellClassName: a = "",
  headerRowClassName: i = "",
  onRowClick: p,
  parseDatasetValue: k = (x) => x,
  defaultSortProperties: l,
  pageSize: u = 20,
  config: R
}) {
  const x = _(R), [f, N] = P({
    property: (l == null ? void 0 : l.property) ?? s,
    direction: (l == null ? void 0 : l.direction) ?? g.Ascending
  }), H = V(n, f.property, f.direction), { pageItems: $, pageCount: w, activePage: A, setActivePage: j } = U(H, u);
  v(() => {
    j(0);
  }, [n, j]);
  const B = I(
    function(h) {
      if (f.property === h) {
        N((b) => ({
          ...b,
          direction: b.direction === g.Ascending ? g.Descending : g.Ascending
        }));
        return;
      }
      N({
        property: h,
        direction: g.Ascending
      });
    },
    [f]
  ), D = I(
    (t) => {
      if (p) {
        const h = n.find(
          (b) => s(b) === k(t.currentTarget.dataset.itemkey ?? "")
        );
        h && p(h);
      }
    },
    [n, p, s, k]
  ), S = T(() => e.filter((t) => !!t), [e]), y = x.components;
  return /* @__PURE__ */ r.jsxs(y.TableContainer, { children: [
    x.pagination.showPaginatorAboveTable && /* @__PURE__ */ r.jsx(F, { activePage: A, pageCount: w, onSetActivePage: j }),
    /* @__PURE__ */ r.jsxs(y.Table, { className: d, children: [
      /* @__PURE__ */ r.jsx(y.TableHead, { children: /* @__PURE__ */ r.jsx(y.TableRow, { className: i, children: S.map((t) => t.renderHeader ? t.renderHeader({
        column: t,
        sortProperties: f,
        onSort: B
      }) : /* @__PURE__ */ r.jsx(
        W,
        {
          column: t,
          sortProperties: f,
          onSort: B
        },
        t.key
      )) }) }),
      /* @__PURE__ */ r.jsx(y.TableBody, { children: $.map((t, h) => {
        const b = typeof o == "function" ? o(t) : o;
        return /* @__PURE__ */ r.jsx(
          y.TableRow,
          {
            onClick: D,
            "data-itemkey": s(t),
            className: b,
            children: S.map((c) => {
              var E;
              const M = typeof a == "function" ? a(t) : a, q = typeof c.cellClassName == "function" ? c.cellClassName(t) : c.cellClassName;
              return /* @__PURE__ */ r.jsx(
                y.TableCell,
                {
                  className: `${M} ${q}`,
                  width: c.width,
                  children: ((E = c.getValue) == null ? void 0 : E.call(c, t, A * u + h, H)) ?? t[c.key] ?? c.value
                },
                c.key
              );
            })
          },
          s(t)
        );
      }) })
    ] }),
    x.pagination.showPaginatorBelowTable && /* @__PURE__ */ r.jsx(F, { activePage: A, pageCount: w, onSetActivePage: j })
  ] });
}
export {
  z as SmartTable,
  W as TableHeader
};
