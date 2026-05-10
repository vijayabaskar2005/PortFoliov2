/* ============================================================
   cursor.js — Custom animated cursor
   ============================================================ */

export function initCursor() {
  const curEl = document.getElementById('cur');
  if (!curEl) return;

  const dot  = curEl.querySelector('.dot');
  const ring = curEl.querySelector('.ring');

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Lagging ring animation
  (function animRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // Hover expand
  const hoverEls = document.querySelectorAll(
    'a, button, .hobby-pill, .family-card, .soc-btn, .g-item, .t-card, .t-item'
  );
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
  });
}
