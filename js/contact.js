(function () {
  'use strict';

  /* Contact form behavior:
     - validate required fields
     - show inline success message
     - reset form on submit */

  // Attach submit handling for the contact form page.
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    // Exit if script is loaded on a page without the form.
    if (!contactForm) {
      return;
    }

    // Keep submission client-side for this static site flow.
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Let browser validation surface missing/invalid fields.
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // Show lightweight success feedback near the submit button.
      const msg = document.getElementById('form-message');
      if (msg) {
        msg.textContent = 'Thanks! Your message has been sent to the community team.';
        msg.style.color = '#43B047';
        msg.style.fontWeight = '600';
      }

      // Clear fields after successful submission.
      contactForm.reset();
    });
  }

  // Initialize when DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();
