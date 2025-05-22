// injection de la toolbox & panneau de paramètres
function injectToolbox(version, asDome, asTdc, placeOn, placeSec, detectOn, detectSec, webhook){
  if($('#toolbox').length) return;
  $(`
    <div id="toolbox" class="boite_compte_plus" style="position:fixed;top:100px;right:100px;width:190px;background:#525543;border-radius:4px;font:13px Arial;color:#d3d9b8;text-align:center;z-index:1000">
      <div class="titre_colonne_cliquable" style="font-size:16px;">ToolBox v${version}</div>
      <div class="contenu_boite_compte_plus">
        <ul style="list-style:none;margin:0;padding:60px 0;">
          <li><a href="javascript:void(0)" id="tool-params">⚙️ Paramètres</a></li>
          <li><a href="javascript:void(0)" id="tool-replace">🔄 Replacer Antisonde</a></li>
          <li><a href="javascript:void(0)" id="tool-colonies">🏘️ Colonies</a></li>
        </ul>
      </div>
    </div>`).appendTo('body');
  $('#tool-params').on('click', togglePanel);
  $('#tool-replace').on('click', () => {
  const dome = parseInt($('#as-dome').val(), 10);
  const tdc  = parseInt($('#as-tdc').val(), 10);
  performReplaceAntisonde(dome, tdc);
});
  $('#tool-colonies').on('click', e=>{e.preventDefault(); toggleColoniesBox();});
}

function createPanel(asDome, asTdc, placeOn, placeSec, detectOn, detectSec, webhook){
  if($('#fourmizzz-panel').length) return;
  $(`<div id="fourmizzz-panel" style="position:fixed;top:400px;right:45px;background:#fff;border:2px solid #333;padding:10px;z-index:99999;font:12px Arial;width:260px;max-height:80vh;overflow-y:auto;box-shadow:0 0 8px rgba(0,0,0,0.3);border-radius:4px;display:none">
    <h4 style="margin:0 0 6px;color:#f90">⚙️ Paramètres Antisonde</h4>
    <label>Dôme : <input id="as-dome" type="number" value="${asDome}"></label><br>
    <label>TDC : <input id="as-tdc" type="number" value="${asTdc}"></label><br>
    <label>Webhook : <input id="discord-webhook" type="text" value="${webhook}"></label><br>
    <label><input id="place-on" type="checkbox" ${placeOn?'checked':''}> Auto-Replacer (sec <input id="place-sec" type="number" value="${placeSec}"></label><br>
    <label><input id="detect-on" type="checkbox" ${detectOn?'checked':''}> Auto-Detect (sec <input id="detect-sec" type="number" value="${detectSec}"></label>
  </div>`).appendTo('body')
    .find('#as-dome').on('input',e=>{asDome=+e.target.value;localStorage.setItem(K_AS_DOME,asDome);})
    .end().find('#as-tdc').on('input',e=>{asTdc=+e.target.value;localStorage.setItem(K_AS_TDC,asTdc);})
    .end().find('#discord-webhook').on('change',e=>{webhook=e.target.value;localStorage.setItem(K_WH,webhook);})
    .end().find('#place-on').on('change',e=>{placeOn=e.target.checked;localStorage.setItem(K_PE,placeOn);})
    .end().find('#place-sec').on('input',e=>{let v=Math.min(59,Math.max(0,+e.target.value));placeSec=v;localStorage.setItem(K_PS,v);})
    .end().find('#detect-on').on('change',e=>{detectOn=e.target.checked;localStorage.setItem(K_DE,detectOn);})
    .end().find('#detect-sec').on('input',e=>{let v=Math.min(59,Math.max(0,+e.target.value));detectSec=v;localStorage.setItem(K_DS,v);});
}

function togglePanel(){ $('#fourmizzz-panel').toggle(); }
