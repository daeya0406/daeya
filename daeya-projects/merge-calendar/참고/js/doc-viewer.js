const DocViewer = (() => {
  const DOCS = {
    problem: { title: '문제 정의', file: 'problem.md' },
    decisions: { title: '설계 결정', file: 'decisions.md' },
    process: { title: '설계 프로세스', file: 'process.md' },
    'heatmap-rules': { title: '히트맵 규칙', file: 'heatmap-rules.md' },
    layout: { title: '레이아웃 가이드', file: 'layout.md' },
    states: { title: '화면 상태', file: 'states.md' },
    submit: { title: '제출 · 배포', file: 'submit.md' },
    structure: { title: '프로토타입 구조', file: 'structure.md' },
    answers: { title: '제출 문항', file: '../제출문항.md' },
  };

  function getEmbeddedMarkdown(key) {
    if (typeof DOC_CONTENT !== 'undefined' && DOC_CONTENT[key]) {
      return DOC_CONTENT[key];
    }
    if (typeof window.__DOC !== 'undefined' && window.__DOC[key]) {
      return window.__DOC[key];
    }
    return null;
  }

  function fixMdLinks(root) {
    root.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('../') && !href.endsWith('.md')) {
        if (href && href.endsWith('.html')) return;
        if (href && href.startsWith('../') && !href.includes('.md')) return;
      }
      if (href && (href.startsWith('../components') || href.startsWith('../index'))) return;

      const match = href && href.match(/(?:\.\/)?(?:docs\/)?([a-z0-9-]+)\.md(?:#([\w-]+))?$/i);
      if (match) {
        const hash = match[2] ? `#${match[2]}` : '';
        a.setAttribute('href', `view.html?doc=${match[1]}${hash}`);
        return;
      }
      if (href && /제출문항\.md/.test(href)) {
        a.setAttribute('href', 'view.html?doc=answers');
      }
    });
  }

  function renderMarkdown(md) {
    if (typeof marked !== 'undefined' && marked.parse) {
      return marked.parse(md, { mangle: false, headerIds: true });
    }
    if (typeof parseMarkdown === 'function') {
      return parseMarkdown(md);
    }
    return `<pre>${md.replace(/</g, '&lt;')}</pre>`;
  }

  async function fetchMarkdown(meta) {
    const res = await fetch(meta.file);
    if (!res.ok) throw new Error('fetch failed');
    return res.text();
  }

  async function load() {
    const key = new URLSearchParams(location.search).get('doc');
    const meta = DOCS[key];
    const titleEl = document.getElementById('doc-title');
    const bodyEl = document.getElementById('doc-body');

    if (!meta) {
      document.title = '문서를 찾을 수 없어요 — 일정 맞추기';
      titleEl.textContent = '문서를 찾을 수 없어요';
      bodyEl.innerHTML = '<p class="docs-error">올바른 문서 키가 아닙니다. <a href="index.html">설계 문서 허브</a>에서 다시 선택해 주세요.</p>';
      return;
    }

    document.title = `${meta.title} — 일정 맞추기`;
    titleEl.textContent = meta.title;
    bodyEl.innerHTML = '<p class="docs-loading">불러오는 중…</p>';

    try {
      let md = getEmbeddedMarkdown(key);
      if (!md && location.protocol !== 'file:') {
        md = await fetchMarkdown(meta);
      }
      if (!md) {
        throw new Error('no embedded content');
      }
      bodyEl.innerHTML = renderMarkdown(md);
      fixMdLinks(bodyEl);

      const hash = location.hash;
      if (hash) {
        const target = bodyEl.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch {
      bodyEl.innerHTML = `<p class="docs-error">문서를 불러오지 못했어요.<br><br>로컬에서 파일을 직접 열면(<code>file://</code>) 동작하지 않을 수 있습니다.<br><strong>GitHub Pages</strong> 등으로 배포한 뒤 열어주세요.<br><br><a href="index.html">설계 문서 허브</a> · <a href="../index.html">프로토타입</a></p>`;
    }
  }

  return { load, DOCS };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => DocViewer.load());
} else {
  DocViewer.load();
}
