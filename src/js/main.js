/* ========================================
            MAIN APP CONTROLLER
======================================== */

(() => {
  "use strict";

  const APP = {
    initialized: false,
    ticking: false,
  };

  const progressBar = document.querySelector(".progress__bar");

  const updateScrollProgress = () => {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  const handleScroll = () => {
    if (APP.ticking) return;

    APP.ticking = true;

    window.requestAnimationFrame(() => {
      updateScrollProgress();
      APP.ticking = false;
    });
  };

  const handleResize = Utils.debounce(() => {
    updateScrollProgress();
  }, 150);

  const init = () => {
    if (APP.initialized) return;

    APP.initialized = true;

    updateScrollProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    window.addEventListener("error", (event) => {
      console.error("[Portfolio Error]", event.message);
    });

    window.addEventListener("unhandledrejection", (event) => {
      console.error("[Promise Error]", event.reason);
    });

    document.documentElement.classList.add("js-ready");
    document.body.setAttribute(
      "data-theme",
      document.body.classList.contains("light-theme") ? "light" : "dark",
    );
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
