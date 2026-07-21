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
