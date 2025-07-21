const words = ["Developer...", "Designer...", "Security expert...", "Gamer..."];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
const speed = 50;

function type() {
    const typingElement = document.querySelector(".typing-text");

    if (i < words.length) {
        if (!isDeleting && j <= words[i].length) {
            currentWord = words[i].substring(0, j++);
        } else if (isDeleting && j >= 0) {
            currentWord = words[i].substring(0, j--);
        }

        typingElement.textContent = currentWord;

        if (!isDeleting && j === words[i].length) {
            isDeleting = true;
            setTimeout(type, 1000);
            return;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
        }

        setTimeout(type, speed);
    }
}

document.addEventListener("DOMContentLoaded", type);

NProgress.start();
window.addEventListener("load", () => {
    NProgress.done();
});

function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("show");
}
