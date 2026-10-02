(function () {
  var ROTATE_INTERVAL_MS = 12000;

  // No enhancement for reduced-motion users — both slides remain in normal flow
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var section  = document.querySelector('.index-intro');
  var rotator  = document.querySelector('.index-rotator');
  var card     = document.querySelector('.index-rotator__card');
  var slides   = Array.from(document.querySelectorAll('.index-rotator__slide'));
  var dots     = Array.from(document.querySelectorAll('.index-rotator__dot'));

  if (!section || !rotator || !card || slides.length < 2) return;

  var current = 0;
  var timer   = null;
  var paused  = false;

  function showSlide(index) {
    current = index;
    card.classList.toggle('is-flipped', current === 1);

    slides.forEach(function (slide, i) {
      var hidden = i !== current;
      if (hidden) {
        slide.setAttribute('aria-hidden', 'true');
        slide.setAttribute('inert', '');
      } else {
        slide.removeAttribute('aria-hidden');
        slide.removeAttribute('inert');
      }
    });

    dots.forEach(function (dot, i) {
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  }

  function advance() {
    showSlide(current === 0 ? 1 : 0);
  }

  function startTimer() {
    clearInterval(timer);
    if (!paused) timer = setInterval(advance, ROTATE_INTERVAL_MS);
  }

  // Activate
  section.classList.add('is-enhanced');
  showSlide(0);
  startTimer();

  // Dot controls
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var target = parseInt(dot.dataset.target, 10);
      if (target !== current) showSlide(target);
      startTimer(); // reset regardless (resets timer after manual pick)
    });
  });

  // Pause on hover
  rotator.addEventListener('mouseenter', function () { paused = true;  clearInterval(timer); });
  rotator.addEventListener('mouseleave', function () { paused = false; startTimer(); });

  // Pause while any element inside has focus
  rotator.addEventListener('focusin',  function ()  { paused = true;  clearInterval(timer); });
  rotator.addEventListener('focusout', function (e) {
    if (!rotator.contains(e.relatedTarget)) { paused = false; startTimer(); }
  });

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { paused = true;  clearInterval(timer); }
    else                 { paused = false; startTimer(); }
  });
})();
