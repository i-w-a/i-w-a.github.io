/* ==============================
   Portfolio Site JS
   - Mobile Nav Toggle
   - Theme (Dark / Light) Toggle (localStorage)
   - Smooth Scroll Enhancement
   - Intersection Observer (fade-in sections)
   - Dynamic Year in Footer
============================== */

(function () {
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const themeToggle = document.querySelector(".theme-toggle");
  const sections = document.querySelectorAll(".fade-section");
  const yearSpan = document.getElementById("year");

  /* ------------------------------
     Dynamic Year
  ------------------------------ */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ------------------------------
     Restore Theme from localStorage
  ------------------------------ */
  const THEME_KEY = "portfolio-theme";
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  /* ------------------------------
     Theme Toggle Handler
  ------------------------------ */
  function toggleTheme() {
    body.classList.toggle("dark");
    localStorage.setItem(THEME_KEY, body.classList.contains("dark") ? "dark" : "light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    themeToggle.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  /* ------------------------------
     Mobile Nav Toggle
  ------------------------------ */
  function closeMenu() {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    body.classList.remove("menu-open");
  }

  function openMenu() {
    navLinks.classList.add("open");
    navToggle.classList.add("active");
    body.classList.add("menu-open");
  }

  function toggleMenu() {
    const isOpen = navLinks.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (navToggle) {
    navToggle.addEventListener("click", toggleMenu);
  }

  // Close menu when clicking a link (mobile UX)
  if (navLinks) {
    navLinks.addEventListener("click", (e) => {
      if (e.target.matches("a[href^='#']")) {
        closeMenu();
      }
    });
  }

  /* ------------------------------
     Smooth Scroll Poly / Enhancement
  ------------------------------ */
  function smoothScrollTo(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 0; // adjust offset if header height needed
    window.scrollTo({
      top,
      behavior: "smooth"
    });
  }

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href^='#']");
    if (!link) return;
    const hash = link.getAttribute("href");
    if (hash.length > 1) {
      e.preventDefault();
      smoothScrollTo(hash.slice(1));
      history.replaceState(null, "", hash); // update URL without jump
    }
  });

  /* ------------------------------
     Intersection Observer for Fade-in
  ------------------------------ */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.15
    }
  );

  sections.forEach((sec) => observer.observe(sec));

  /* ------------------------------
     Accessibility: Close menu on resize > breakpoint
  ------------------------------ */
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    if (width >= 880 && lastWidth < 880) {
      closeMenu();
    }
    lastWidth = width;
  });

  /* ------------------------------
     Keyboard ESC to close mobile menu
  ------------------------------ */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
})();
