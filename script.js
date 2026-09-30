/**
 * Mian Saad Karim — Edge AI Hardware Portfolio Script
 * Interactive thumbnail gallery and responsive navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Flagship UAV Gallery Thumbnail Switcher
  const mainImg = document.getElementById('flagshipMainImg');
  const captionEl = document.getElementById('flagshipCaption');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  if (mainImg && thumbBtns.length > 0) {
    thumbBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Remove active state from all
        thumbBtns.forEach(b => b.classList.remove('active'));
        
        // Add active state to clicked
        btn.classList.add('active');

        const newSrc = btn.getAttribute('data-src');
        const newCaption = btn.getAttribute('data-caption');

        if (newSrc && mainImg.src !== newSrc) {
          // Subtle opacity transition
          mainImg.style.opacity = '0.3';
          setTimeout(() => {
            mainImg.src = newSrc;
            if (captionEl && newCaption) {
              captionEl.textContent = newCaption;
            }
            mainImg.style.opacity = '1';
          }, 150);
        }
      });
    });
  }

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const expanded = navLinks.classList.contains('active');
      mobileBtn.setAttribute('aria-expanded', expanded);
    });

    // Close mobile menu when clicking any nav item
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Image Lightbox Modal for Full Review Inspection
  const imageModal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');

  function openModal(src, caption) {
    if (!imageModal || !modalImg) return;
    modalImg.src = src;
    if (modalCaption) {
      modalCaption.textContent = caption || '';
      modalCaption.style.display = caption ? 'block' : 'none';
    }
    imageModal.classList.add('active');
    imageModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!imageModal) return;
    imageModal.classList.remove('active');
    imageModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind to all zoomable media: review cards, project cards & flagship image
  const zoomableEls = document.querySelectorAll('.review-media, .card-media, .main-image-container');
  zoomableEls.forEach(el => {
    el.addEventListener('click', () => {
      const src = el.getAttribute('data-full') || el.querySelector('img')?.src;
      let caption = el.getAttribute('data-caption') || el.querySelector('img')?.alt;
      if (el.classList.contains('main-image-container')) {
        const flagshipCaption = document.getElementById('flagshipCaption');
        if (flagshipCaption) caption = flagshipCaption.textContent;
      }
      if (src) openModal(src, caption);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
      closeModal();
    }
  });
});
