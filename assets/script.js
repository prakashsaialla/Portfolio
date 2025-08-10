document.addEventListener("DOMContentLoaded", function () {
    const text = "Business Analytics Graduate | Data Science Enthusiast | AI Explorer";
    let i = 0;
    const speed = 80;
    const typewriter = document.querySelector(".typewriter");

    function typeEffect() {
        if (i < text.length) {
            typewriter.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeEffect, speed);
        }
    }
    typeEffect();
});
