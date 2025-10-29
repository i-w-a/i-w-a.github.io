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

  /* ------------------------------
     Language Toggle (JA / EN)
  ------------------------------ */
  const langToggle = document.querySelector(".lang-toggle");
  const LANG_KEY = "portfolio-lang";

  const translations = {
    en: {
      subtitle: "AI Engineer",
      intro: "During my time at Osaka University and NAIST I researched neurodevelopmental support using gaze, emotion recognition and perspective-taking tasks, and analyzed trust and Theory of Mind factors in virtual agents. Currently developing multi-AI agents at LINE Yahoo.",
      "about-heading": "About",
      "skills-heading": "Skills",
      "kaggle-heading": "Kaggle",
      "publications-heading": "Featured Publications",
      "contact-heading": "Contact"
    },
    ja: {
      subtitle: "AIエンジニア",
      intro: "学生期（大阪大学 / NAIST）では視線・感情認知・視点取得課題を用いた神経発達症支援研究に加え、仮想エージェントの信頼性と心の理論 (Theory of Mind) 要因の分析・モデル化に従事。現在は LINEヤフー株式会社でマルチAIエージェント開発に取り組んでいます。",
      "about-heading": "About",
      "skills-heading": "Skills",
      "kaggle-heading": "Kaggle",
      "publications-heading": "Featured Publications",
      "contact-heading": "Contact"
    }
  };

  function applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;
    Object.entries(dict).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });
    langToggle.textContent = lang === "ja" ? "EN" : "JA";
    document.documentElement.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
  }

  function toggleLanguage() {
    const current = localStorage.getItem(LANG_KEY) || "ja";
    const next = current === "ja" ? "en" : "ja";
    applyLanguage(next);
  }

  // Restore language
  const savedLang = localStorage.getItem(LANG_KEY) || "ja";
  applyLanguage(savedLang);

  if (langToggle) {
    langToggle.addEventListener("click", toggleLanguage);
    langToggle.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleLanguage();
      }
    });
  }
})();
