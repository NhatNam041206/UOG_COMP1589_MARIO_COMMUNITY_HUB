(function () {
  'use strict';

  /* Events schedule behavior:
     - category-based table filters
     - quick row notes in the live helper tip */

  // Initialize schedule filtering and row-level quick notes.
  function initEventFilters() {
    // Cache interactive filter chips, data rows, and the helper text region.
    const filterButtons = document.querySelectorAll('.schedule-filter');
    const headerFilterButtons = document.querySelectorAll('.header-chip[data-event-filter]');
    const rows = document.querySelectorAll('.events-table tbody tr[data-category]');
    const liveTip = document.getElementById('schedule-live-tip');
    const scheduleHeading = document.getElementById('event-schedule');

    // Exit safely if expected schedule markup is not present.
    if (!filterButtons.length || !rows.length) {
      return;
    }

    // Centralize helper message updates in one small function.
    function updateTip(message) {
      if (liveTip) {
        liveTip.textContent = message;
      }
    }

    // Show/hide rows by selected category and report visible count.
    function applyFilter(filterKey) {
      let visibleCount = 0;

      rows.forEach(function (row) {
        // Match all rows or rows in the selected category only.
        const match = filterKey === 'all' || row.dataset.category === filterKey;
        row.classList.toggle('row-hidden', !match);
        // Reset active highlight whenever a new filter is applied.
        row.classList.remove('row-active');

        if (match) {
          visibleCount += 1;
        }
      });

      // Keep the status message human-readable and specific.
      if (filterKey === 'all') {
        updateTip('Showing all upcoming events.');
      } else {
        const label = filterKey.charAt(0).toUpperCase() + filterKey.slice(1);
        updateTip('Showing ' + visibleCount + ' ' + label + ' event(s). Tap a row for quick notes.');
      }
    }

    // Set active visual state on schedule filters and apply the selected category.
    function activateScheduleFilter(filterKey) {
      let matchingButton = null;

      filterButtons.forEach(function (item) {
        const match = (item.dataset.filter || 'all') === filterKey;
        item.classList.toggle('is-active', match);
        if (match) {
          matchingButton = item;
        }
      });

      applyFilter(filterKey);
      return matchingButton;
    }

    // Clicking a schedule filter activates it and updates visible rows.
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const filterKey = button.dataset.filter || 'all';
        activateScheduleFilter(filterKey);
      });
    });

    // Header chips jump to schedule and apply their mapped category filter.
    headerFilterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const filterKey = button.dataset.eventFilter || 'all';
        activateScheduleFilter(filterKey);

        if (scheduleHeading) {
          scheduleHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Clicking a visible row highlights it and shows a short contextual note.
    rows.forEach(function (row) {
      row.addEventListener('click', function () {
        // Ignore interactions on rows hidden by the active filter.
        if (row.classList.contains('row-hidden')) {
          return;
        }

        // Maintain a single active row for visual focus.
        rows.forEach(function (item) {
          item.classList.remove('row-active');
        });
        row.classList.add('row-active');

        // Pull event name from the second cell, then combine with row note.
        const eventName = row.cells[1] ? row.cells[1].textContent.trim() : 'Event';
        const note = row.dataset.note || 'More details coming soon.';
        updateTip(eventName + ': ' + note);
      });
    });

    // Allow direct-link filtering, e.g. events.html?filter=social#event-schedule
    try {
      const params = new URLSearchParams(window.location.search || '');
      const initialFilter = (params.get('filter') || '').toLowerCase();
      const validFilters = new Set(['all', 'social', 'racing', 'workshop', 'merch', 'community', 'showcase']);
      if (validFilters.has(initialFilter) && initialFilter !== 'all') {
        activateScheduleFilter(initialFilter);
      }
    } catch (error) {
      // Ignore malformed query strings and keep default schedule state.
    }
  }

  // Run now if DOM is ready, otherwise wait for DOMContentLoaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEventFilters);
  } else {
    initEventFilters();
  }
})();
