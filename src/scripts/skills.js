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
