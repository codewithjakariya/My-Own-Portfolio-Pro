/* ========================================
            UTILITY FUNCTIONS
========================================= */

(() => {
  "use strict";

  const doc = document;
  const win = window;

  const $ = (selector, parent = doc) => {
    if (!parent) return null;
    return parent.querySelector(selector);
  };

  const $$ = (selector, parent = doc) => {
    if (!parent) return [];
    return Array.from(parent.querySelectorAll(selector));
  };

  const on = (element, event, callback) => {
    if (!element || typeof callback !== "function") return;

    element.addEventListener(event, callback, { passive: true });
  };

  const debounce = (func, delay = 300) => {
    let timer = null;

    return (...args) => {
      if (timer) clearTimeout(timer);

      timer = window.setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const throttle = (func, limit = 100) => {
    let waiting = false;
    let frame = null;

    return (...args) => {
      if (waiting) {
        if (frame) cancelAnimationFrame(frame);

        frame = requestAnimationFrame(() => {
          waiting = false;
          func.apply(null, args);
        });

        return;
      }

      waiting = true;
      func.apply(null, args);

      window.setTimeout(() => {
        waiting = false;
      }, limit);
    };
  };

  const raf = (callback) => {
    return window.requestAnimationFrame(callback);
  };

  const storage = {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn("Storage unavailable", error);
      }
    },

    get(key) {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.warn("Storage read failed", error);
        return null;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn("Storage removal failed", error);
      }
    },
  };

  const isMobile = () => {
    return (
      win.matchMedia("(max-width: 768px)").matches || win.innerWidth <= 768
    );
  };

  const isReducedMotion = () => {
    return win.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const scrollToTop = (behavior = "smooth") => {
    win.scrollTo({ top: 0, behavior });
  };

  win.Utils = {
    $,
    $$,
    on,
    debounce,
    throttle,
    raf,
    storage,
    isMobile,
    isReducedMotion,
    scrollToTop,
  };
})();
