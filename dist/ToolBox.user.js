// ==UserScript==
// @name         ToolBox
// @namespace    http://tampermonkey.net/
// @version      2.0.2
// @description  Replacer Antisonde auto & détection Discord + affichage colonies
// @author       Tristoune
// @match        *://*.fourmizzz.fr/*
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @connect      s1.fourmizzz.fr
// @connect      s2.fourmizzz.fr
// @connect      s3.fourmizzz.fr
// @connect      discord.com
// @run-at       document-idle
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/utils.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/antisonde.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/detection.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/colonies.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/ui.js
// @require      https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/src/main.js
+// @resource     colonieCss https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/css/colonie.css
+// @resource     toolboxCss https://raw.githubusercontent.com/LeTristoune81/ToolBox/main/css/toolbox.css
// ==/UserScript==
