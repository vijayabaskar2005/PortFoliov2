/* ============================================================
   effects.js — Interactive micro-animations
   ============================================================ */

// ── MAGNETIC BUTTONS ─────────────────────────────────────────
export function initMagneticButtons() {
  document.querySelectorAll('.btn-red, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ── CARD TILT ────────────────────────────────────────────────
export function initCardTilt() {
  document.querySelectorAll('.family-card, .t-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-5px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s ease';
      card.style.transform  = '';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

// ── TYPEWRITER TAGLINE ───────────────────────────────────────
export function initTypewriter(selector, texts, speed = 80, pauseMs = 2000) {
  const el = document.querySelector(selector);
  if (!el) return;

  let textIdx  = 0;
  let charIdx  = 0;
  let deleting = false;

  function tick() {
    const current = texts[textIdx];

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, pauseMs);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting  = false;
        textIdx   = (textIdx + 1) % texts.length;
      }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }

  tick();
}

// ── GALLERY ITEM STAGGER ─────────────────────────────────────
export function initGalleryStagger() {
  const items = document.querySelectorAll('.g-item');
  const obs   = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  items.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    obs.observe(el);
  });
}
