// Subtle scroll-in fade for the homepage's "index-intro" section.
// Additive only - skipped entirely under prefers-reduced-motion, so
// reduced-motion users get zero JS-driven animation, not just no CSS
// transition (content is already visible by default either way).
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.index-intro [data-reveal]')
    .forEach((el) => observer.observe(el));
}
