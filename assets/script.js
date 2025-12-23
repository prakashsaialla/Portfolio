document.addEventListener("DOMContentLoaded", () => {
    initTypewriter("changing-text", [
        "Business Analyst",
        "Data Scientist",
        "Data Analyst",
        "Machine Learning Engineer",
        "AI Engineer",
        "Python & SQL Developer"
    ], 75, 50, 1000);

    initTypewriter("header-typewriter", [
        "Data Analyst",
        "Business Analytics Graduate",
        "Machine Learning Enthusiast",
        "Dashboard & BI Specialist"
    ], 80, 50, 1200);

    initQuoteCarousel();
    initPortfolioFilters();

    window.scrollTo(0, 0);
});

/* ---------------- TYPEWRITER ---------------- */

function initTypewriter(id, words, typeSpeed, deleteSpeed, delay) {
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
            setTimeout(() => deleting = true, delay);
        } 
        else if (deleting && charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, deleting ? deleteSpeed : typeSpeed);
    }

    type();
}

/* ---------------- QUOTE CAROUSEL ---------------- */

function initQuoteCarousel() {
    const slides = document.querySelectorAll(".quote-slide");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");
    let index = 0;

    if (!slides.length) return;

    const show = i => {
        slides.forEach(s => s.classList.remove("active"));
        slides[i].classList.add("active");
    };

    next?.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        show(index);
    });

    prev?.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        show(index);
    });

    show(index);
    setInterval(() => {
        index = (index + 1) % slides.length;
        show(index);
    }, 5000);
}

/* ---------------- PORTFOLIO FILTERS ---------------- */

function initPortfolioFilters() {
    const buttons = document.querySelectorAll(".portfolio-filters li");
    const items = document.querySelectorAll(".portfolio-item");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("filter-active"));
            btn.classList.add("filter-active");

            const filter = btn.dataset.filter;

            items.forEach(item => {
                item.style.display =
                    filter === "all" || item.classList.contains(filter)
                        ? "block"
                        : "none";
            });
        });
    });
}
