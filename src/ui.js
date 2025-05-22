// ─── CSS Colonies ───────────────────────────────────────────────────────────
const cssCol = `
  .colonies_zzzelp {
    text-align: left;
    padding-left: 15%;
    padding-bottom: 10px;
  }
  .ligne_colonies_zzzelp {
    width: 30%;
    line-height: 2.3em;
    display: inline-block;
  }
  @media (max-width: 976px) {
    .ligne_colonies_zzzelp { width: 45%; }
  }
  @media (max-width: 600px) {
    .ligne_colonies_zzzelp { width: 90%; }
  }
  .boite_membre.colonies_zzzelp_box {
    margin: auto;
    border: 1px solid;
    background-color: #d7c384;
    padding: 5px;
    margin-bottom: 20px;
  }
`;

// ─── CSS Toolbox Icons & Text ────────────────────────────────────────────────
const cssTool = `
  #toolbox .contenu_boite_compte_plus ul li a {
    position: relative;
    display: block;
    width: 100%;
    text-align: center;
    padding: 4px 0;
  }
  #toolbox .contenu_boite_compte_plus ul li a .icon {
    position: absolute;
    left: 12px;
  }
`;

// On injecte immédiatement ces styles dans le <head>
$('<style>')
  .text(cssCol + "\n" + cssTool)
  .appendTo('head');


/**
 * Module UI: injection de la ToolBox et du panneau de paramètres
 */
function injectToolbox(version) {
  if ($('#toolbox').length) return;

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

  $('#tool-params').on('click', togglePanel);

  // Sur clic, relit dynamiquement les deux champs
  $('#tool-replace').on('click', e => {
    e.preventDefault();
    const dome = parseInt($('#as-dome').val(), 10) || 0;
    const tdc  = parseInt($('#as-tdc').val(), 10)  || 0;
    performReplaceAntisonde(dome, tdc);
  });

  $('#tool-colonies').on('click', e => {
    e.preventDefault();
    toggleColoniesBox();
  });
}


function createPanel() {
  if ($('#fourmizzz-panel').length) return;

  // Relit tout dynamiquement depuis localStorage
  const H         = location.host.replace(/[.:]/g,'_');
  const asDome    = +localStorage.getItem(H + '_as_dome')        || 5;
  const asTdc     = +localStorage.getItem(H + '_as_tdc')         || 1;
  const placeSec  = +localStorage.getItem(H + '_auto_place_sec') || 0;
  const detectSec = +localStorage.getItem(H + '_auto_detect_sec')||30;
  const placeOn   = localStorage.getItem(H + '_auto_place_on')   === 'true';
  const detectOn  = localStorage.getItem(H + '_auto_detect_on')  === 'true';
  const webhook   = localStorage.getItem(H + '_discord_wh')      || '';

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
    // À chaque modification, on écrit la bonne clé
    .find('#as-dome').on('input',    e=>{
      const key = location.host.replace(/[.:]/g,'_') + '_as_dome';
      localStorage.setItem(key, +e.target.value);
    })
    .end().find('#as-tdc').on('input', e=>{
      const key = location.host.replace(/[.:]/g,'_') + '_as_tdc';
      localStorage.setItem(key, +e.target.value);
    })
    .end().find('#discord-webhook').on('change', e=>{
      const key = location.host.replace(/[.:]/g,'_') + '_discord_wh';
      localStorage.setItem(key, e.target.value);
    })
    .end().find('#place-on').on('change', e=>{
      const key = location.host.replace(/[.:]/g,'_') + '_auto_place_on';
      localStorage.setItem(key, e.target.checked);
    })
    .end().find('#place-sec').on('input',  e=>{
      const key = location.host.replace(/[.:]/g,'_') + '_auto_place_sec';
      localStorage.setItem(key, +e.target.value);
    })
    .end().find('#detect-on').on('change', e=>{
      const key = location.host.replace(/[.:]/g,'_') + '_auto_detect_on';
      localStorage.setItem(key, e.target.checked);
    })
    .end().find('#detect-sec').on('input', e=>{
      const key = location.host.replace(/[.:]/g,'_') + '_auto_detect_sec';
      localStorage.setItem(key, +e.target.value);
    });
}


function togglePanel() {
  $('#fourmizzz-panel').toggle();
}
