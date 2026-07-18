/* ========================================
            NAVIGATION SYSTEM
======================================== */

(() => {
  "use strict";

  const header = document.querySelector(".header");
  const allNavLinks = document.querySelectorAll(".nav-link, .mobile-menu a");
  const sections = document.querySelectorAll("section");

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuClose = document.querySelector("#menu-close");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const backToTop = document.querySelector(".back-to-top");

  const handleHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 50);
  };

  const updateActiveLink = () => {
    let current = "";
    const offset = window.scrollY + 180;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (offset >= sectionTop && offset < sectionTop + sectionHeight) {
        current = section.id;
      }
    });

    allNavLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("active", isActive);
      link.setAttribute("aria-current", isActive ? "page" : "false");
    });
  };

  const closeMenu = () => {
    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");

    // Move focus back to the menu button
    menuToggle.focus();
  };

  const toggleMenu = () => {
    if (!mobileMenu || !menuToggle) return;

    const isOpen = mobileMenu.classList.toggle("active");

    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleMenu();
    });
  }

  document.addEventListener("click", (event) => {
    if (!mobileMenu || !menuToggle) return;

    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  if (menuClose) {
    menuClose.addEventListener("click", (event) => {
      event.stopPropagation();
      closeMenu();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  const handleBackTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > 500);
  };

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = themeToggle?.querySelector("i");
  const THEME_KEY = CONFIG.theme.storageKey;
  const DEFAULT_THEME = CONFIG.theme.default;

  const updateThemeIcon = () => {
    if (!themeIcon) return;

    themeIcon.className = document.body.classList.contains("light-theme")
      ? "fa-solid fa-sun"
      : "fa-solid fa-moon";
  };

  const savedTheme = Utils.storage.get(THEME_KEY) || DEFAULT_THEME;

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");

      const currentTheme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
      Utils.storage.set(THEME_KEY, currentTheme);
      updateThemeIcon();
    });
  }

  const optimizedScroll = Utils.throttle(() => {
    handleHeader();
    updateActiveLink();
    handleBackTop();
  }, 100);

  window.addEventListener("scroll", optimizedScroll, { passive: true });

  handleHeader();
  updateActiveLink();
  handleBackTop();

  const footer = document.querySelector(".footer");

  if (footer && backToTop) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        backToTop.classList.toggle("footer-visible", entry.isIntersecting);
      });
    });

    footerObserver.observe(footer);
  }
})();
