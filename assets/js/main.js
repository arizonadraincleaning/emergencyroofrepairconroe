
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer Toggle
  const toggleBtn = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');

  function openMenu() {
    if (drawer) drawer.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (drawer) drawer.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Quote Form Submission Intercept
  const forms = document.querySelectorAll('.quote-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '🚨 Dispatching to (936) 363-0579...';
      btn.disabled = true;
      btn.style.background = '#10b981';
      
      setTimeout(() => {
        alert('Thank you! Your emergency request has been received. Our Conroe dispatch team will call you within 5 minutes.');
        form.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 1000);
    });
  });

  // Review Carousel / Slider Logic
  const slider = document.querySelector('.review-slider-track');
  const slides = document.querySelectorAll('.review-slide');
  const prevBtn = document.querySelector('.slider-btn-prev');
  const nextBtn = document.querySelector('.slider-btn-next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (slider && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        if (i === 0) dot.classList.add('is-active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      const dots = document.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      if (currentIndex < 0) currentIndex = totalSlides - 1;
      if (currentIndex >= totalSlides) currentIndex = 0;
      updateSlider();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Touch Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    slider.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    slider.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) goToSlide(currentIndex + 1);
      if (touchEndX - touchStartX > 50) goToSlide(currentIndex - 1);
    }, { passive: true });

    // Auto-advance every 6 seconds
    setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }
});
