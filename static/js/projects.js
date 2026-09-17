// Generic carousel controller. Any number of `[data-carousel]` blocks
// on the page work off this one script - no per-project functions to
// duplicate when a new project section is added.

document.querySelectorAll('[data-carousel]').forEach(initCarousel);

function initCarousel(root) {
  const slides = Array.from(root.querySelectorAll('.carousel__slide'));
  const dotsContainer = root.querySelector('[data-carousel-dots]');
  const prevBtn = root.querySelector('[data-carousel-prev]');
  const nextBtn = root.querySelector('[data-carousel-next]');

  if (slides.length === 0) return;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel__dot';
    dot.setAttribute('aria-label', `Bild ${i + 1} anzeigen`);
    dot.addEventListener('click', () => show(i));
    dotsContainer && dotsContainer.appendChild(dot);
    return dot;
  });

  let index = 0;

  function show(n) {
    index = (n + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  }

  prevBtn && prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn && nextBtn.addEventListener('click', () => show(index + 1));

  show(0);
}
