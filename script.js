const galleryButtons = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const slideshowImages = Array.from(document.querySelectorAll('.hero-slideshow img'));
let slideshowIndex = 0;

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove('visible');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
};

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const src = button.dataset.src;
    if (src && lightbox && lightboxImage) {
      lightboxImage.src = src;
      lightbox.classList.add('visible');
      lightbox.setAttribute('aria-hidden', 'false');
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.classList.contains('visible')) {
    closeLightbox();
  }
});

const cycleSlideshow = () => {
  if (!slideshowImages.length) return;

  slideshowImages[slideshowIndex].classList.remove('active');
  slideshowIndex = (slideshowIndex + 1) % slideshowImages.length;
  slideshowImages[slideshowIndex].classList.add('active');
};

const loadCusdis = () => {
  const cusdisContainer = document.getElementById('cusdis_thread');
  if (!cusdisContainer || document.querySelector('script[src*="cusdis.es.js"]')) return;

  const script = document.createElement('script');
  script.src = 'https://cusdis.com/js/cusdis.es.js';
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    console.warn('Cusdis failed to load. Please check the network or the script URL.');
  };

  document.body.appendChild(script);
};

window.addEventListener('DOMContentLoaded', loadCusdis);
setInterval(cycleSlideshow, 4000);