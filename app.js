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
    header.classList.toggle('scrolled', window.scrollY > 50);
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
  const openModalCta = document.getElementById('btn-open-modal-cta');
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
  if (openModalCta) openModalCta.addEventListener('click', openBookingModal);
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

  // ==========================================================================
  // CONTACT FORM -> WHATSAPP
  // ==========================================================================
  // No backend: the form composes a prefilled WhatsApp message instead.
  const contactForm = document.getElementById('contact-form');
  const formHint = document.getElementById('form-hint');
  const WHATSAPP_NUMBER = '5219996046385';

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = contactForm.elements.name.value.trim();
      const message = contactForm.elements.message.value.trim();

      if (!name || !message) {
        formHint.textContent = 'Por favor, escribe tu nombre y tu mensaje.';
        return;
      }

      formHint.textContent = '';
      const text = `Hola Psic. Francisco, soy ${name}. ${message}`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      contactForm.reset();
    });
  }
});
