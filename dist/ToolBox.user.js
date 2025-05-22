// ==UserScript==
// @name        ToolBox
// @match       *://*.fourmizzz.fr/*
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js
// @require     https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/utils.js
// @require     https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/antisonde.js
// @require     https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/detection.js
// @require     https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/colonies.js
// @require     https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/ui.js
// @require     https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/dist/ToolBox.iife.js
// ==/UserScript==

// (Vous pouvez alors laisser l’IIFE minifiée ici si vous le souhaitez)



!function()
{"use strict";!function(){const e=GM_info.script.version,t=location.host.replace(/[.:]/g,"_"),o=t+"_as_dome",a=t+"_as_tdc",c=t+"_auto_place_sec",l=t+"_auto_detect_sec",r=t+"_auto_place_on",_=t+"_auto_detect_on",n=t+"_discord_wh";let g=+localStorage.getItem(o)||5,s=+localStorage.getItem(a)||1,i=+localStorage.getItem(c)||0,d=+localStorage.getItem(l)||30,m="true"===localStorage.getItem(r),u="true"===localStorage.getItem(_),I=localStorage.getItem(n)||"";injectToolbox(e,g,s,m,i,u,d,I),createPanel(g,s,m,i,u,d,I),setInterval((()=>{const e=(new Date).getSeconds();m&&e===i&&performReplaceAntisonde(g,s),u&&e===d&&detectOtherTroops()}),1e3)}()}();
