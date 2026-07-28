/* Minimal markdown → HTML (tables, headings, lists, code, links, blockquotes) */
function parseMarkdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;

  function esc(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }

  function flushList(items, ordered) {
    if (!items.length) return;
    const tag = ordered ? 'ol' : 'ul';
    out.push(`<${tag}>`);
    items.forEach((item) => out.push(`<li>${inline(item)}</li>`));
    out.push(`</${tag}>`);
    items.length = 0;
  }

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '---') {
      out.push('<hr>');
      i++;
      continue;
    }

    if (line.startsWith('```')) {
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        code.push(esc(lines[i]));
        i++;
      }
      out.push(`<pre><code>${code.join('\n')}</code></pre>`);
      i++;
      continue;
    }

    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        rows.push(lines[i]);
        i++;
      }
      if (rows.length >= 2) {
        const parseRow = (r) => r.split('|').slice(1, -1).map((c) => c.trim());
        const head = parseRow(rows[0]);
        const body = rows.slice(2).map(parseRow);
        out.push('<table><thead><tr>' + head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>');
        body.forEach((row) => {
          out.push('<tr>' + row.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>');
        });
        out.push('</tbody></table>');
      }
      continue;
    }

    const h = line.match(/^(#{1,3})\s+(.+)$/);
    if (h) {
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      i++;
      continue;
    }

    if (line.startsWith('> ')) {
      out.push(`<blockquote>${inline(line.slice(2))}</blockquote>`);
      i++;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      flushList(items, false);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      flushList(items, true);
      continue;
    }

    if (!line.trim()) {
      i++;
      continue;
    }

    out.push(`<p>${inline(line)}</p>`);
    i++;
  }

  return out.join('\n');
}
