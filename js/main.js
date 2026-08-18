(function () {
  "use strict";

  /* ---- 1. Nav scroll shadow ------------------------------------------ */
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- 2. Mobile burger menu ---------------------------------------- */
  const burger = document.querySelector(".nav__burger");
  const links  = document.querySelector(".nav__links");
  if (burger && links) {
    const setOpen = (open) => {
      links.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    };
    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(!links.classList.contains("is-open"));
    });
    // Klick auf Menüpunkt schließt das Menü
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });
    // Klick außerhalb schließt das Menü
    document.addEventListener("click", (e) => {
      if (!links.classList.contains("is-open")) return;
      if (links.contains(e.target) || burger.contains(e.target)) return;
      setOpen(false);
    });
    // ESC schließt das Menü
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  /* ---- 3. Karte: Click-to-Load (DSGVO-freundlich) ------------------- */
  document.querySelectorAll("[data-map-load]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wrap = btn.closest("[data-map-bbox]");
      if (!wrap) return;
      const bbox   = wrap.getAttribute("data-map-bbox");
      const marker = wrap.getAttribute("data-map-marker");
      if (!bbox || !marker) return;

      const iframe = document.createElement("iframe");
      iframe.title = "Karte: Anfahrt zur Praxis";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer";
      iframe.src =
        "https://www.openstreetmap.org/export/embed.html" +
        "?bbox=" + encodeURIComponent(bbox) +
        "&layer=mapnik" +
        "&marker=" + encodeURIComponent(marker);
      wrap.innerHTML = "";
      wrap.appendChild(iframe);
    });
  });
})();
