// src/main.js
import './utils.js';
import './antisonde.js';
import './detection.js';
import './colonies.js';
import './ui.js';

(function(){
  'use strict';
  // Récupère la version du script
  const version = GM_info.script.version;

  // Clés localStorage
  const H         = location.host.replace(/[.:]/g,'_');
  const K_AS_DOME = H + '_as_dome';
  const K_AS_TDC  = H + '_as_tdc';
  const K_PS      = H + '_auto_place_sec';
  const K_DS      = H + '_auto_detect_sec';
  const K_PE      = H + '_auto_place_on';
  const K_DE      = H + '_auto_detect_on';
  const K_WH      = H + '_discord_wh';

  // Lecture des paramètres
  let asDome    = +localStorage.getItem(K_AS_DOME) || 5;
  let asTdc     = +localStorage.getItem(K_AS_TDC)  || 1;
  let placeSec  = +localStorage.getItem(K_PS)     || 0;
  let detectSec = +localStorage.getItem(K_DS)     || 30;
  let placeOn   = localStorage.getItem(K_PE) === 'true';
  let detectOn  = localStorage.getItem(K_DE) === 'true';
  let webhook   = localStorage.getItem(K_WH)    || '';

  // Initialisation de l’UI
  injectToolbox(version, asDome, asTdc, placeOn, placeSec, detectOn, detectSec, webhook);
  createPanel(asDome, asTdc, placeOn, placeSec, detectOn, detectSec, webhook);

  // Boucles principales
  function startLoops(){
    setInterval(()=>{
      const s = new Date().getSeconds();
      if (placeOn  && s === placeSec ) performReplaceAntisonde(asDome, asTdc);
      if (detectOn && s === detectSec)  detectOtherTroops();
    }, 1000);
  }
  startLoops();
})();
