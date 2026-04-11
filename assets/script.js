/* ============================================================
   GLOBAL SCRIPT — Prakash Sai Alla Portfolio
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- Loading screen ---- */
  initLoadingScreen();

  /* ---- Theme toggle ---- */
  initThemeToggle();

  /* ---- Mobile nav ---- */
  initMobileNav();

  /* ---- Typewriters ---- */
  initTypewriter("changing-text", [
    "Data Analyst",
    "Business Analyst",
    "BI Dashboard Developer",
    "SQL & Python Developer",
    "Predictive Analytics Engineer",
    "Machine Learning Enthusiast"
  ], 75, 45, 1100);

  initTypewriter("header-typewriter", [
    "Data Analyst",
    "Business Analyst",
    "BI Dashboard Developer",
    "Data Engineer"
  ], 80, 50, 1300);

  /* ---- Portfolio filters ---- */
  initPortfolioFilters();

  /* ---- Scroll to top on load ---- */
  window.scrollTo(0, 0);
});

/* ============================================================
   LOADING SCREEN
   ============================================================ */
function initLoadingScreen() {
  const screen = document.getElementById("loading-screen");
  if (!screen) return;
  document.body.style.overflow = "hidden";
  // Bar animation takes 0.8s (starts at 0.35s), dismiss after ~1.1s total
  setTimeout(() => {
    screen.classList.add("hidden");
    document.body.style.overflow = "";
  }, 1100);
}

/* ============================================================
   THEME TOGGLE (dark / light)
   ============================================================ */
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);

  btn.addEventListener("click", () => {
    const current = document.body.classList.contains("light-mode") ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

function applyTheme(theme) {
  const btn = document.getElementById("theme-toggle");
  if (theme === "light") {
    document.body.classList.add("light-mode");
    if (btn) btn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    document.body.classList.remove("light-mode");
    if (btn) btn.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });

  // Close when a link is clicked
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
    });
  });

  // Close on outside click
  document.addEventListener("click", e => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
    }
  });
}

/* ============================================================
   TYPEWRITER
   ============================================================ */
function initTypewriter(id, words, typeSpeed, deleteSpeed, pauseDelay) {
  const el = document.getElementById(id);
  if (!el) return;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const word = words[wordIndex];
    el.textContent = deleting
      ? word.slice(0, --charIndex)
      : word.slice(0, ++charIndex);

    if (!deleting && charIndex === word.length) {
      setTimeout(() => { deleting = true; }, pauseDelay);
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, deleting ? deleteSpeed : typeSpeed);
  }

  type();
}

/* ============================================================
   PORTFOLIO FILTERS (fixed: re-trigger AOS)
   ============================================================ */
function initPortfolioFilters() {
  const buttons = document.querySelectorAll(".portfolio-filters li");
  const items   = document.querySelectorAll(".portfolio-item");
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("filter-active"));
      btn.classList.add("filter-active");

      const filter = btn.dataset.filter;

      items.forEach(item => {
        const match = filter === "all" || item.classList.contains(filter);
        item.style.display = match ? "" : "none";

        // Re-trigger visibility for filtered items
        if (match) {
          item.style.opacity = "1";
          item.style.transform = "none";
        }
      });
    });
  });
}

/* ============================================================
   SKILL BARS (about page)
   ============================================================ */
window.addEventListener("load", () => {
  const bars = document.querySelectorAll(".progress");
  if (!bars.length) return;

  let animated = false;

  const skillsSection = document.querySelector(".skills-section");
  if (!skillsSection) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      bars.forEach(bar => {
        bar.style.width = bar.getAttribute("data-progress") + "%";
      });
    }
  }, { threshold: 0.25 });

  observer.observe(skillsSection);
});

/* ============================================================
   STATS COUNTER (about page)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stats-number");
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.getAttribute("data-target"), 10);
      let current  = 0;
      const step   = target / 60;

      const tick = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.ceil(current).toLocaleString();
          requestAnimationFrame(tick);
        } else {
          el.textContent = target.toLocaleString();
        }
      };

      tick();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
});

/* ============================================================
   RESUME TIMELINE ANIMATION
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (!timelineItems.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.1 });

  timelineItems.forEach(item => obs.observe(item));
});

/* ============================================================
   END OF SCRIPT
   ============================================================ */
