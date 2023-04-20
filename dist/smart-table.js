import Be, { useMemo as M, useCallback as pe, createContext as hr, useContext as yr, useState as ve, useEffect as he } from "react";
import { uniq as br, concat as mr, isNil as Le, mergeWith as Tr, splitEvery as Er, ascend as _r, descend as xr, sort as de, path as Rr, prop as Pr } from "ramda";
var i = {}, jr = {
  get exports() {
    return i;
  },
  set exports(n) {
    i = n;
  }
}, H = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Me;
function Cr() {
  if (Me)
    return H;
  Me = 1;
  var n = Be, a = Symbol.for("react.element"), d = Symbol.for("react.fragment"), E = Object.prototype.hasOwnProperty, u = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, f = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(x, g, y) {
    var v, R = {}, P = null, S = null;
    y !== void 0 && (P = "" + y), g.key !== void 0 && (P = "" + g.key), g.ref !== void 0 && (S = g.ref);
    for (v in g)
      E.call(g, v) && !f.hasOwnProperty(v) && (R[v] = g[v]);
    if (x && x.defaultProps)
      for (v in g = x.defaultProps, g)
        R[v] === void 0 && (R[v] = g[v]);
    return { $$typeof: a, type: x, key: P, ref: S, props: R, _owner: u.current };
  }
  return H.Fragment = d, H.jsx = h, H.jsxs = h, H;
}
var q = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ve;
function wr() {
  return Ve || (Ve = 1, process.env.NODE_ENV !== "production" && function() {
    var n = Be, a = Symbol.for("react.element"), d = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), u = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), x = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), V = Symbol.iterator, G = "@@iterator";
    function te(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = V && e[V] || e[G];
      return typeof r == "function" ? r : null;
    }
    var F = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
          t[o - 1] = arguments[o];
        W("error", e, t);
      }
    }
    function W(e, r, t) {
      {
        var o = F.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (r += "%s", t = t.concat([c]));
        var p = t.map(function(l) {
          return String(l);
        });
        p.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, p);
      }
    }
    var J = !1, ne = !1, X = !1, D = !1, m = !1, k;
    k = Symbol.for("react.module.reference");
    function $(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === E || e === f || m || e === u || e === y || e === v || D || e === S || J || ne || X || typeof e == "object" && e !== null && (e.$$typeof === P || e.$$typeof === R || e.$$typeof === h || e.$$typeof === x || e.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === k || e.getModuleId !== void 0));
    }
    function C(e, r, t) {
      var o = e.displayName;
      if (o)
        return o;
      var c = r.displayName || r.name || "";
      return c !== "" ? t + "(" + c + ")" : t;
    }
    function z(e) {
      return e.displayName || "Context";
    }
    function O(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case E:
          return "Fragment";
        case d:
          return "Portal";
        case f:
          return "Profiler";
        case u:
          return "StrictMode";
        case y:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case x:
            var r = e;
            return z(r) + ".Consumer";
          case h:
            var t = e;
            return z(t._context) + ".Provider";
          case g:
            return C(e, e.render, "ForwardRef");
          case R:
            var o = e.displayName || null;
            return o !== null ? o : O(e.type) || "Memo";
          case P: {
            var c = e, p = c._payload, l = c._init;
            try {
              return O(l(p));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var A = Object.assign, B = 0, be, me, Te, Ee, _e, xe, Re;
    function Pe() {
    }
    Pe.__reactDisabledLog = !0;
    function He() {
      {
        if (B === 0) {
          be = console.log, me = console.info, Te = console.warn, Ee = console.error, _e = console.group, xe = console.groupCollapsed, Re = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Pe,
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
        B++;
      }
    }
    function qe() {
      {
        if (B--, B === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: A({}, e, {
              value: be
            }),
            info: A({}, e, {
              value: me
            }),
            warn: A({}, e, {
              value: Te
            }),
            error: A({}, e, {
              value: Ee
            }),
            group: A({}, e, {
              value: _e
            }),
            groupCollapsed: A({}, e, {
              value: xe
            }),
            groupEnd: A({}, e, {
              value: Re
            })
          });
        }
        B < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ae = F.ReactCurrentDispatcher, oe;
    function Z(e, r, t) {
      {
        if (oe === void 0)
          try {
            throw Error();
          } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            oe = o && o[1] || "";
          }
        return `
` + oe + e;
      }
    }
    var ie = !1, K;
    {
      var Ge = typeof WeakMap == "function" ? WeakMap : Map;
      K = new Ge();
    }
    function je(e, r) {
      if (!e || ie)
        return "";
      {
        var t = K.get(e);
        if (t !== void 0)
          return t;
      }
      var o;
      ie = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var p;
      p = ae.current, ae.current = null, He();
      try {
        if (r) {
          var l = function() {
            throw Error();
          };
          if (Object.defineProperty(l.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(l, []);
            } catch (I) {
              o = I;
            }
            Reflect.construct(e, [], l);
          } else {
            try {
              l.call();
            } catch (I) {
              o = I;
            }
            e.call(l.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (I) {
            o = I;
          }
          e();
        }
      } catch (I) {
        if (I && o && typeof I.stack == "string") {
          for (var s = I.stack.split(`
`), j = o.stack.split(`
`), b = s.length - 1, T = j.length - 1; b >= 1 && T >= 0 && s[b] !== j[T]; )
            T--;
          for (; b >= 1 && T >= 0; b--, T--)
            if (s[b] !== j[T]) {
              if (b !== 1 || T !== 1)
                do
                  if (b--, T--, T < 0 || s[b] !== j[T]) {
                    var w = `
` + s[b].replace(" at new ", " at ");
                    return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), typeof e == "function" && K.set(e, w), w;
                  }
                while (b >= 1 && T >= 0);
              break;
            }
        }
      } finally {
        ie = !1, ae.current = p, qe(), Error.prepareStackTrace = c;
      }
      var L = e ? e.displayName || e.name : "", Ye = L ? Z(L) : "";
      return typeof e == "function" && K.set(e, Ye), Ye;
    }
    function Je(e, r, t) {
      return je(e, !1);
    }
    function Xe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function Q(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return je(e, Xe(e));
      if (typeof e == "string")
        return Z(e);
      switch (e) {
        case y:
          return Z("Suspense");
        case v:
          return Z("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            return Je(e.render);
          case R:
            return Q(e.type, r, t);
          case P: {
            var o = e, c = o._payload, p = o._init;
            try {
              return Q(p(c), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var ee = Object.prototype.hasOwnProperty, Ce = {}, we = F.ReactDebugCurrentFrame;
    function re(e) {
      if (e) {
        var r = e._owner, t = Q(e.type, e._source, r ? r.type : null);
        we.setExtraStackFrame(t);
      } else
        we.setExtraStackFrame(null);
    }
    function ze(e, r, t, o, c) {
      {
        var p = Function.call.bind(ee);
        for (var l in e)
          if (p(e, l)) {
            var s = void 0;
            try {
              if (typeof e[l] != "function") {
                var j = Error((o || "React class") + ": " + t + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw j.name = "Invariant Violation", j;
              }
              s = e[l](r, l, o, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (b) {
              s = b;
            }
            s && !(s instanceof Error) && (re(c), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", t, l, typeof s), re(null)), s instanceof Error && !(s.message in Ce) && (Ce[s.message] = !0, re(c), _("Failed %s type: %s", t, s.message), re(null));
          }
      }
    }
    var Ze = Array.isArray;
    function se(e) {
      return Ze(e);
    }
    function Ke(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Qe(e) {
      try {
        return Se(e), !1;
      } catch {
        return !0;
      }
    }
    function Se(e) {
      return "" + e;
    }
    function Oe(e) {
      if (Qe(e))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), Se(e);
    }
    var U = F.ReactCurrentOwner, er = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ke, Ae, ue;
    ue = {};
    function rr(e) {
      if (ee.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function tr(e) {
      if (ee.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function nr(e, r) {
      if (typeof e.ref == "string" && U.current && r && U.current.stateNode !== r) {
        var t = O(U.current.type);
        ue[t] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', O(U.current.type), e.ref), ue[t] = !0);
      }
    }
    function ar(e, r) {
      {
        var t = function() {
          ke || (ke = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function or(e, r) {
      {
        var t = function() {
          Ae || (Ae = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var ir = function(e, r, t, o, c, p, l) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: l,
        // Record the component responsible for creating this element.
        _owner: p
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function sr(e, r, t, o, c) {
      {
        var p, l = {}, s = null, j = null;
        t !== void 0 && (Oe(t), s = "" + t), tr(r) && (Oe(r.key), s = "" + r.key), rr(r) && (j = r.ref, nr(r, c));
        for (p in r)
          ee.call(r, p) && !er.hasOwnProperty(p) && (l[p] = r[p]);
        if (e && e.defaultProps) {
          var b = e.defaultProps;
          for (p in b)
            l[p] === void 0 && (l[p] = b[p]);
        }
        if (s || j) {
          var T = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && ar(l, T), j && or(l, T);
        }
        return ir(e, s, j, c, o, U.current, l);
      }
    }
    var le = F.ReactCurrentOwner, Fe = F.ReactDebugCurrentFrame;
    function Y(e) {
      if (e) {
        var r = e._owner, t = Q(e.type, e._source, r ? r.type : null);
        Fe.setExtraStackFrame(t);
      } else
        Fe.setExtraStackFrame(null);
    }
    var ce;
    ce = !1;
    function fe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function De() {
      {
        if (le.current) {
          var e = O(le.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ur(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var Ie = {};
    function lr(e) {
      {
        var r = De();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Ne(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = lr(r);
        if (Ie[t])
          return;
        Ie[t] = !0;
        var o = "";
        e && e._owner && e._owner !== le.current && (o = " It was passed a child from " + O(e._owner.type) + "."), Y(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, o), Y(null);
      }
    }
    function $e(e, r) {
      {
        if (typeof e != "object")
          return;
        if (se(e))
          for (var t = 0; t < e.length; t++) {
            var o = e[t];
            fe(o) && Ne(o, r);
          }
        else if (fe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var c = te(e);
          if (typeof c == "function" && c !== e.entries)
            for (var p = c.call(e), l; !(l = p.next()).done; )
              fe(l.value) && Ne(l.value, r);
        }
      }
    }
    function cr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === R))
          t = r.propTypes;
        else
          return;
        if (t) {
          var o = O(r);
          ze(t, e.props, "prop", o, e);
        } else if (r.PropTypes !== void 0 && !ce) {
          ce = !0;
          var c = O(r);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function fr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var o = r[t];
          if (o !== "children" && o !== "key") {
            Y(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), Y(null);
            break;
          }
        }
        e.ref !== null && (Y(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), Y(null));
      }
    }
    function We(e, r, t, o, c, p) {
      {
        var l = $(e);
        if (!l) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var j = ur(c);
          j ? s += j : s += De();
          var b;
          e === null ? b = "null" : se(e) ? b = "array" : e !== void 0 && e.$$typeof === a ? (b = "<" + (O(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : b = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", b, s);
        }
        var T = sr(e, r, t, c, p);
        if (T == null)
          return T;
        if (l) {
          var w = r.children;
          if (w !== void 0)
            if (o)
              if (se(w)) {
                for (var L = 0; L < w.length; L++)
                  $e(w[L], e);
                Object.freeze && Object.freeze(w);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              $e(w, e);
        }
        return e === E ? fr(T) : cr(T), T;
      }
    }
    function dr(e, r, t) {
      return We(e, r, t, !0);
    }
    function pr(e, r, t) {
      return We(e, r, t, !1);
    }
    var gr = pr, vr = dr;
    q.Fragment = E, q.jsx = gr, q.jsxs = vr;
  }()), q;
}
(function(n) {
  process.env.NODE_ENV === "production" ? n.exports = Cr() : n.exports = wr();
})(jr);
function Ue(n, a) {
  return Array.isArray(n) && Array.isArray(a) ? br(mr(n, a)) : typeof n == "object" && typeof a == "object" && !Le(n) && !Le(a) ? Tr(Ue, n, a) : a;
}
function Sr({ active: n = !1, activeClassName: a, onClick: d, children: E, ...u }) {
  return /* @__PURE__ */ i.jsx("div", { onClick: d, className: n ? a : "", ...u, children: E });
}
function ge({ activePage: n, pageCount: a, onSetActivePage: d, config: E }) {
  const u = ye(E), f = u.components, h = u.pagination.glyphs, x = M(() => a > u.pagination.maxPagesToShow ? u.pagination.maxPagesToShow : a, [u.pagination.maxPagesToShow, a]), g = M(() => {
    let v = n - Math.floor(u.pagination.maxPagesToShow / 2) > 0 ? n - Math.floor(u.pagination.maxPagesToShow / 2) : 0;
    return n > a - u.pagination.maxPagesToShow && (v = a - u.pagination.maxPagesToShow), v > 0 ? v : 0;
  }, [n, u.pagination.maxPagesToShow, a]), y = pe(
    function(v) {
      v.preventDefault(), v.stopPropagation();
      const { currentTarget: R } = v, P = Number(R.dataset.page ?? 0);
      return P < 0 ? d(0) : P > a - 1 ? d(a - 1) : d(P);
    },
    [d, a]
  );
  return u.pagination.useCustomPagination ? /* @__PURE__ */ i.jsx(f.Paginator, { activePage: n, pageCount: a, onSetActivePage: d }) : a < 2 ? null : /* @__PURE__ */ i.jsxs(f.Paginator, { children: [
    /* @__PURE__ */ i.jsx(f.PaginatorItem, { "data-page": 0, onClick: y, children: /* @__PURE__ */ i.jsx(h.FirstPage, {}) }),
    /* @__PURE__ */ i.jsx(f.PaginatorItem, { "data-page": n - 1, onClick: y, children: /* @__PURE__ */ i.jsx(h.PreviousPage, {}) }),
    g + n >= u.pagination.maxPagesToShow && /* @__PURE__ */ i.jsx(
      f.PaginatorItem,
      {
        "data-page": n - u.pagination.maxPagesToShow,
        onClick: y,
        children: /* @__PURE__ */ i.jsx(h.Ellipsis, {})
      }
    ),
    Array.from(Array(x)).map((v, R) => /* @__PURE__ */ i.jsx(
      f.PaginatorItem,
      {
        "data-page": R + g,
        active: R + g === n,
        activeClassName: u.pagination.activePageItemClassName,
        onClick: y,
        children: R + 1 + g
      },
      R + g
    )),
    g + u.pagination.maxPagesToShow < a && /* @__PURE__ */ i.jsx(
      f.PaginatorItem,
      {
        "data-page": n + u.pagination.maxPagesToShow,
        onClick: y,
        children: /* @__PURE__ */ i.jsx(h.Ellipsis, {})
      }
    ),
    /* @__PURE__ */ i.jsx(f.PaginatorItem, { "data-page": n + 1, onClick: y, children: /* @__PURE__ */ i.jsx(h.NextPage, {}) }),
    /* @__PURE__ */ i.jsx(f.PaginatorItem, { "data-page": a - 1, onClick: y, children: /* @__PURE__ */ i.jsx(h.LastPage, {}) })
  ] });
}
const Or = {
  components: {
    TableContainer: "div",
    Table: "table",
    TableHead: "thead",
    TableBody: "tbody",
    TableHeader: "th",
    TableRow: "tr",
    TableCell: "td",
    Paginator: ge,
    PaginatorItem: Sr
  },
  pagination: {
    showPaginatorAboveTable: !1,
    showPaginatorBelowTable: !0,
    maxPagesToShow: 5,
    activePageItemClassName: "active-page-item",
    useCustomPagination: !1,
    glyphs: {
      FirstPage: () => /* @__PURE__ */ i.jsx("span", { children: "«" }),
      PreviousPage: () => /* @__PURE__ */ i.jsx("span", { children: "‹" }),
      NextPage: () => /* @__PURE__ */ i.jsx("span", { children: "›" }),
      LastPage: () => /* @__PURE__ */ i.jsx("span", { children: "»" }),
      Ellipsis: () => /* @__PURE__ */ i.jsx("span", { children: "..." })
    }
  }
}, kr = hr(Or);
function ye(n = {}) {
  const a = yr(kr);
  return Ue(a, n);
}
function Ar(n = [], a = 10) {
  const [d, E] = ve(0);
  he(() => {
    E(0);
  }, [a]);
  const [u, f] = M(() => {
    const h = Er(a, n);
    return h.length === 0 ? [[], 0] : [h[d] || [], h.length];
  }, [n, a, d]);
  return { pageItems: u, pageCount: f, activePage: d, setActivePage: E };
}
var N;
(function(n) {
  n[n.Ascending = 0] = "Ascending", n[n.Descending = 1] = "Descending";
})(N || (N = {}));
const Fr = (n, a, d) => {
  const [E, u] = ve(n || []), f = M(() => d === N.Ascending ? _r : xr, [d]);
  return he(() => {
    if (typeof a == "function") {
      const x = de(f(a));
      u(x(n));
      return;
    }
    if (Array.isArray(a)) {
      const x = de(f(Rr(a)));
      u(x(n));
      return;
    }
    const h = de(f(Pr(a)));
    u(h(n));
  }, [n, a, d, f]), E;
};
function Dr({ column: n, sortProperties: a, onSort: d, config: E }) {
  const f = ye(E).components, h = M(() => n.getSortProperty === a.property, [n.getSortProperty, a.property]);
  return n.getSortProperty ? /* @__PURE__ */ i.jsxs(
    f.TableHeader,
    {
      onClick: () => d(n.getSortProperty),
      className: n.headerClassName,
      children: [
        n.title,
        !!n.getSortProperty && h && (a.direction === N.Ascending ? /* @__PURE__ */ i.jsx(i.Fragment, {}) : /* @__PURE__ */ i.jsx(i.Fragment, {}))
      ]
    },
    n.key
  ) : /* @__PURE__ */ i.jsx(f.TableHeader, { className: n.headerClassName, children: n.title }, n.key);
}
function $r({
  columns: n,
  items: a = [],
  getItemKey: d,
  tableClassName: E = "",
  rowClassName: u = "",
  commonCellClassName: f = "",
  headerRowClassName: h = "",
  onRowClick: x,
  parseDatasetValue: g = (P) => P,
  defaultSortProperties: y,
  pageSize: v = 20,
  config: R
}) {
  const P = ye(R), [S, V] = ve({
    property: (y == null ? void 0 : y.property) ?? d,
    direction: (y == null ? void 0 : y.direction) ?? N.Ascending
  }), G = Fr(a, S.property, S.direction), { pageItems: te, pageCount: F, activePage: _, setActivePage: W } = Ar(G, v);
  he(() => {
    W(0);
  }, [a, W]);
  const J = pe(
    function(k) {
      if (S.property === k) {
        V(($) => ({
          ...$,
          direction: $.direction === N.Ascending ? N.Descending : N.Ascending
        }));
        return;
      }
      V({
        property: k,
        direction: N.Ascending
      });
    },
    [S]
  ), ne = pe(
    (m) => {
      if (x) {
        const k = a.find(
          ($) => d($) === g(m.currentTarget.dataset.itemkey ?? "")
        );
        k && x(k);
      }
    },
    [a, x, d, g]
  ), X = M(() => n.filter((m) => !!m), [n]), D = P.components;
  return /* @__PURE__ */ i.jsxs(D.TableContainer, { children: [
    P.pagination.showPaginatorAboveTable && /* @__PURE__ */ i.jsx(ge, { activePage: _, pageCount: F, onSetActivePage: W }),
    /* @__PURE__ */ i.jsxs(D.Table, { className: E, children: [
      /* @__PURE__ */ i.jsx(D.TableHead, { children: /* @__PURE__ */ i.jsx(D.TableRow, { className: h, children: X.map((m) => m.renderHeader ? m.renderHeader({
        column: m,
        sortProperties: S,
        onSort: J
      }) : /* @__PURE__ */ i.jsx(
        Dr,
        {
          column: m,
          sortProperties: S,
          onSort: J
        },
        m.key
      )) }) }),
      /* @__PURE__ */ i.jsx(D.TableBody, { children: te.map((m, k) => {
        const $ = typeof u == "function" ? u(m) : u;
        return /* @__PURE__ */ i.jsx(
          D.TableRow,
          {
            onClick: ne,
            "data-itemkey": d(m),
            className: $,
            children: X.map((C) => {
              var A;
              const z = typeof f == "function" ? f(m) : f, O = typeof C.cellClassName == "function" ? C.cellClassName(m) : C.cellClassName;
              return /* @__PURE__ */ i.jsx(
                D.TableCell,
                {
                  className: `${z} ${O}`,
                  width: C.width,
                  children: ((A = C.getValue) == null ? void 0 : A.call(C, m, _ * v + k, G)) ?? m[C.key] ?? C.value
                },
                C.key
              );
            })
          },
          d(m)
        );
      }) })
    ] }),
    P.pagination.showPaginatorBelowTable && /* @__PURE__ */ i.jsx(ge, { activePage: _, pageCount: F, onSetActivePage: W })
  ] });
}
export {
  $r as SmartTable,
  Dr as TableHeader
};
