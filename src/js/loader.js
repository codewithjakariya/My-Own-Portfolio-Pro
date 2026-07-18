/* ========================================
            LOADER SYSTEM
======================================== */

(() => {
  "use strict";

  const loader = document.querySelector(".loader");

  if (!loader) return;

  let loaderHidden = false;

  const setBodyOverflow = (hidden) => {
    document.body.style.overflow = hidden ? "hidden" : "";
  };

  const hideLoader = () => {
    if (loaderHidden) return;

    loaderHidden = true;

    loader.classList.add("hidden");
    document.documentElement.classList.remove("loading");
    setBodyOverflow(false);

    window.setTimeout(() => {
      loader.remove();
    }, 600);
  };

  const initLoader = () => {
    document.documentElement.classList.add("loading");
    setBodyOverflow(true);

    if (document.readyState === "complete") {
      hideLoader();
      return;
    }

    window.addEventListener("load", hideLoader, { once: true });
    window.setTimeout(hideLoader, 3500);
  };

  initLoader();
})();
