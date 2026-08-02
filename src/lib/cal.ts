/* eslint-disable prefer-const, prefer-rest-params, @typescript-eslint/no-explicit-any */
/**
 * Cal.com embed bootstrap — the single place the vendor snippet lives.
 *
 * The IIFE below is Cal's official loader, kept byte-for-byte as they publish it
 * so it stays trivial to diff when they update it. That's why this file carries
 * lint exemptions; nothing else in the app does.
 *
 * Calling this repeatedly is safe: the loader self-guards via `C.Cal || …`, and
 * Cal's own snippet re-runs `init` on every embed.
 */

const NAMESPACE = "15min";

/** The Cal event this site books against. */
export const CAL_LINK = "arhafez/15min";

/** Loads the embed if needed and returns the namespaced Cal API. */
export function loadCal() {
  (function (C, A, L) {
    let p = function (a, ar) {
      a.q.push(ar);
    };
    let d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(window as any, "https://app.cal.com/embed/embed.js", "init");

  const Cal = (window as any).Cal;
  Cal("init", NAMESPACE, { origin: "https://app.cal.com" });
  Cal.config = Cal.config || {};
  Cal.config.forwardQueryParams = true;

  return Cal.ns[NAMESPACE];
}
