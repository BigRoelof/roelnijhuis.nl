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
    btn.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });

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
