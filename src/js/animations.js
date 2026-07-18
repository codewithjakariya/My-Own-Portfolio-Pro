/* ========================================
            ANIMATION SYSTEM
======================================== */

(() => {
  "use strict";

  const reducedMotion = Utils.isReducedMotion();

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {
    if (reducedMotion) {
      revealElements.forEach((element) => element.classList.add("active"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.15 },
      );

      revealElements.forEach((element) => revealObserver.observe(element));
    }
  }

  const counters = document.querySelectorAll(".stat-number");

  const animateCounter = (element) => {
    const target = Number(element.dataset.count || element.dataset.target || 0);
    let current = 0;
    const speed = target / CONFIG.animation.counterSpeed;

    const update = () => {
      current += speed;

      if (current < target) {
        element.textContent = Math.floor(current);
        Utils.raf(update);
      } else {
        element.textContent = target;
      }
    };

    update();
  };

  if (counters.length) {
    if (reducedMotion) {
      counters.forEach((counter) => {
        counter.textContent =
          counter.dataset.count ||
          counter.dataset.target ||
          counter.textContent;
      });
    } else {
      const counterObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            animateCounter(entry.target);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.5 },
      );

      counters.forEach((counter) => counterObserver.observe(counter));
    }
  }

  const typeElement = document.querySelector(".typewriter");

  if (typeElement) {
    const text = typeElement.dataset.text || "";

    if (reducedMotion) {
      typeElement.textContent = text;
    } else {
      typeElement.textContent = "";

      if (text) {
        let index = 0;
        const speed = CONFIG.animation.typeSpeed || 80;

        const typing = () => {
          if (index >= text.length) return;
          typeElement.textContent += text.charAt(index++);
          window.setTimeout(typing, speed);
        };

        typing();
      }
    }
  }

  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener(
      "mousemove",
      (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        Utils.raf(() => {
          button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
      },
      { passive: true },
    );

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });

  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener(
      "mousemove",
      (event) => {
        const rect = card.getBoundingClientRect();
        const rotateX = (event.clientY - rect.top - rect.height / 2) / 20;
        const rotateY = (rect.width / 2 - (event.clientX - rect.left)) / 20;

        Utils.raf(() => {
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
      },
      { passive: true },
    );

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();
