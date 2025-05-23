// ==UserScript==
// @name         ToolBox
// @namespace    http://tampermonkey.net/
// @version      2.0.2
// @description  Replacer Antisonde auto & détection Discord + affichage colonies
// @author       Tristoune
// @match        *://*.fourmizzz.fr/*
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @connect      s1.fourmizzz.fr
// @connect      s2.fourmizzz.fr
// @connect      s3.fourmizzz.fr
// @connect      discord.com
// @run-at       document-idle
// @resource     colonieCss https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/css/colonie.css
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/utils.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/antisonde.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/detection.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/colonies.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/ui.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/main.js
// ==/UserScript==

// ─── Injecte uniquement le CSS des colonies depuis le fichier séparé ──────────
GM_addStyle(GM_getResourceText('colonieCss'));
