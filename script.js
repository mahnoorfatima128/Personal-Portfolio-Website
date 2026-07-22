// ---------- Preloader ----------
window.addEventListener('load', () => {
  document.getElementById('preloader').classList.add('hide');
});

// ---------- Scroll progress bar + navbar shrink + back to top ----------
const progressBar = document.getElementById('progressBar');
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = (scrollTop / scrollHeight) * 100 + '%';

  header.classList.toggle('scrolled', scrollTop > 30);
  backToTop.classList.toggle('show', scrollTop > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

function closeMenu() {
  navLinks.classList.remove('open');
  overlay.classList.remove('show');
}
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  overlay.classList.toggle('show');
});
overlay.addEventListener('click', closeMenu);
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 130;
    if (scrollY >= top) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// ---------- Theme toggle ----------
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
  updateThemeIcon();
});

function updateThemeIcon() {
  const isLight = root.getAttribute('data-theme') === 'light';
  themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// ---------- Typing effect ----------
const roles = ['Software Engineering Student', 'Java Developer', 'Problem Solver', 'Web Developer'];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const current = roles[roleIndex];
  typedEl.textContent = deleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
  let speed = deleting ? 40 : 90;
  if (!deleting && charIndex === current.length + 1) { speed = 1400; deleting = true; }
  else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 400; }
  setTimeout(type, speed);
}
type();

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ---------- Animated counters ----------
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

function animateCounter(el) {
  const target = +el.dataset.target;
  let count = 0;
  const step = Math.max(1, target / 60);
  const update = () => {
    count += step;
    if (count < target) { el.textContent = Math.ceil(count); requestAnimationFrame(update); }
    else { el.textContent = target; }
  };
  update();
}

// ---------- Animated skill bars ----------
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => barObserver.observe(b));