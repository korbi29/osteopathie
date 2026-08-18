/**
 * Reveal-on-Scroll
 * Fügt Elementen mit [data-reveal] die Klasse `is-visible` hinzu,
 * sobald sie ins Viewport scrollen.
 */
(function () {
  "use strict";

  var elements = document.querySelectorAll("[data-reveal]");
  if (!elements.length) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  });

  elements.forEach(function (el) { observer.observe(el); });
})();
