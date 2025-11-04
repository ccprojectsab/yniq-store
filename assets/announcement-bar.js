// Announcement Bar Sticky Behavior
class StickyAnnouncementBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.announcementBarSection = document.querySelector('.announcement-bar-section');
    this.announcementBar = this.querySelector('.utility-bar');
    this.headerElement = document.querySelector('.section-header');
    this.announcementBarIsAlwaysSticky = this.getAttribute('data-sticky-type') === 'always';
    this.currentScrollTop = 0;
    this.announcementBarBounds = {};

    this.setAnnouncementBarHeight();
    window.matchMedia('(max-width: 990px)').addEventListener('change', this.setAnnouncementBarHeight.bind(this));

    if (this.announcementBarIsAlwaysSticky) {
      this.announcementBarSection.classList.add('announcement-bar-section-sticky');
    }

    this.onScrollHandler = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScrollHandler, false);

    this.createObserver();
  }

  setAnnouncementBarHeight() {
    const height = this.offsetHeight;
    document.documentElement.style.setProperty('--announcement-bar-height', `${height}px`);
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.onScrollHandler);
  }

  createObserver() {
    let observer = new IntersectionObserver((entries) => {
      this.announcementBarBounds = entries[0].intersectionRect;
    });

    observer.observe(this.announcementBarSection);
  }

  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.currentScrollTop && scrollTop > this.announcementBarBounds.bottom) {
      // Scrolling down
      requestAnimationFrame(this.hide.bind(this));
    } else if (scrollTop < this.currentScrollTop && scrollTop > this.announcementBarBounds.bottom) {
      // Scrolling up
      requestAnimationFrame(this.reveal.bind(this));
    } else if (scrollTop <= this.announcementBarBounds.top) {
      // At top
      requestAnimationFrame(this.reset.bind(this));
    }

    this.currentScrollTop = scrollTop;
  }

  hide() {
    if (this.announcementBarIsAlwaysSticky) return;
    this.announcementBarSection.classList.add('announcement-bar-section-hidden', 'announcement-bar-section-sticky');
  }

  reveal() {
    if (this.announcementBarIsAlwaysSticky) return;
    this.announcementBarSection.classList.add('announcement-bar-section-sticky', 'animate');
    this.announcementBarSection.classList.remove('announcement-bar-section-hidden');
  }

  reset() {
    if (this.announcementBarIsAlwaysSticky) return;
    this.announcementBarSection.classList.remove('announcement-bar-section-hidden', 'announcement-bar-section-sticky', 'animate');
  }
}

customElements.define('sticky-announcement-bar', StickyAnnouncementBar);

// Dismissible functionality
(function() {
  const announcementBar = document.querySelector('[data-announcement-bar-dismissible]');
  if (!announcementBar) return;

  const closeButton = announcementBar.querySelector('.announcement-bar__close');
  if (!closeButton) return;

  // Check if already dismissed
  if (sessionStorage.getItem('announcementBarDismissed') === 'true') {
    announcementBar.style.display = 'none';
    // Recalculate heights
    const stickyElement = document.querySelector('sticky-announcement-bar');
    if (stickyElement) {
      stickyElement.setAnnouncementBarHeight();
    }
    return;
  }

  // Close button click handler
  function handleClose() {
    announcementBar.style.display = 'none';
    sessionStorage.setItem('announcementBarDismissed', 'true');
    // Recalculate heights
    const stickyElement = document.querySelector('sticky-announcement-bar');
    if (stickyElement) {
      stickyElement.setAnnouncementBarHeight();
    }
  }

  // Close button click
  closeButton.addEventListener('click', handleClose);

  // ESC key to close
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && announcementBar.style.display !== 'none') {
      handleClose();
    }
  });
})();
