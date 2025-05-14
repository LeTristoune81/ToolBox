// rollup.config.js
const resolve  = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser').default;

module.exports = {
  input: 'src/main.js',
  output: {
    file:   'dist/ToolBox.user.js',
    format: 'iife',
    banner:
`// ==UserScript==
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
// @downloadURL  https://raw.githubusercontent.com/VotreCompte/ToolBox/main/dist/ToolBox.user.js
// @updateURL    https://raw.githubusercontent.com/VotreCompte/ToolBox/main/dist/ToolBox.user.js
// ==/UserScript==`
  },
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ]
};
