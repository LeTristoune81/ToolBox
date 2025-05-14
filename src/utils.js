/**
 * Utils for ToolBox
 */

function sendDiscord(msg, cb) {
  if (!webhook) { console.log('[🐜] webhook non configuré'); if (cb) cb(); return; }
  GM_xmlhttpRequest({
    method: 'POST', url: webhook,
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify({content: msg}),
    onload: r => { console.log(`[🐜] Discord → ${r.status}`); if (cb) cb(); },
    onerror: () => { console.log('[🐜] Erreur Discord'); if (cb) cb(); }
  });
}

function formatSuffix(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'G';
  if (n >= 1e6) return (n / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(2).replace(/\.?0+$/, '') + 'K';
  return '' + n;
}

function removeEl(el) {
  if (el && el.parentNode) el.parentNode.removeChild(el);
}
