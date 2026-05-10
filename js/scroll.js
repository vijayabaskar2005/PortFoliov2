/* ============================================================
   scroll.js — Scroll-based animations
   ============================================================ */

// ── INTERSECTION OBSERVER REVEAL ─────────────────────────────
export function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        countUpIfPresent(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

// ── COUNT-UP NUMBERS ─────────────────────────────────────────
function countUpIfPresent(el) {
  el.querySelectorAll('[data-count]').forEach(num => {
    const target   = +num.dataset.count;
    const suffix   = num.dataset.suffix || '';
    let   startTs  = null;
    const DURATION = 1500;

    function step(timestamp) {
      if (!startTs) startTs = timestamp;
      const progress = Math.min((timestamp - startTs) / DURATION, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      num.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// ── PARALLAX HERO PHOTO ──────────────────────────────────────
export function initParallax() {
  const img = document.querySelector('.hero-photo img');
  if (!img) return;

  window.addEventListener('scroll', () => {
    // parallax disabled for hero clarity
  }, { passive: true });
}

// ── BACK TO TOP VISIBILITY ───────────────────────────────────
export function initBackToTop() {
  const btt = document.getElementById('btt');
  if (!btt) return;

  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    btt.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
}

// ── ACTIVE NAV LINK ──────────────────────────────────────────
export function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      const active = a.getAttribute('href') === '#' + current;
      a.classList.toggle('active', active);
    });
  }, { passive: true });
}
