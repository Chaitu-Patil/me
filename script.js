// Scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fade-in sections
const fadeElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
fadeElements.forEach(el => observer.observe(el));

// Scroll progress bar + auto highlight
const progressBar = document.getElementById("progress-bar");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";

  const sections = document.querySelectorAll("main section");
  let currentSectionId = sections[0].id;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (scrollTop >= sectionTop) currentSectionId = section.id;
  });
  document.querySelectorAll(".sidebar a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentSectionId}`);
  });
});

// Theme toggle with crossfade
const toggleBtn = document.querySelector(".theme-toggle");
const body = document.body;
const overlay = document.getElementById("theme-overlay");

toggleBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  setTimeout(() => {
    body.classList.toggle("dark");
    body.classList.toggle("light");
    overlay.classList.remove("active");
  }, 200);
});

// Animate sidebar links on page load
window.addEventListener('DOMContentLoaded', () => {
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  sidebarLinks.forEach((link, i) => {
    setTimeout(() => {
      link.classList.add('show');
    }, i * 100); // stagger 100ms between links
  });
});
