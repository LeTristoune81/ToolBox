/**
 * Module UI: injection de la ToolBox et du panneau de paramètres
 */
function injectToolbox(version) {
  if ($('#toolbox').length) return;

  // Insertion HTML
  $(`
    <div id="toolbox" class="boite_compte_plus" style="
      position:fixed; top:100px; right:100px;
      width:190px; background:#525543;
      border-radius:4px; font:13px Arial,sans-serif;
      color:#d3d9b8; text-align:center; z-index:1000;
    ">
      <div class="titre_colonne_cliquable" style="font-size:16px;">
        ToolBox v${version}
      </div>
      <div class="contenu_boite_compte_plus">
        <ul style="list-style:none;margin:0;padding:60px 0;">
          <li style="margin-bottom:12px;">
            <a href="#" id="tool-params"><span class="icon">⚙️</span>Paramètres</a>
          </li>
          <li style="margin-bottom:12px;">
            <a href="#" id="tool-replace"><span class="icon">🔄</span>Replacer Antisonde</a>
          </li>
          <li>
            <a href="#" id="tool-colonies"><span class="icon">🏘️</span>Colonies</a>
          </li>
        </ul>
      </div>
    </div>
  `).appendTo('body');

  // Handlers
  $('#tool-params').on('click', togglePanel);

  // Au clic, on relit les inputs #as-dome et #as-tdc
  $('#tool-replace').on('click', e => {
    e.preventDefault();
    const dome = parseInt($('#as-dome').val(), 10) || 0;
    const tdc  = parseInt($('#as-tdc').val(), 10) || 0;
    console.log('[ToolBox:UI] Clic Replacer Antisonde →', { dome, tdc });
    performReplaceAntisonde(dome, tdc);
  });

  $('#tool-colonies').on('click', e => {
    e.preventDefault();
    toggleColoniesBox();
  });
}

function createPanel(asDome, asTdc, placeOn, placeSec, detectOn, detectSec, webhook) {
  if ($('#fourmizzz-panel').length) return;
  $(`<div id="fourmizzz-panel" style="
      position:fixed; top:400px; right:45px;
      background:#fff; border:2px solid #333;
      padding:10px; z-index:99999;
      font:12px Arial,sans-serif;
      width:260px; max-height:80vh;
      overflow-y:auto; box-shadow:0 0 8px rgba(0,0,0,0.3);
      border-radius:4px; display:none;
    ">
      <h4 style="margin:0 0 6px;color:#f90">⚙️ Paramètres Antisonde</h4>
      <label>Antisonde Dôme :<br>
        <input id="as-dome" type="number" value="${asDome}" style="width:100%;margin-bottom:6px;">
      </label><br>
      <label>Antisonde TDC :<br>
        <input id="as-tdc" type="number" value="${asTdc}" style="width:100%;margin-bottom:12px;">
      </label><br>
      <label>Webhook Discord :<br>
        <input id="discord-webhook" type="text" value="${webhook}" style="width:100%;margin-bottom:12px;">
      </label><br>
      <label>
        <input id="place-on" type="checkbox"${placeOn?' checked':''}>
        Auto-Replacer (sec <input id="place-sec" type="number" min="0" max="59" value="${placeSec}" style="width:50px;">)
      </label><br><br>
      <label>
        <input id="detect-on" type="checkbox"${detectOn?' checked':''}>
        Auto-Détection (sec <input id="detect-sec" type="number" min="0" max="59" value="${detectSec}" style="width:50px;">)
      </label>
    </div>`).appendTo('body')
    // Synchronise localStorage dès la saisie
    .find('#as-dome').on('input',    e=>{ localStorage.setItem(K_AS_DOME, +e.target.value); })
    .end().find('#as-tdc').on('input', e=>{ localStorage.setItem(K_AS_TDC, +e.target.value); })
    .end().find('#discord-webhook').on('change', e=>{ localStorage.setItem(K_WH, e.target.value); })
    .end().find('#place-on').on('change', e=>{ localStorage.setItem(K_PE, e.target.checked); })
    .end().find('#place-sec').on('input',  e=>{ localStorage.setItem(K_PS, +e.target.value); })
    .end().find('#detect-on').on('change', e=>{ localStorage.setItem(K_DE, e.target.checked); })
    .end().find('#detect-sec').on('input', e=>{ localStorage.setItem(K_DS, +e.target.value); });
}

function togglePanel() {
  $('#fourmizzz-panel').toggle();
}
