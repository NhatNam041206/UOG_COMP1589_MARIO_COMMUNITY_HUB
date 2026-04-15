(function () {
  'use strict';

  /* Home arcade controls:
     - start/stop/restart iframe game
     - show inline status/instruction feedback */

  // Wire arcade control buttons to the embedded game frame.
  function initArcadeControls() {
    // Cache control and status elements once.
    const arcadeFrame = document.querySelector('#arcade iframe');
    const playBtn = document.getElementById('arcade-play');
    const stopBtn = document.getElementById('arcade-stop');
    const restartBtn = document.getElementById('arcade-restart');
    const introBtn = document.getElementById('arcade-instruction');
    const feedbackEl = document.getElementById('arcade-feedback');

    // Exit if the arcade UI is not present on this page.
    if (!arcadeFrame || !playBtn || !stopBtn || !restartBtn || !feedbackEl) {
      return;
    }

    // The Home page controls only the iframe wrapper. The embedded game remains
    // an external subsystem and is not modified here.
    const gameSrc = arcadeFrame.dataset.gameSrc;
    const smartphoneQuery = window.matchMedia('(max-width: 600px)');
    const smartphoneBlockedMessage = 'Arcade is unavailable on smartphone screens. Please use a tablet or desktop to play.';
    let gameIsRunning = false;
    let smartphoneBlocked = false;
    let smartphoneAlertShown = false;

    // Keep Play/Stop button states aligned with current run state.
    function updateControls() {
      // Smartphone screens are blocked from gameplay.
      if (smartphoneBlocked) {
        playBtn.disabled = true;
        stopBtn.disabled = true;
        restartBtn.disabled = true;
        if (introBtn) {
          introBtn.disabled = true;
        }
        return;
      }

      playBtn.disabled = gameIsRunning;
      stopBtn.disabled = !gameIsRunning;
      restartBtn.disabled = false;
      if (introBtn) {
        introBtn.disabled = false;
      }
    }

    // Set status message and visual tone in one place.
    function setFeedback(message, tone) {
      feedbackEl.textContent = message;
      feedbackEl.classList.remove('is-info', 'is-success', 'is-warning');
      feedbackEl.classList.add(tone || 'is-info');
    }

    // Alert once and keep users informed when arcade is blocked on smartphones.
    function notifySmartphoneBlocked(forceAlert) {
      setFeedback(smartphoneBlockedMessage, 'is-warning');
      if ((forceAlert || !smartphoneAlertShown) && typeof window.alert === 'function') {
        window.alert(smartphoneBlockedMessage);
        smartphoneAlertShown = true;
      }
    }

    // Toggle arcade availability based on viewport width.
    function syncViewportPolicy(shouldAlert) {
      smartphoneBlocked = smartphoneQuery.matches;

      if (smartphoneBlocked) {
        arcadeFrame.src = 'about:blank';
        gameIsRunning = false;
        updateControls();
        notifySmartphoneBlocked(Boolean(shouldAlert));
        return;
      }

      updateControls();
      if (!gameIsRunning) {
        setFeedback('Arcade ready. Press Play, then click inside the game screen to activate Arrow keys and Ctrl.', 'is-info');
      }
    }

    // Start game normally or force a hard reload on restart.
    function startGame(forceReload) {
      if (smartphoneBlocked) {
        notifySmartphoneBlocked(true);
        return;
      }

      if (!gameSrc) {
        setFeedback('Game source is unavailable right now. Please try again in a moment.', 'is-warning');
        return;
      }

      // Appending a timestamp forces a fresh iframe load when users restart.
      if (forceReload) {
        const separator = gameSrc.includes('?') ? '&' : '?';
        arcadeFrame.src = gameSrc + separator + 'restart=' + Date.now();
      } else if (!gameIsRunning) {
        arcadeFrame.src = gameSrc;
      }

      // Keep user-facing state synchronized after source update.
      gameIsRunning = true;
      updateControls();
      setFeedback(
        forceReload
          ? 'Game restarted. Click inside the game screen, then use Arrow keys and Ctrl.'
          : 'Game started. Click inside the game screen to activate keyboard controls.',
        'is-success'
      );
    }

    // Stop game by unloading iframe content.
    function stopGame() {
      arcadeFrame.src = 'about:blank';
      gameIsRunning = false;
      updateControls();
      if (smartphoneBlocked) {
        setFeedback(smartphoneBlockedMessage, 'is-warning');
      } else {
        setFeedback('Game stopped. Press Play whenever you are ready for another run.', 'is-info');
      }
    }

    // Controls: play, stop, restart.
    playBtn.addEventListener('click', function () {
      startGame(false);
    });

    stopBtn.addEventListener('click', function () {
      stopGame();
    });

    restartBtn.addEventListener('click', function () {
      startGame(true);
    });

    // Optional help button for quick keyboard instructions.
    if (introBtn) {
      introBtn.addEventListener('click', function () {
        if (smartphoneBlocked) {
          notifySmartphoneBlocked(true);
          return;
        }

        // Inline feedback is easier to notice in context than a blocking alert.
        setFeedback(
          'Controls: Arrow Left/Right to move, Up to jump, Down to duck, and Ctrl to accelerate or use fireball when powered up.',
          'is-warning'
        );
      });
    }

    // Confirm to users when the game frame has loaded.
    arcadeFrame.addEventListener('load', function () {
      if (gameIsRunning) {
        setFeedback('Arcade loaded. Click inside the game screen now, then use Arrow keys and Ctrl.', 'is-warning');
      }
    });

    // React when viewport crosses smartphone breakpoint.
    if (typeof smartphoneQuery.addEventListener === 'function') {
      smartphoneQuery.addEventListener('change', function () {
        syncViewportPolicy(false);
      });
    } else if (typeof smartphoneQuery.addListener === 'function') {
      smartphoneQuery.addListener(function () {
        syncViewportPolicy(false);
      });
    }

    // Default state when page loads.
    stopGame();
    syncViewportPolicy(true);
  }

  // Boot once DOM is available.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArcadeControls);
  } else {
    initArcadeControls();
  }
})();
