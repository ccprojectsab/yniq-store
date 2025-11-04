// Hero Carousel Component
class HeroCarousel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.currentSlide = 0;
    this.slides = this.querySelectorAll('.hero-slide');
    this.indicators = this.querySelectorAll('.hero-carousel__indicator');
    this.prevButton = this.querySelector('.hero-carousel__arrow--prev');
    this.nextButton = this.querySelector('.hero-carousel__arrow--next');

    // Get settings from data attributes
    this.autoplay = this.getAttribute('data-autoplay') === 'true';
    this.duration = parseInt(this.getAttribute('data-duration')) * 1000; // Convert to milliseconds
    this.pauseOnHover = this.getAttribute('data-pause-on-hover') === 'true';

    this.autoplayTimer = null;
    this.isPaused = false;

    if (this.slides.length <= 1) return;

    this.init();
  }

  init() {
    // Set up event listeners
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.goToPrevSlide());
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.goToNextSlide());
    }

    // Indicator click events
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    // Pause on hover (desktop only)
    if (this.pauseOnHover && window.matchMedia('(min-width: 990px)').matches) {
      this.addEventListener('mouseenter', () => this.pause());
      this.addEventListener('mouseleave', () => this.resume());
    }

    // Keyboard navigation
    this.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        this.goToNextSlide();
      }
    });

    // Start autoplay if enabled
    if (this.autoplay) {
      this.startAutoplay();
    }

    // Pause when tab is not visible (performance)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else if (this.autoplay && !this.isPaused) {
        this.resume();
      }
    });
  }

  goToSlide(index) {
    // Remove active classes
    this.slides[this.currentSlide].classList.remove('hero-slide--active');
    if (this.indicators[this.currentSlide]) {
      this.indicators[this.currentSlide].classList.remove('hero-carousel__indicator--active');
    }

    // Update current slide
    this.currentSlide = index;

    // Add active classes
    this.slides[this.currentSlide].classList.add('hero-slide--active');
    if (this.indicators[this.currentSlide]) {
      this.indicators[this.currentSlide].classList.add('hero-carousel__indicator--active');
    }

    // Reset autoplay timer
    if (this.autoplay) {
      this.resetAutoplay();
    }
  }

  goToNextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  goToPrevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      this.goToNextSlide();
    }, this.duration);
  }

  resetAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
    if (this.autoplay && !this.isPaused) {
      this.startAutoplay();
    }
  }

  pause() {
    this.isPaused = true;
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  resume() {
    this.isPaused = false;
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  disconnectedCallback() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }
}

customElements.define('hero-carousel', HeroCarousel);
