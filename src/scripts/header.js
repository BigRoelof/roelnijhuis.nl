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
