const TossUI = {
  toastTimer: null,
  _previewMode: false,

  init() {
    if (document.getElementById('toss-ui-root')) return;

    const mount = document.querySelector('.phone') || document.body;
    const root = document.createElement('div');
    root.id = 'toss-ui-root';
    root.innerHTML = `
      <div class="toss-toast" id="toss-toast" role="status" aria-live="polite">
        <span class="toss-toast-icon" id="toss-toast-icon"></span>
        <span class="toss-toast-text" id="toss-toast-text"></span>
      </div>
      <div class="toss-overlay" id="toss-overlay" hidden>
        <div class="toss-sheet" role="dialog" aria-modal="true" aria-labelledby="toss-sheet-title">
          <div class="toss-sheet-handle"></div>
          <p class="toss-sheet-title" id="toss-sheet-title"></p>
          <p class="toss-sheet-message" id="toss-sheet-message"></p>
          <button type="button" class="toss-sheet-confirm" id="toss-sheet-confirm"></button>
          <button type="button" class="toss-sheet-cancel" id="toss-sheet-cancel">닫기</button>
        </div>
      </div>
    `;
    mount.appendChild(root);

    const overlay = document.getElementById('toss-overlay');
    overlay.addEventListener('click', (e) => {
      if (this._previewMode) return;
      if (e.target === overlay) this._closeConfirm(false);
    });
    document.getElementById('toss-sheet-cancel').addEventListener('click', () => {
      if (this._previewMode) return;
      this._closeConfirm(false);
    });
    document.getElementById('toss-sheet-confirm').addEventListener('click', () => {
      if (this._previewMode) return;
      this._closeConfirm(true);
    });
  },

  toast(message, options = {}) {
    this.init();
    const opts = typeof options === 'number' ? { duration: options } : options;
    const type = opts.type || 'success';
    const duration = opts.duration ?? 2600;

    const el = document.getElementById('toss-toast');
    const iconEl = document.getElementById('toss-toast-icon');
    const textEl = document.getElementById('toss-toast-text');

    clearTimeout(this.toastTimer);
    iconEl.className = `toss-toast-icon toss-toast-icon--${type}`;
    iconEl.innerHTML = LucideIcons.svg(TOAST_ICON[type] || TOAST_ICON.success, {
      size: 14,
      strokeWidth: 2.5,
    });
    textEl.textContent = message;
    el.classList.add('show');
    this.toastTimer = setTimeout(() => el.classList.remove('show'), duration);
  },

  previewToast(message, type = 'success') {
    this._previewMode = true;
    this.init();
    const el = document.getElementById('toss-toast');
    const iconEl = document.getElementById('toss-toast-icon');
    const textEl = document.getElementById('toss-toast-text');
    clearTimeout(this.toastTimer);
    iconEl.className = `toss-toast-icon toss-toast-icon--${type}`;
    iconEl.innerHTML = LucideIcons.svg(TOAST_ICON[type] || TOAST_ICON.success, {
      size: 14,
      strokeWidth: 2.5,
    });
    textEl.textContent = message;
    el.classList.add('show');
  },

  confirm({
    title,
    message = '',
    confirmText = '확인',
    cancelText = '닫기',
  }) {
    this.init();
    return new Promise((resolve) => {
      this._confirmResolve = resolve;
      const overlay = document.getElementById('toss-overlay');
      document.getElementById('toss-sheet-title').textContent = title;
      document.getElementById('toss-sheet-message').textContent = message;
      document.getElementById('toss-sheet-message').hidden = !message;
      document.getElementById('toss-sheet-confirm').textContent = confirmText;
      document.getElementById('toss-sheet-cancel').textContent = cancelText;
      overlay.hidden = false;
      requestAnimationFrame(() => overlay.classList.add('show'));
    });
  },

  previewSheet({
    title,
    message = '',
    confirmText = '확인',
    cancelText = '닫기',
  }) {
    this._previewMode = true;
    this.init();
    const overlay = document.getElementById('toss-overlay');
    document.getElementById('toss-sheet-title').textContent = title;
    document.getElementById('toss-sheet-message').textContent = message;
    document.getElementById('toss-sheet-message').hidden = !message;
    document.getElementById('toss-sheet-confirm').textContent = confirmText;
    document.getElementById('toss-sheet-cancel').textContent = cancelText;
    overlay.hidden = false;
    overlay.classList.add('show', 'preview');
  },

  _closeConfirm(confirmed) {
    const overlay = document.getElementById('toss-overlay');
    overlay.classList.remove('show', 'preview');
    setTimeout(() => {
      overlay.hidden = true;
      if (this._confirmResolve) {
        const resolve = this._confirmResolve;
        this._confirmResolve = null;
        resolve(confirmed);
      }
    }, 280);
  },
};

if (!document.body.classList.contains('proto-overlay')) {
  TossUI.init();
}
