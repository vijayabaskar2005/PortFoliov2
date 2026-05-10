/* ============================================================
   loader.js — Loading screen & hero entrance animations
   ============================================================ */

export function initLoader() {
  const bar    = document.getElementById('lbar');
  const loader = document.getElementById('loader');
  if (!bar || !loader) return;

  // Start bar animation shortly after DOM ready
  requestAnimationFrame(() => {
    bar.style.width = '100%';
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      triggerHeroEntrance();
    }, 2000);
  });
}

function triggerHeroEntrance() {
  const sequence = [
    { selector: '.hero-eyebrow',  delay: 100,  style: { opacity: '1', transform: 'translateX(0)' } },
    { selector: '.hero-name',     delay: 260,  style: { opacity: '1', transform: 'translateY(0)' } },
    { selector: '.hero-surname',  delay: 390,  style: { opacity: '1', transform: 'translateY(0)' } },
    { selector: '.hero-tagline',  delay: 500,  style: { opacity: '1', transform: 'translateY(0)' } },
    { selector: '.hero-ctas',     delay: 620,  style: { opacity: '1', transform: 'translateY(0)' } },
  ];

  sequence.forEach(({ selector, delay, style }) => {
    setTimeout(() => {
      const el = document.querySelector(selector);
      if (el) Object.assign(el.style, style);
    }, delay);
  });
}
