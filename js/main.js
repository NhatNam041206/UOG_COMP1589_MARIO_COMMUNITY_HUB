/* Main shared script:
  - injects nav/footer shell
  - marks active navigation link
  - reveals sections on scroll */

(function () {
  'use strict';

  // Keep the site shell in one place so nav/footer edits do not need to be
  // repeated across every static page.
  const navHTML = `
    <nav class="site-nav">
      <a href="index.html" class="brand">
        <img
          src="imgs/Mario_Series_Logo.svg"
          alt="Mario Community Hub logo"
          height="100"
          width="150"
        />
      </a>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="events.html">Events</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  `;

  // Footer stays centralized for easier year/text updates.
  const footerHTML = `
    <footer class="site-footer">
      <p>&copy; 2026 Mario Community Hub &mdash; <a href="contact.html">Contact Us</a></p>
    </footer>
  `;

  // Mount shared nav/footer into page placeholders.
  function renderSiteShell() {
    const navContainer = document.getElementById('main-nav-container');
    if (navContainer) {
      navContainer.innerHTML = navHTML;
    }

    const footerContainer = document.getElementById('main-footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = footerHTML;
    }
  }

  // Highlight the nav item that matches the current page file.
  function applyActiveNavState() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  }

  // Activate scroll-in reveal for sections tagged with .fade-in-up.
  function initRevealAnimations() {
    const revealTargets = document.querySelectorAll('.fade-in-up');
    if (!revealTargets.length) {
      return;
    }

    // Reveal-on-scroll stays shared so each page can opt in with the same class
    // instead of duplicating animation code in page scripts.
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Trigger slightly before the element fully enters the viewport.
        threshold: 0.16,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach(function (section) {
      revealObserver.observe(section);
    });
  }

  // Shared boot sequence for every page that includes this file.
  function initSharedSite() {
    renderSiteShell();
    applyActiveNavState();
    initRevealAnimations();
  }

  // Run immediately when possible; otherwise wait for DOM readiness.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSharedSite);
  } else {
    initSharedSite();
  }
})();
