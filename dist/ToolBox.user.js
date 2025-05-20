// ==UserScript==
// @name         ToolBox
// @namespace    http://tampermonkey.net/
// @version      2.0.2
// @description  Replacer Antisonde auto & détection Discord + affichage colonies
// @author       Tristoune
// @match        *://s1.fourmizzz.fr/*
// @match        *://s2.fourmizzz.fr/*
// @match        *://s3.fourmizzz.fr/*
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @connect      s1.fourmizzz.fr
// @connect      s2.fourmizzz.fr
// @connect      s3.fourmizzz.fr
// @connect      discord.com
// @run-at       document-idle
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js
// @downloadURL  https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/dist/ToolBox.user.js
// @updateURL    https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/dist/ToolBox.user.js
// ==/UserScript==


!function()
{"use strict";!function(){const e=GM_info.script.version,t=location.host.replace(/[.:]/g,"_"),o=t+"_as_dome",a=t+"_as_tdc",c=t+"_auto_place_sec",l=t+"_auto_detect_sec",r=t+"_auto_place_on",_=t+"_auto_detect_on",n=t+"_discord_wh";let g=+localStorage.getItem(o)||5,s=+localStorage.getItem(a)||1,i=+localStorage.getItem(c)||0,d=+localStorage.getItem(l)||30,m="true"===localStorage.getItem(r),u="true"===localStorage.getItem(_),I=localStorage.getItem(n)||"";injectToolbox(e,g,s,m,i,u,d,I),createPanel(g,s,m,i,u,d,I),setInterval((()=>{const e=(new Date).getSeconds();m&&e===i&&performReplaceAntisonde(g,s),u&&e===d&&detectOtherTroops()}),1e3)}()}();
