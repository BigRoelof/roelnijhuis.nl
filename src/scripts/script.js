document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     LANGUAGE SWITCHER LOGIC
     ========================================================================== */
  const langToggleBtn = document.getElementById('language-toggle');
  const body = document.body;
  
  // Set default language
  let currentLang = localStorage.getItem('preferred-lang') || 'nl';
  setLanguage(currentLang);
  
  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'nl' ? 'en' : 'nl';
    setLanguage(currentLang);
  });
  
  function setLanguage(lang) {
    if (lang === 'en') {
      body.classList.remove('lang-nl');
      body.classList.add('lang-en');
      document.documentElement.lang = 'en';
      document.title = 'Roel Nijhuis | Personal Portfolio & Resume';
      document.querySelector('meta[name="description"]').setAttribute('content', 'Personal website and resume for Roel Nijhuis, a calm and curious software engineer from the Netherlands.');
    } else {
      body.classList.remove('lang-en');
      body.classList.add('lang-nl');
      document.documentElement.lang = 'nl';
      document.title = 'Roel Nijhuis | Persoonlijke Website & CV';
      document.querySelector('meta[name="description"]').setAttribute('content', 'Persoonlijke website en cv van Roel Nijhuis, een rustige en nieuwsgierige software engineer uit Nederland.');
    }
    localStorage.setItem('preferred-lang', lang);
  }

  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const toggleIcon = mobileToggle.querySelector('i');
  
  mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    if (mobileNav.classList.contains('open')) {
      toggleIcon.setAttribute('data-lucide', 'x');
    } else {
      toggleIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons(); // Re-render mobile icon
  });
  
  // Close menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggleIcon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  /* ==========================================================================
     STICKY HEADER & SCROLLSPY
     ========================================================================== */
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    // Sticky header class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Scrollspy active section highlighting
    let currentActiveSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // offset for sticky header
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentActiveSectionId = section.getAttribute('id');
      }
    });
    
    if (currentActiveSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  /* ==========================================================================
     RESUME TABS NAVIGATION
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.resume-tab-btn');
  const tabPanes = document.querySelectorAll('.resume-tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      
      const targetId = btn.id.replace('tab-btn-', 'tab-content-');
      const targetPane = document.getElementById(targetId);
      
      // Find currently active pane and button
      const activeBtn = document.querySelector('.resume-tab-btn.active');
      const activePane = document.querySelector('.resume-tab-content.active');
      
      if (activeBtn) activeBtn.classList.remove('active');
      btn.classList.add('active');
      
      if (activePane) {
        activePane.classList.remove('active');
        setTimeout(() => {
          activePane.style.display = 'none';
          targetPane.style.display = 'block';
          targetPane.offsetHeight; // trigger reflow
          targetPane.classList.add('active');
        }, 200);
      } else {
        targetPane.style.display = 'block';
        targetPane.offsetHeight; // trigger reflow
        targetPane.classList.add('active');
      }
    });
  });

  // Set initial display styles for tabs
  tabPanes.forEach(pane => {
    if (pane.classList.contains('active')) {
      pane.style.display = 'block';
    } else {
      pane.style.display = 'none';
    }
  });

  /* ==========================================================================
     ANIMATED SKILL PROGRESS BARS (INTERSECTION OBSERVER)
     ========================================================================== */
  const skillSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.skill-progress-bar');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const targetLevel = bar.getAttribute('data-level');
          bar.style.width = targetLevel;
        });
        // Unobserve once animation triggers
        skillObserver.unobserve(skillSection);
      }
    });
  }, {
    threshold: 0.15 // trigger when 15% of section is visible
  });
  
  if (skillSection) {
    skillObserver.observe(skillSection);
  }

  /* ==========================================================================
     CONTACT FORM HANDLING (WEB3FORMS AJAX SUBMISSION)
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-form-submit');
  const successAlert = document.getElementById('form-success-alert');
  const errorAlert = document.getElementById('form-error-alert');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtnText = submitBtn.querySelectorAll('span');
    const sendIcon = submitBtn.querySelector('.icon-send');
    const loaderIcon = submitBtn.querySelector('.icon-loader');
    
    // Disable inputs and show loading state
    submitBtn.disabled = true;
    if (sendIcon) sendIcon.style.display = 'none';
    if (loaderIcon) {
      loaderIcon.style.display = 'inline-block';
      loaderIcon.classList.add('lucide-spin');
    }
    
    // Toggle label texts dynamically during submission
    const originalTextEN = submitBtnText[0].textContent;
    const originalTextNL = submitBtnText[1].textContent;
    submitBtnText[0].textContent = 'Sending...';
    submitBtnText[1].textContent = 'Versturen...';
    
    // Hide previous alerts
    successAlert.style.display = 'none';
    errorAlert.style.display = 'none';
    
    const formData = new FormData(contactForm);
    
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200 && json.success) {
        successAlert.style.display = 'flex';
        contactForm.reset();
        
        // Auto-hide alert after 5 seconds
        setTimeout(() => {
          successAlert.style.display = 'none';
        }, 5000);
      } else {
        console.error(json);
        errorAlert.style.display = 'flex';
      }
    })
    .catch((error) => {
      console.error(error);
      errorAlert.style.display = 'flex';
    })
    .finally(() => {
      // Re-enable and reset button
      submitBtn.disabled = false;
      if (sendIcon) sendIcon.style.display = 'inline-block';
      if (loaderIcon) {
        loaderIcon.style.display = 'none';
        loaderIcon.classList.remove('lucide-spin');
      }
      submitBtnText[0].textContent = originalTextEN;
      submitBtnText[1].textContent = originalTextNL;
    });
  });

  /* ==========================================================================
     CURRENT YEAR FOOTER
     ========================================================================== */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     INTERACTIVE PHOTO STACK
     ========================================================================== */
  const photoStack = document.getElementById('photo-stack');

  if (photoStack) {
    let cards = Array.from(photoStack.querySelectorAll('.about-image-card'));
    let isRotating = false;

    function updatePositionClasses() {
      cards.forEach((card, index) => {
        card.classList.remove('stack-top', 'stack-mid', 'stack-bot', 'stack-hidden', 'card-exit');
        if (index === 0) {
          card.classList.add('stack-top');
        } else if (index === 1) {
          card.classList.add('stack-mid');
        } else if (index === 2) {
          card.classList.add('stack-bot');
        } else {
          card.classList.add('stack-hidden');
        }
      });
    }

    // Initialize positions
    updatePositionClasses();

    photoStack.addEventListener('click', () => {
      if (cards.length <= 1 || isRotating) return;
      isRotating = true;

      const topCard = cards[0];
      topCard.classList.add('card-exit');

      // Shift other cards visually immediately
      cards.forEach((card, index) => {
        if (index === 1) {
          card.classList.remove('stack-mid');
          card.classList.add('stack-top');
        } else if (index === 2) {
          card.classList.remove('stack-bot');
          card.classList.add('stack-mid');
        } else if (index === 3) {
          card.classList.remove('stack-hidden');
          card.classList.add('stack-bot');
        }
      });

      // Wait for exit transition to complete, then rearrange array & classes
      setTimeout(() => {
        const rotatedCard = cards.shift();
        cards.push(rotatedCard);
        updatePositionClasses();
        isRotating = false;
      }, 350);
    });
  }

  /* ==========================================================================
     INITIALIZE ICONS
     ========================================================================== */
  lucide.createIcons();
  
  // Custom spin style for loader icon
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .lucide-spin {
      animation: spin 1s linear infinite;
    }
  `;
  document.head.appendChild(style);
  
});
