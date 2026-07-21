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
