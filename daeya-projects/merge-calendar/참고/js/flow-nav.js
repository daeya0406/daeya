/**
 * In-flow screen history — syncs ?screen= with pushState so browser back / Backspace
 * move between prototype screens instead of leaving the page unexpectedly.
 */
const FlowNav = (() => {
  let currentScreen = null;
  let suppressHistory = false;

  function isEditable(target) {
    if (!target) return false;
    const tag = target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
  }

  function buildUrl(screen) {
    const url = new URL(location.href);
    url.searchParams.set('screen', String(screen));
    return url.pathname + url.search + url.hash;
  }

  function isOverlayOpen() {
    const overlay = document.getElementById('toss-overlay');
    return overlay && !overlay.hidden && overlay.classList.contains('show');
  }

  function bindChrome() {
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Backspace') return;
      if (isEditable(e.target)) return;
      e.preventDefault();
      if (isOverlayOpen() && typeof TossUI !== 'undefined') {
        TossUI._closeConfirm(false);
        return;
      }
      history.back();
    });

    document.querySelectorAll('.nav .back').forEach((btn) => {
      btn.removeAttribute('onclick');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        history.back();
      });
    });
  }

  function wrap(showScreen, options = {}) {
    const defaultScreen = options.defaultScreen ?? 1;
    const onNavigate = options.onNavigate;

    function go(screen, navOpts = {}) {
      const el = document.querySelector(`[data-screen="${screen}"]`);
      if (!el) return;

      const isSame = screen === currentScreen;
      showScreen(screen);
      currentScreen = screen;
      if (onNavigate) onNavigate(screen, navOpts);

      if (suppressHistory || navOpts.history === false) return;
      if (isSame && navOpts.history !== 'replace') return;

      const mode = navOpts.history || 'push';
      const state = { screen };
      const url = buildUrl(screen);
      if (mode === 'replace') {
        history.replaceState(state, '', url);
      } else {
        history.pushState(state, '', url);
      }
    }

    function init() {
      bindChrome();

      const param = new URLSearchParams(location.search).get('screen');
      let initial = param !== null && param !== '' ? Number(param) : NaN;
      if (Number.isNaN(initial) && options.resolveInitialScreen) {
        initial = options.resolveInitialScreen();
      }
      if (Number.isNaN(initial)) {
        const active = document.querySelector('.screen.active');
        initial = active ? Number(active.dataset.screen) : defaultScreen;
      }
      if (Number.isNaN(initial)) initial = defaultScreen;

      suppressHistory = true;
      go(initial, { history: 'replace' });
      suppressHistory = false;

      window.addEventListener('popstate', (e) => {
        const screen = e.state?.screen ?? defaultScreen;
        suppressHistory = true;
        go(screen, { history: false });
        suppressHistory = false;
      });
    }

    return { go, init, getCurrent: () => currentScreen };
  }

  return { wrap };
})();
