document.addEventListener("DOMContentLoaded", () => {
    // Typing effect variables
    const roles = [
        "Data Scientist",
        "AI Engineer",
        "Machine Learning Specialist",
        "Big Data Explorer",
        "Analytics Innovator"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 75;
    const erasingSpeed = 50;
    const delayBetween = 1000;

    const textElement = document.getElementById("changing-text");

    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            charIndex--;
            textElement.textContent = currentRole.substring(0, charIndex);
        } else {
            charIndex++;
            textElement.textContent = currentRole.substring(0, charIndex);
        }

        if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => isDeleting = true, delayBetween);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
    }

    if (textElement) {
        typeEffect();
    }

    // Quote Carousel setup
    let slideIndex = 0;
    const slides = document.querySelectorAll(".quote-slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        if (slides[index]) {
            slides[index].classList.add("active");
        }
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }

    function prevSlideFunc() {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener("click", nextSlide);
        prevBtn.addEventListener("click", prevSlideFunc);
        showSlide(slideIndex);

        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Scroll to top on page load
    window.onload = () => {
        window.scrollTo(0, 0);
    };

});
