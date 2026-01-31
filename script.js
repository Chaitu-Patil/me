/* ===============================
   SMOOTH ANCHOR SCROLL
================================ */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document
      .querySelector(link.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});

/* ===============================
   FADE-IN OBSERVER
================================ */

const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => fadeObserver.observe(el));

/* ===============================
   SCROLL PROGRESS
================================ */

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height =
    document.documentElement.scrollHeight - window.innerHeight;

  progressBar.style.width = (scrollTop / height) * 100 + "%";
});

/* ===============================
   THEME TOGGLE
================================ */

const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const icon = document.querySelector(".theme-icon");

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
} else if (prefersDark) {
  root.setAttribute("data-theme", "dark");
}

function updateIcon() {
  icon.textContent =
    root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
}

updateIcon();

toggle.addEventListener("click", () => {
  const newTheme =
    root.getAttribute("data-theme") === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon();
});

/* ===============================
   AUTO-HIGHLIGHT ACTIVE SECTION
================================ */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".sidebar a[href^='#']");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          )
        );
      }
    });
  },
  {
    rootMargin: "-40% 0px -55% 0px"
  }
);

sections.forEach(section => sectionObserver.observe(section));
