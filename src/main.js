// point d’entrée
(function(){
  'use strict';

  // récupération des settings
  const version = GM_info.script.version;
  const H         = location.host.replace(/[.:]/g,'_');
  const K_AS_DOME = H+'_as_dome', K_AS_TDC=H+'_as_tdc', K_PS=H+'_auto_place_sec';
  const K_DS=H+'_auto_detect_sec', K_PE=H+'_auto_place_on', K_DE=H+'_auto_detect_on';
  const K_WH=H+'_discord_wh';

  let asDome=+localStorage.getItem(K_AS_DOME)||5,
      asTdc=+localStorage.getItem(K_AS_TDC)||1,
      placeSec=+localStorage.getItem(K_PS)||0,
      detectSec=+localStorage.getItem(K_DS)||30,
      placeOn=localStorage.getItem(K_PE)==='true',
      detectOn=localStorage.getItem(K_DE)==='true',
      webhook=localStorage.getItem(K_WH)||'';

  // initialisation UI
  injectToolbox(version,asDome,asTdc,placeOn,placeSec,detectOn,detectSec,webhook);
  createPanel(asDome,asTdc,placeOn,placeSec,detectOn,detectSec,webhook);
  enhanceProfile();

  // boucles
  setInterval(()=>{ injectToolbox(); createPanel(); enhanceProfile(); },500);
  setInterval(()=>{
    const s=new Date().getSeconds();
    if(placeOn&&s===placeSec)    performReplaceAntisonde(asDome,asTdc);
    if(detectOn&&s===detectSec)   detectOtherTroops();
  },1000);
})();
