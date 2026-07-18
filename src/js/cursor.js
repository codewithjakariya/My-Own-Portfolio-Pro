/* ========================================
            CUSTOM CURSOR SYSTEM
======================================== */

(() => {
  "use strict";

  const isDesktop = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  if (!isDesktop) return;

  const cursor = document.createElement("div");
  const cursorGlow = document.createElement("div");

  cursor.className = "custom-cursor";
  cursorGlow.className = "cursor-glow";
  cursor.style.pointerEvents = "none";
  cursorGlow.style.pointerEvents = "none";

  document.body.append(cursor, cursorGlow);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  window.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    },
    { passive: true },
  );

  const animateCursor = () => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    cursorGlow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    window.requestAnimationFrame(animateCursor);
  };

  animateCursor();

  document.addEventListener("mouseover", (event) => {
    const target = event.target;
    const interactive =
      target instanceof Element &&
      target.closest("a, button, .btn, .magnetic, .tilt-card");
    cursor.classList.toggle("active", Boolean(interactive));
  });

  document.addEventListener("mouseout", () => {
    cursor.classList.remove("active");
  });

  const toggleCursor = (show) => {
    const opacity = show ? "1" : "0";
    cursor.style.opacity = opacity;
    cursorGlow.style.opacity = opacity;
  };

  document.addEventListener("mouseleave", () => toggleCursor(false));
  document.addEventListener("mouseenter", () => toggleCursor(true));
  window.addEventListener("blur", () => toggleCursor(false));
  window.addEventListener("focus", () => toggleCursor(true));
})();
