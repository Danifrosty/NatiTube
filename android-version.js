// ==UserScript==
// @name         NatiTube Android
// @match        *://m.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function forceNative() {
        const v = document.querySelector('video');
        const ytPlayer = document.querySelector('#player-container-id') || document.querySelector('.player-container');
        if (v && !v.dataset.isFixed) {
            if (ytPlayer) {
                ytPlayer.style.setProperty("position", "absolute", "important");
                ytPlayer.style.setProperty("left", "-9999px", "important");
            }
            document.body.prepend(v);
            v.dataset.isFixed = "true";
            v.style.setProperty("display", "block", "important");
            v.style.setProperty("width", "100vw", "important"); 
            v.style.setProperty("height", "56.25vw", "important");
            v.style.setProperty("z-index", "99999", "important");
            v.style.setProperty("background", "black", "important");
            v.controls = true;
            v.play().catch(() => {});
        }
    }
    setInterval(forceNative, 1000);
})();
