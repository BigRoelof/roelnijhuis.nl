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
