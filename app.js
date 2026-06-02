document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // MOBILE NAVIGATION MENU
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      
      // Update aria-expanded status
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================================================
  // STICKY HEADER SCROLL EFFECT
  // ==========================================================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      // Dynamic inline adjustments for extra premium transparency/padding changes
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      header.style.boxShadow = 'var(--shadow-md)';
      header.style.height = '70px';
    } else {
      header.classList.remove('scrolled');
      header.style.backgroundColor = 'var(--glass-bg)';
      header.style.boxShadow = 'none';
      header.style.height = 'var(--header-height)';
    }
  });

  // ==========================================================================
  // ACTIVE NAVIGATION SCROLLSPY
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // DIALOG MODAL CONTROLS (Agendar Turno)
  // ==========================================================================
  const bookingDialog = document.getElementById('bookingModal');
  const openModalNav = document.getElementById('btn-open-modal-nav');
  const openModalHero = document.getElementById('btn-open-modal-hero');
  const openModalContact = document.getElementById('btn-open-modal-contact');
  const closeModalBtn = document.getElementById('btn-close-modal');

  const openBookingModal = () => {
    if (bookingDialog) {
      bookingDialog.showModal();
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    }
  };

  const closeBookingModal = () => {
    if (bookingDialog) {
      bookingDialog.close();
      document.body.style.overflow = ''; // Unlock background scrolling
    }
  };

  // Add click events to triggers
  if (openModalNav) openModalNav.addEventListener('click', openBookingModal);
  if (openModalHero) openModalHero.addEventListener('click', openBookingModal);
  if (openModalContact) openModalContact.addEventListener('click', openBookingModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeBookingModal);

  // Close modal with Escape key unlocks scroll
  if (bookingDialog) {
    bookingDialog.addEventListener('cancel', () => {
      document.body.style.overflow = '';
    });

    // ==========================================================================
    // LIGHT-DISMISS FALLBACK (Safari & Older Browsers)
    // ==========================================================================
    // If the browser does not support closedby="any" natively, handle backdrop clicks manually.
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      bookingDialog.addEventListener('click', (event) => {
        // Event target is the dialog element itself when clicking the backdrop
        if (event.target !== bookingDialog) return;

        // Verify click was outside the dialog content box coordinates
        const rect = bookingDialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );

        if (!isDialogContent) {
          closeBookingModal();
        }
      });
    }
  }
});
