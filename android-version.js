// ==UserScript==
// @name         NatiTube - Space Layer V2
// @version      7.0
// @description  Native layer for video with background audio sync and UI access.
// @author       3lprox
// @match        https://m.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 1. Create the Native Overlay
    const nativeLayer = document.createElement('video');
    nativeLayer.controls = true;
    nativeLayer.autoplay = true;
    nativeLayer.muted = true; // Native layer is muted to use YouTube's original audio
    nativeLayer.id = "nati-layer-top";
    nativeLayer.setAttribute('style', `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 56.25vw; /* 16:9 Aspect Ratio */
        background: black;
        z-index: 2147483647; 
        display: none;
    `);
    document.documentElement.appendChild(nativeLayer);

    const bridgeStream = () => {
        const ytPlayer = document.querySelector('.html5-video-player');
        const ytVideo = document.querySelector('video:not(#nati-layer-top)');

        // If we are on a video page
        if (window.location.pathname === '/watch') {
            
            if (ytVideo && ytVideo.src) {
                nativeLayer.style.display = 'block';

                // Stream Bridge
                if (!nativeLayer.getAttribute('data-bridged')) {
                    try {
                        const stream = ytVideo.captureStream ? ytVideo.captureStream() : ytVideo.mozCaptureStream();
                        nativeLayer.srcObject = stream;
                        nativeLayer.setAttribute('data-bridged', 'true');
                    } catch (e) {
                        console.error("NatiTube Bridge Error:", e);
                    }
                }

                // Ensure synchronization
                if (ytVideo.paused) nativeLayer.pause();
                else nativeLayer.play();
            }

            // Space Mode for the YT UI (Pushing it down to leave space for comments)
            if (ytPlayer) {
                ytPlayer.style.setProperty('visibility', 'hidden', 'important');
                // We keep the UI accessible below the native player
                document.body.style.marginTop = '56.25vw';
            }

        } else {
            // Reset when not watching a video
            nativeLayer.style.display = 'none';
            nativeLayer.srcObject = null;
            nativeLayer.removeAttribute('data-bridged');
            document.body.style.marginTop = '0';
        }
    };

    // Constant Sync Loop
    setInterval(bridgeStream, 1000);

})();
