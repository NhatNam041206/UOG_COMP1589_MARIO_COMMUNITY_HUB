(function () {
  'use strict';

  /* Services page behavior:
     - aligns hero trail/racer layers to responsive header size
     - renders service modal content from shared data */

  const detailsByService = window.SERVICE_MODAL_CONTENT || {};
  const DEFAULT_TRAIL_SOURCE_BOTTOM = 564;

  // Parse CSS custom property values safely with fallback support.
  function parseCssNumber(rawValue, fallback) {
    const value = parseFloat(rawValue);
    return Number.isFinite(value) ? value : fallback;
  }

  // Keep decorative hero layers aligned as header dimensions change.
  function initServicesHeroAlignment() {
    // Collect hero and effect elements used for alignment math.
    const header = document.querySelector('.page-header');
    const trail = header ? header.querySelector('.services-race-trail') : null;
    const trailMedia = header ? header.querySelector('.services-trail-media') : null;
    const racer = header ? header.querySelector('.services-racer-gif') : null;

    // Skip alignment work when hero assets are not available.
    if (!header || !trail || !trailMedia) {
      return;
    }

    let rafId = 0;
    // ResizeObserver gives more reliable updates than resize alone.
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(queueAlignment) : null;

    // Recalculate CSS variables that drive hero positioning.
    function alignHeroScene() {
      rafId = 0;
      const styles = window.getComputedStyle(header);
      // These values are defined in CSS custom properties.
      const trailScale = parseCssNumber(styles.getPropertyValue('--trail-scale'), 2);
      const trailHeight = trail.clientHeight;
      const railBottomSource = parseCssNumber(
        styles.getPropertyValue('--trail-source-rail-bottom'),
        DEFAULT_TRAIL_SOURCE_BOTTOM
      );
      const naturalWidth = trailMedia.naturalWidth || 1920;
      const layoutWidth = trailMedia.offsetWidth || trail.clientWidth || naturalWidth;
      // Width-derived scale helps keep the source texture aligned on all screens.
      const widthScale = naturalWidth > 0 ? layoutWidth / naturalWidth : 1;
      const finalScale = Math.max(widthScale * trailScale, 0.01);
      // Place the trail image so its baseline matches the visible rail area.
      const trailTop = trailHeight - railBottomSource * finalScale;
      header.style.setProperty('--trail-media-top', trailTop.toFixed(2) + 'px');

      if (racer) {
        // Derive racer size and lane offset from current trail height.
        const racerSizeRatio = parseCssNumber(styles.getPropertyValue('--racer-size-ratio'), 1.42);
        const racerLaneRatio = parseCssNumber(styles.getPropertyValue('--racer-lane-ratio'), 0.24);
        const racerSize = trailHeight * racerSizeRatio;
        const racerBottom = trailHeight - racerSize * racerLaneRatio;
        header.style.setProperty('--racer-size', racerSize.toFixed(2) + 'px');
        header.style.setProperty('--racer-bottom', racerBottom.toFixed(2) + 'px');
      }
    }

    // Coalesce repeated resize events into one animation-frame update.
    function queueAlignment() {
      if (!rafId) {
        rafId = window.requestAnimationFrame(alignHeroScene);
      }
    }

    window.addEventListener('resize', queueAlignment, { passive: true });
    window.addEventListener('orientationchange', queueAlignment, { passive: true });

    // Observe key elements so alignment stays correct across layout shifts.
    if (resizeObserver) {
      resizeObserver.observe(header);
      resizeObserver.observe(trail);
      resizeObserver.observe(trailMedia);
    }

    // Run after image metadata is ready to avoid incorrect scaling.
    if (trailMedia.complete) {
      queueAlignment();
    } else {
      trailMedia.addEventListener('load', queueAlignment, { once: true });
    }
  }

  // Build a <ul> from either plain strings or {lead,text} objects.
  function createList(items) {
    const listEl = document.createElement('ul');
    (items || []).forEach(function (item) {
      const li = document.createElement('li');
      // Allow both simple bullet strings and structured label/value rows.
      if (typeof item === 'string') {
        li.textContent = item;
      } else {
        const lead = document.createElement('strong');
        lead.textContent = (item.lead || 'Info') + ':';
        li.appendChild(lead);
        li.appendChild(document.createTextNode(' ' + (item.text || '')));
      }
      listEl.appendChild(li);
    });
    return listEl;
  }

  // Render ordered content blocks in the modal details area.
  function renderContent(detailsEl, blocks) {
    // Replace existing modal body before rendering new service content.
    detailsEl.innerHTML = '';
    const fragment = document.createDocumentFragment();

    (blocks || []).forEach(function (block) {
      // Headings split content into short, scannable sections.
      if (block.type === 'heading') {
        const heading = document.createElement('h3');
        heading.textContent = block.text || '';
        fragment.appendChild(heading);
        return;
      }

      // Lists handle key bullet points and pricing/safety summaries.
      if (block.type === 'list') {
        fragment.appendChild(createList(block.items));
        return;
      }

      // Tips are styled callouts for practical highlights.
      if (block.type === 'tip') {
        const tip = document.createElement('p');
        tip.className = 'top-tip';
        const lead = document.createElement('strong');
        lead.textContent = (block.lead || 'Tip') + ':';
        tip.appendChild(lead);
        tip.appendChild(document.createTextNode(' ' + (block.text || '')));
        fragment.appendChild(tip);
        return;
      }

      // Default content block is a paragraph.
      const paragraph = document.createElement('p');
      paragraph.textContent = block.text || '';
      fragment.appendChild(paragraph);
    });

    detailsEl.appendChild(fragment);
  }

  // Wire service "Learn More" buttons to a reusable Bootstrap modal.
  function initServicesModal() {
    // Cache modal nodes once to avoid repeated DOM queries.
    const modalElement = document.getElementById('serviceModal');
    const titleEl = document.getElementById('serviceModalTitle');
    const detailsEl = document.getElementById('service-modal-details');
    const slidesEl = document.getElementById('service-modal-slides');
    const indicatorsEl = document.getElementById('service-modal-indicators');
    const carouselElement = document.getElementById('serviceModalCarousel');
    const carouselPrev = modalElement ? modalElement.querySelector('.carousel-control-prev') : null;
    const carouselNext = modalElement ? modalElement.querySelector('.carousel-control-next') : null;
    const buttons = document.querySelectorAll('.service-learn-more');

    // Exit when modal prerequisites are missing.
    if (
      !modalElement ||
      !titleEl ||
      !detailsEl ||
      !slidesEl ||
      !indicatorsEl ||
      !carouselElement ||
      !buttons.length ||
      typeof bootstrap === 'undefined'
    ) {
      return;
    }

    const serviceModal = new bootstrap.Modal(modalElement);
    // Reuse the same carousel instance for every service selection.
    const modalCarousel = bootstrap.Carousel.getOrCreateInstance(carouselElement, {
      interval: 3600,
      touch: true
    });

    // Hide controls when there is only one slide.
    function setCarouselVisibility(showControls) {
      const visibility = showControls ? '' : 'none';
      if (carouselPrev) {
        carouselPrev.style.display = visibility;
      }
      if (carouselNext) {
        carouselNext.style.display = visibility;
      }
      indicatorsEl.style.display = showControls ? 'flex' : 'none';
    }

    // Render modal carousel slides and indicator dots from data.
    function renderGallery(galleryItems, label) {
      slidesEl.innerHTML = '';
      indicatorsEl.innerHTML = '';

      const safeItems = Array.isArray(galleryItems) && galleryItems.length ? galleryItems : [];

      safeItems.forEach(function (item, index) {
        // Create one slide image per gallery entry.
        const slide = document.createElement('div');
        slide.className = 'carousel-item' + (index === 0 ? ' active' : '');

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt || label + ' gallery image ' + (index + 1);
        slide.appendChild(img);
        slidesEl.appendChild(slide);

        // Create matching indicator button for each slide.
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#serviceModalCarousel');
        indicator.setAttribute('data-bs-slide-to', String(index));
        indicator.setAttribute('aria-label', 'Slide ' + (index + 1));
        if (index === 0) {
          indicator.className = 'active';
          indicator.setAttribute('aria-current', 'true');
        }
        indicatorsEl.appendChild(indicator);
      });

      // Reset carousel to first slide whenever content changes.
      setCarouselVisibility(safeItems.length > 1);
      modalCarousel.to(0);
      modalCarousel.cycle();
    }

    // Pause autoplay when modal closes.
    modalElement.addEventListener('hidden.bs.modal', function () {
      modalCarousel.pause();
    });

    // Open modal with dataset-selected service content.
    buttons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();

        const key = button.getAttribute('data-service');
        const service = detailsByService[key];
        // Ignore unknown service keys to avoid runtime errors.
        if (!service) {
          return;
        }

        // Apply selected service data to modal title, body, and gallery.
        titleEl.textContent = service.title;
        renderContent(detailsEl, service.content);
        renderGallery(service.gallery, service.title);
        serviceModal.show();
      });
    });
  }

  // Header chips act as shortcuts to each service row.
  function initServiceHeaderChips() {
    const chips = document.querySelectorAll('.header-chip[data-service-target]');

    if (!chips.length) {
      return;
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        const targetId = chip.getAttribute('data-service-target');
        const target = targetId ? document.getElementById(targetId) : null;

        if (!target) {
          return;
        }

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // Initialize both hero and modal features once DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initServicesHeroAlignment();
      initServicesModal();
      initServiceHeaderChips();
    });
  } else {
    initServicesHeroAlignment();
    initServicesModal();
    initServiceHeaderChips();
  }
})();
