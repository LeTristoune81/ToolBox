// Point d’entrée principal
(function(){
  'use strict';

  // Lecture initiale (pour l’affichage du panel)
  const version = GM_info.script.version;
  const H       = location.host.replace(/[.:]/g, '_');
  const K_AS_DOME = H+'_as_dome', K_AS_TDC=H+'_as_tdc';
  const K_PS  = H+'_auto_place_sec', K_DS  = H+'_auto_detect_sec';
  const K_PE  = H+'_auto_place_on',  K_DE  = H+'_auto_detect_on';
  const K_WH  = H+'_discord_wh';

  const asDome   = +localStorage.getItem(K_AS_DOME)||5;
  const asTdc    = +localStorage.getItem(K_AS_TDC)||1;
  const placeSec = +localStorage.getItem(K_PS)||0;
  const detectSec= +localStorage.getItem(K_DS)||30;
  const placeOn  = localStorage.getItem(K_PE)==='true';
  const detectOn = localStorage.getItem(K_DE)==='true';
  const webhook  = localStorage.getItem(K_WH)||'';

  // Initialise l’UI
  injectToolbox(version);
  createPanel(asDome, asTdc, placeOn, placeSec, detectOn, detectSec, webhook);
  enhanceProfile();

  // Boucle d’injection régulière
  setInterval(()=>{
    injectToolbox(version);
    createPanel(asDome, asTdc, placeOn, placeSec, detectOn, detectSec, webhook);
    enhanceProfile();
  }, 500);

  // Boucle de trigger automatique
  setInterval(()=>{
    const s = new Date().getSeconds();

    if (placeOn && s === +$('#place-sec').val()) {
      const dome = +$('#as-dome').val()  || 0;
      const tdc  = +$('#as-tdc').val()   || 0;
      performReplaceAntisonde(dome, tdc);
    }
    if (detectOn && s === +$('#detect-sec').val()) {
      detectOtherTroops();
    }
  }, 1000);

})();
