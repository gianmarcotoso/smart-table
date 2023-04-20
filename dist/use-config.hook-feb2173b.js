import je, { useMemo as Te, useCallback as cr, createContext as dr, useContext as vr } from "react";
import { uniq as pr, concat as gr, isNil as xe, mergeWith as hr } from "ramda";
var f = {}, mr = {
  get exports() {
    return f;
  },
  set exports(i) {
    f = i;
  }
}, I = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pe;
function br() {
  if (Pe)
    return I;
  Pe = 1;
  var i = je, s = Symbol.for("react.element"), _ = Symbol.for("react.fragment"), P = Object.prototype.hasOwnProperty, c = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function R(w, d, E) {
    var v, h = {}, x = null, W = null;
    E !== void 0 && (x = "" + E), d.key !== void 0 && (x = "" + d.key), d.ref !== void 0 && (W = d.ref);
    for (v in d)
      P.call(d, v) && !y.hasOwnProperty(v) && (h[v] = d[v]);
    if (w && w.defaultProps)
      for (v in d = w.defaultProps, d)
        h[v] === void 0 && (h[v] = d[v]);
    return { $$typeof: s, type: w, key: x, ref: W, props: h, _owner: c.current };
  }
  return I.Fragment = _, I.jsx = R, I.jsxs = R, I;
}
var N = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var we;
function yr() {
  return we || (we = 1, process.env.NODE_ENV !== "production" && function() {
    var i = je, s = Symbol.for("react.element"), _ = Symbol.for("react.portal"), P = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), w = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), W = Symbol.for("react.offscreen"), Z = Symbol.iterator, Oe = "@@iterator";
    function ke(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Z && e[Z] || e[Oe];
      return typeof r == "function" ? r : null;
    }
    var O = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function m(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          t[a - 1] = arguments[a];
        De("error", e, t);
      }
    }
    function De(e, r, t) {
      {
        var a = O.ReactDebugCurrentFrame, u = a.getStackAddendum();
        u !== "" && (r += "%s", t = t.concat([u]));
        var l = t.map(function(o) {
          return String(o);
        });
        l.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, l);
      }
    }
    var Fe = !1, Ae = !1, Ie = !1, Ne = !1, We = !1, Q;
    Q = Symbol.for("react.module.reference");
    function $e(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === P || e === y || We || e === c || e === E || e === v || Ne || e === W || Fe || Ae || Ie || typeof e == "object" && e !== null && (e.$$typeof === x || e.$$typeof === h || e.$$typeof === R || e.$$typeof === w || e.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Q || e.getModuleId !== void 0));
    }
    function Ye(e, r, t) {
      var a = e.displayName;
      if (a)
        return a;
      var u = r.displayName || r.name || "";
      return u !== "" ? t + "(" + u + ")" : t;
    }
    function ee(e) {
      return e.displayName || "Context";
    }
    function j(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && m("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case P:
          return "Fragment";
        case _:
          return "Portal";
        case y:
          return "Profiler";
        case c:
          return "StrictMode";
        case E:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case w:
            var r = e;
            return ee(r) + ".Consumer";
          case R:
            var t = e;
            return ee(t._context) + ".Provider";
          case d:
            return Ye(e, e.render, "ForwardRef");
          case h:
            var a = e.displayName || null;
            return a !== null ? a : j(e.type) || "Memo";
          case x: {
            var u = e, l = u._payload, o = u._init;
            try {
              return j(o(l));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var C = Object.assign, F = 0, re, te, ae, ne, oe, ie, se;
    function ue() {
    }
    ue.__reactDisabledLog = !0;
    function Le() {
      {
        if (F === 0) {
          re = console.log, te = console.info, ae = console.warn, ne = console.error, oe = console.group, ie = console.groupCollapsed, se = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ue,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        F++;
      }
    }
    function Me() {
      {
        if (F--, F === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: C({}, e, {
              value: re
            }),
            info: C({}, e, {
              value: te
            }),
            warn: C({}, e, {
              value: ae
            }),
            error: C({}, e, {
              value: ne
            }),
            group: C({}, e, {
              value: oe
            }),
            groupCollapsed: C({}, e, {
              value: ie
            }),
            groupEnd: C({}, e, {
              value: se
            })
          });
        }
        F < 0 && m("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var U = O.ReactCurrentDispatcher, B;
    function $(e, r, t) {
      {
        if (B === void 0)
          try {
            throw Error();
          } catch (u) {
            var a = u.stack.trim().match(/\n( *(at )?)/);
            B = a && a[1] || "";
          }
        return `
` + B + e;
      }
    }
    var q = !1, Y;
    {
      var Ve = typeof WeakMap == "function" ? WeakMap : Map;
      Y = new Ve();
    }
    function le(e, r) {
      if (!e || q)
        return "";
      {
        var t = Y.get(e);
        if (t !== void 0)
          return t;
      }
      var a;
      q = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var l;
      l = U.current, U.current = null, Le();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (S) {
              a = S;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (S) {
              a = S;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (S) {
            a = S;
          }
          e();
        }
      } catch (S) {
        if (S && a && typeof S.stack == "string") {
          for (var n = S.stack.split(`
`), b = a.stack.split(`
`), p = n.length - 1, g = b.length - 1; p >= 1 && g >= 0 && n[p] !== b[g]; )
            g--;
          for (; p >= 1 && g >= 0; p--, g--)
            if (n[p] !== b[g]) {
              if (p !== 1 || g !== 1)
                do
                  if (p--, g--, g < 0 || n[p] !== b[g]) {
                    var T = `
` + n[p].replace(" at new ", " at ");
                    return e.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", e.displayName)), typeof e == "function" && Y.set(e, T), T;
                  }
                while (p >= 1 && g >= 0);
              break;
            }
        }
      } finally {
        q = !1, U.current = l, Me(), Error.prepareStackTrace = u;
      }
      var D = e ? e.displayName || e.name : "", Re = D ? $(D) : "";
      return typeof e == "function" && Y.set(e, Re), Re;
    }
    function Ue(e, r, t) {
      return le(e, !1);
    }
    function Be(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function L(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return le(e, Be(e));
      if (typeof e == "string")
        return $(e);
      switch (e) {
        case E:
          return $("Suspense");
        case v:
          return $("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return Ue(e.render);
          case h:
            return L(e.type, r, t);
          case x: {
            var a = e, u = a._payload, l = a._init;
            try {
              return L(l(u), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var M = Object.prototype.hasOwnProperty, fe = {}, ce = O.ReactDebugCurrentFrame;
    function V(e) {
      if (e) {
        var r = e._owner, t = L(e.type, e._source, r ? r.type : null);
        ce.setExtraStackFrame(t);
      } else
        ce.setExtraStackFrame(null);
    }
    function qe(e, r, t, a, u) {
      {
        var l = Function.call.bind(M);
        for (var o in e)
          if (l(e, o)) {
            var n = void 0;
            try {
              if (typeof e[o] != "function") {
                var b = Error((a || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw b.name = "Invariant Violation", b;
              }
              n = e[o](r, o, a, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (p) {
              n = p;
            }
            n && !(n instanceof Error) && (V(u), m("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", t, o, typeof n), V(null)), n instanceof Error && !(n.message in fe) && (fe[n.message] = !0, V(u), m("Failed %s type: %s", t, n.message), V(null));
          }
      }
    }
    var Ge = Array.isArray;
    function G(e) {
      return Ge(e);
    }
    function Je(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function ze(e) {
      try {
        return de(e), !1;
      } catch {
        return !0;
      }
    }
    function de(e) {
      return "" + e;
    }
    function ve(e) {
      if (ze(e))
        return m("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Je(e)), de(e);
    }
    var A = O.ReactCurrentOwner, He = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, pe, ge, J;
    J = {};
    function Ke(e) {
      if (M.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Xe(e) {
      if (M.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ze(e, r) {
      if (typeof e.ref == "string" && A.current && r && A.current.stateNode !== r) {
        var t = j(A.current.type);
        J[t] || (m('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', j(A.current.type), e.ref), J[t] = !0);
      }
    }
    function Qe(e, r) {
      {
        var t = function() {
          pe || (pe = !0, m("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function er(e, r) {
      {
        var t = function() {
          ge || (ge = !0, m("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var rr = function(e, r, t, a, u, l, o) {
      var n = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: l
      };
      return n._store = {}, Object.defineProperty(n._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(n, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(n, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: u
      }), Object.freeze && (Object.freeze(n.props), Object.freeze(n)), n;
    };
    function tr(e, r, t, a, u) {
      {
        var l, o = {}, n = null, b = null;
        t !== void 0 && (ve(t), n = "" + t), Xe(r) && (ve(r.key), n = "" + r.key), Ke(r) && (b = r.ref, Ze(r, u));
        for (l in r)
          M.call(r, l) && !He.hasOwnProperty(l) && (o[l] = r[l]);
        if (e && e.defaultProps) {
          var p = e.defaultProps;
          for (l in p)
            o[l] === void 0 && (o[l] = p[l]);
        }
        if (n || b) {
          var g = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          n && Qe(o, g), b && er(o, g);
        }
        return rr(e, n, b, u, a, A.current, o);
      }
    }
    var z = O.ReactCurrentOwner, he = O.ReactDebugCurrentFrame;
    function k(e) {
      if (e) {
        var r = e._owner, t = L(e.type, e._source, r ? r.type : null);
        he.setExtraStackFrame(t);
      } else
        he.setExtraStackFrame(null);
    }
    var H;
    H = !1;
    function K(e) {
      return typeof e == "object" && e !== null && e.$$typeof === s;
    }
    function me() {
      {
        if (z.current) {
          var e = j(z.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ar(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var be = {};
    function nr(e) {
      {
        var r = me();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function ye(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = nr(r);
        if (be[t])
          return;
        be[t] = !0;
        var a = "";
        e && e._owner && e._owner !== z.current && (a = " It was passed a child from " + j(e._owner.type) + "."), k(e), m('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, a), k(null);
      }
    }
    function Ee(e, r) {
      {
        if (typeof e != "object")
          return;
        if (G(e))
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            K(a) && ye(a, r);
          }
        else if (K(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var u = ke(e);
          if (typeof u == "function" && u !== e.entries)
            for (var l = u.call(e), o; !(o = l.next()).done; )
              K(o.value) && ye(o.value, r);
        }
      }
    }
    function or(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === h))
          t = r.propTypes;
        else
          return;
        if (t) {
          var a = j(r);
          qe(t, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !H) {
          H = !0;
          var u = j(r);
          m("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", u || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && m("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ir(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var a = r[t];
          if (a !== "children" && a !== "key") {
            k(e), m("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), k(null);
            break;
          }
        }
        e.ref !== null && (k(e), m("Invalid attribute `ref` supplied to `React.Fragment`."), k(null));
      }
    }
    function _e(e, r, t, a, u, l) {
      {
        var o = $e(e);
        if (!o) {
          var n = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (n += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var b = ar(u);
          b ? n += b : n += me();
          var p;
          e === null ? p = "null" : G(e) ? p = "array" : e !== void 0 && e.$$typeof === s ? (p = "<" + (j(e.type) || "Unknown") + " />", n = " Did you accidentally export a JSX literal instead of a component?") : p = typeof e, m("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", p, n);
        }
        var g = tr(e, r, t, u, l);
        if (g == null)
          return g;
        if (o) {
          var T = r.children;
          if (T !== void 0)
            if (a)
              if (G(T)) {
                for (var D = 0; D < T.length; D++)
                  Ee(T[D], e);
                Object.freeze && Object.freeze(T);
              } else
                m("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ee(T, e);
        }
        return e === P ? ir(g) : or(g), g;
      }
    }
    function sr(e, r, t) {
      return _e(e, r, t, !0);
    }
    function ur(e, r, t) {
      return _e(e, r, t, !1);
    }
    var lr = ur, fr = sr;
    N.Fragment = P, N.jsx = lr, N.jsxs = fr;
  }()), N;
}
(function(i) {
  process.env.NODE_ENV === "production" ? i.exports = br() : i.exports = yr();
})(mr);
function X(i, s) {
  return Array.isArray(i) && Array.isArray(s) ? pr(gr(i, s)) : typeof i == "object" && typeof s == "object" && !xe(i) && !xe(s) ? hr(X, i, s) : s;
}
function Er({ active: i = !1, activeClassName: s, onClick: _, children: P, ...c }) {
  return /* @__PURE__ */ f.jsx("div", { onClick: _, className: i ? s : "", ...c, children: P });
}
function _r({ activePage: i, pageCount: s, onSetActivePage: _, config: P }) {
  const c = Rr(P), y = c.components, R = c.pagination.glyphs, w = Te(() => s > c.pagination.maxPagesToShow ? c.pagination.maxPagesToShow : s, [c.pagination.maxPagesToShow, s]), d = Te(() => {
    let v = i - Math.floor(c.pagination.maxPagesToShow / 2) > 0 ? i - Math.floor(c.pagination.maxPagesToShow / 2) : 0;
    return i > s - c.pagination.maxPagesToShow && (v = s - c.pagination.maxPagesToShow), v > 0 ? v : 0;
  }, [i, c.pagination.maxPagesToShow, s]), E = cr(
    function(v) {
      v.preventDefault(), v.stopPropagation();
      const { currentTarget: h } = v, x = Number(h.dataset.page ?? 0);
      return x < 0 ? _(0) : x > s - 1 ? _(s - 1) : _(x);
    },
    [_, s]
  );
  return c.pagination.useCustomPagination ? /* @__PURE__ */ f.jsx(y.Paginator, { activePage: i, pageCount: s, onSetActivePage: _ }) : s < 2 ? null : /* @__PURE__ */ f.jsxs(y.Paginator, { children: [
    /* @__PURE__ */ f.jsx(y.PaginatorItem, { "data-page": 0, onClick: E, children: /* @__PURE__ */ f.jsx(R.FirstPage, {}) }),
    /* @__PURE__ */ f.jsx(y.PaginatorItem, { "data-page": i - 1, onClick: E, children: /* @__PURE__ */ f.jsx(R.PreviousPage, {}) }),
    d + i >= c.pagination.maxPagesToShow && /* @__PURE__ */ f.jsx(
      y.PaginatorItem,
      {
        "data-page": i - c.pagination.maxPagesToShow,
        onClick: E,
        children: /* @__PURE__ */ f.jsx(R.Ellipsis, {})
      }
    ),
    Array.from(Array(w)).map((v, h) => /* @__PURE__ */ f.jsx(
      y.PaginatorItem,
      {
        "data-page": h + d,
        active: h + d === i,
        activeClassName: c.pagination.activePageItemClassName,
        onClick: E,
        children: h + 1 + d
      },
      h + d
    )),
    d + c.pagination.maxPagesToShow < s && /* @__PURE__ */ f.jsx(
      y.PaginatorItem,
      {
        "data-page": i + c.pagination.maxPagesToShow,
        onClick: E,
        children: /* @__PURE__ */ f.jsx(R.Ellipsis, {})
      }
    ),
    /* @__PURE__ */ f.jsx(y.PaginatorItem, { "data-page": i + 1, onClick: E, children: /* @__PURE__ */ f.jsx(R.NextPage, {}) }),
    /* @__PURE__ */ f.jsx(y.PaginatorItem, { "data-page": s - 1, onClick: E, children: /* @__PURE__ */ f.jsx(R.LastPage, {}) })
  ] });
}
const Se = {
  components: {
    TableContainer: "div",
    Table: "table",
    TableHead: "thead",
    TableBody: "tbody",
    TableHeader: "th",
    TableRow: "tr",
    TableCell: "td",
    Paginator: _r,
    PaginatorItem: Er
  },
  pagination: {
    showPaginatorAboveTable: !1,
    showPaginatorBelowTable: !0,
    maxPagesToShow: 5,
    activePageItemClassName: "active-page-item",
    useCustomPagination: !1,
    glyphs: {
      FirstPage: () => /* @__PURE__ */ f.jsx("span", { children: "«" }),
      PreviousPage: () => /* @__PURE__ */ f.jsx("span", { children: "‹" }),
      NextPage: () => /* @__PURE__ */ f.jsx("span", { children: "›" }),
      LastPage: () => /* @__PURE__ */ f.jsx("span", { children: "»" }),
      Ellipsis: () => /* @__PURE__ */ f.jsx("span", { children: "..." })
    }
  }
}, Ce = dr(Se);
function Pr({ config: i, children: s }) {
  const _ = X(Se, i);
  return /* @__PURE__ */ f.jsx(Ce.Provider, { value: _, children: s });
}
function Rr(i = {}) {
  const s = vr(Ce);
  return X(s, i);
}
export {
  Se as D,
  _r as P,
  Ce as S,
  Pr as a,
  f as j,
  Rr as u
};
