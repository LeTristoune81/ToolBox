/**
 * Utils for ToolBox
 */

// Envoie un message sur Discord en relisant dynamiquement la clé dans localStorage
function sendDiscord(msg, cb) {
  // Relecture à chaque appel
  const key  = location.host.replace(/[.:]/g, '_') + '_discord_wh';
  const hook = localStorage.getItem(key) || '';

  if (!hook) {
    console.log('[🐜] webhook non configuré');
    if (cb) cb();
    return;
  }
  GM_xmlhttpRequest({
    method:  'POST',
    url:     hook,
    headers: {'Content-Type':'application/json'},
    data:    JSON.stringify({content: msg}),
    onload:  r => {
      console.log(`[🐜] Discord → ${r.status}`);
      if (cb) cb();
    },
    onerror: _ => {
      console.log('[🐜] Erreur Discord');
      if (cb) cb();
    }
  });
}

/**
 * Formatte un nombre en suffixe K/M/G
 * @param {number} n
 * @returns {string}
 */
function formatSuffix(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'G';
  if (n >= 1e6) return (n / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(2).replace(/\.?0+$/, '') + 'K';
  return '' + n;
}

/**
 * Supprime un élément du DOM
 * @param {Element} el
 */
function removeEl(el) {
  if (el && el.parentNode) el.parentNode.removeChild(el);
}
