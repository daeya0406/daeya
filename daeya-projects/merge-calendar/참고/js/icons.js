const LucideIcons = {
  paths: {
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'circle-check': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    'circle-alert': '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    'calendar-x': '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m14 14-4 4"/><path d="m10 14 4 4"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  },

  svg(name, { size = 24, strokeWidth = 2 } = {}) {
    const body = this.paths[name];
    if (!body) return '';
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  },

  icon(name, className = 'icon', size = 24, strokeWidth = 2) {
    return `<span class="${className}">${this.svg(name, { size, strokeWidth })}</span>`;
  },
};

const TOAST_ICON = {
  info: 'info',
  success: 'circle-check',
  warning: 'circle-alert',
};

function initLucideIcons() {
  document.querySelectorAll('.nav .back').forEach((btn) => {
    if (!btn.querySelector('svg')) {
      btn.innerHTML = LucideIcons.svg('chevron-left', { size: 22, strokeWidth: 2.5 });
    }
  });

  document.querySelectorAll('.success-check').forEach((el) => {
    if (!el.querySelector('svg')) {
      el.innerHTML = LucideIcons.svg('circle-check', { size: 56, strokeWidth: 1.75 });
    }
  });

  document.querySelectorAll('.add-member .icon-plus, .icon-plus').forEach((el) => {
    if (!el.querySelector('svg')) {
      el.innerHTML = LucideIcons.svg('plus', { size: 18, strokeWidth: 2.5 });
    }
  });

  const calPrev = document.getElementById('cal-prev');
  if (calPrev && !calPrev.querySelector('svg')) {
    calPrev.innerHTML = LucideIcons.svg('chevron-left', { size: 20, strokeWidth: 2.5 });
  }
  const calNext = document.getElementById('cal-next');
  if (calNext && !calNext.querySelector('svg')) {
    calNext.innerHTML = LucideIcons.svg('chevron-right', { size: 20, strokeWidth: 2.5 });
  }
}

function initFlowDeepLink(go) {
  const screen = new URLSearchParams(location.search).get('screen');
  if (screen !== null && !Number.isNaN(Number(screen))) {
    go(Number(screen));
  }
}

function initOverlayFromQuery() {
  const params = new URLSearchParams(location.search);
  const bg = params.get('bg');
  if (bg) {
    const frame = document.getElementById('proto-bg');
    if (frame) frame.src = bg;
  }

  const toast = params.get('toast');
  if (toast) {
    TossUI.previewToast(toast, params.get('toastType') || 'success');
    return;
  }

  const title = params.get('title');
  if (title) {
    TossUI.previewSheet({
      title,
      message: params.get('message') || '',
      confirmText: params.get('confirm') || '확인',
      cancelText: params.get('cancel') || '닫기',
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLucideIcons);
} else {
  initLucideIcons();
}
