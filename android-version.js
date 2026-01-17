// ==UserScript==
// @name         NatiTube - Final Stable
// @version      13.0
// @description  A stable hybrid layer that overlays a native video view while keeping YouTube's engine active.
// @author       3lprox
// @match        https://m.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Create the Top Layer
    const nativeLayer = document.createElement('video');
    nativeLayer.autoplay = true;
    nativeLayer.muted = true; 
    nativeLayer.id = "nati-layer-top";
    nativeLayer.setAttribute('playsinline', 'true');
    nativeLayer.setAttribute('style', `
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 56.25vw;
        background: black;
        z-index: 2147483647;
        display: none;
    `);
    document.documentElement.appendChild(nativeLayer);

    const runEngine = () => {
        const ytVideo = document.querySelector('video:not(#nati-layer-top)');
        const ytPlayerElement = document.querySelector('.html5-main-video');

        if (window.location.pathname === '/watch' && ytVideo) {
            nativeLayer.style.display = 'block';

            // Bridge the visuals
            if (!nativeLayer.getAttribute('data-bridged')) {
                try {
                    const stream = ytVideo.captureStream ? ytVideo.captureStream() : ytVideo.mozCaptureStream();
                    nativeLayer.srcObject = stream;
                    nativeLayer.setAttribute('data-bridged', 'true');
                } catch (e) {}
            }

            // Keep YouTube video active but invisible
            if (ytPlayerElement) {
                ytPlayerElement.style.setProperty('opacity', '0.01', 'important');
            }

            // Push UI down
            document.body.style.paddingTop = '56.25vw';

            // Sync Play/Pause
            if (ytVideo.paused && !nativeLayer.paused) nativeLayer.pause();
            if (!ytVideo.paused && nativeLayer.paused) nativeLayer.play();
            
        } else {
            nativeLayer.style.display = 'none';
            nativeLayer.srcObject = null;
            nativeLayer.removeAttribute('data-bridged');
            document.body.style.paddingTop = '0';
        }
    };

    setInterval(runEngine, 1000);

    // Simple touch to play/pause
    nativeLayer.addEventListener('click', () => {
        const ytVideo = document.querySelector('video:not(#nati-layer-top)');
        if (ytVideo) {
            if (ytVideo.paused) ytVideo.play();
            else ytVideo.pause();
        }
    });

})();
