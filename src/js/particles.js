/* ========================================
        TSPARTICLES SYSTEM
======================================== */

(() => {
  "use strict";

  const CONTAINER_ID = "tsparticles";
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const hasContainer = document.getElementById(CONTAINER_ID);
  const hasLibrary = typeof window.tsParticles !== "undefined";

  if (!hasContainer || !hasLibrary || reducedMotion) return;

  window.tsParticles.load(CONTAINER_ID, {
    fullScreen: false,
    background: { color: "transparent" },
    fpsLimit: 60,
    detectRetina: true,

    particles: {
      number: {
        value: 30,
        density: { enable: true, area: 1200 },
      },
      color: { value: ["#7C3AED", "#06B6D4", "#22C55E"] },
      links: { enable: false },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
      opacity: {
        value: 0.25,
        animation: { enable: true, speed: 0.3, minimumValue: 0.08 },
      },
      shape: { type: "circle" },
      size: { value: { min: 2, max: 6 } },
    },

    interactivity: {
      detectsOn: "window",
      events: {
        resize: true,
        onHover: { enable: true, mode: "bubble" },
      },
      modes: {
        bubble: { distance: 120, duration: 1, opacity: 0.8, size: 8 },
      },
    },
  });
})();
