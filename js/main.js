/* ============================================================
   main.js — Entry point: boots all modules
   ============================================================ */

import { initCursor }          from './cursor.js';
import { initLoader }          from './loader.js';
import { initReveal, initParallax, initBackToTop, initActiveNav } from './scroll.js';
import { initMagneticButtons, initCardTilt, initGalleryStagger }  from './effects.js';

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initReveal();
  initParallax();
  initBackToTop();
  initActiveNav();
  initMagneticButtons();
  initCardTilt();
  initGalleryStagger();
});
