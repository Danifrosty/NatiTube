


//PLS READ ME

//THIS VERSION IS CORRUOTED PLS WAIT THE NEW VERSION







// ==UserScript==
// @name         NatiTube Android - Ultra PiP & Space Mode
// @namespace    http://tampermonkey.net/
// @version      3.5
// @description  Sends YouTube's UI to space and forces native PiP for maximum performance.
// @author       3lprox
// @match        https://m.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // --- SPACE MODE: UI ANNIHILATION ---
    // This removes everything except the video container to save RAM and Battery.
    const sendToSpace = () => {
        const junkSelectors = [
            '#comments', 
            '#related', 
            'ytm-item-section-renderer', 
            'ytm-rich-section-renderer', 
            '.ad-slot-renderer',
            'ytm-promoted-sparkles-web-renderer',
            'ytm-mweb-player-miniplayer-renderer',
            'ytm-pivot-bar-renderer', // Bottom bar
            '#masthead-container'      // Header
        ];
        
        junkSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => el.remove());
        });

        // Expand the video player to fill the space
        const player = document.querySelector('#player-container-id');
        if (player) {
            player.style.position = 'fixed';
            player.style.top = '0';
            player.style.zIndex = '9999';
            player.style.width = '100vw';
        }
    };

    // Run the annihilator continuously
    setInterval(sendToSpace, 500);

    // --- CORE LOGIC: NATIVE PiP ---
    async function activateNativePiP() {
        const video = document.querySelector('video');
        if (!video) return;

        try {
            if (document.pictureInPictureEnabled && !video.disablePictureInPicture) {
                await video.requestPictureInPicture();
            } else if (video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === "function") {
                video.webkitSetPresentationMode("picture-in-picture");
            } else {
                video.requestFullscreen();
            }
        } catch (error) {
            console.error("NatiTube Error:", error);
        }
    }

    // --- UI: THE LAUNCH BUTTON ---
    const pipBtn = document.createElement('button');
    pipBtn.textContent = 'LAUNCH';
    pipBtn.setAttribute('style', `
        position: fixed;
        bottom: 30px;
        right: 20px;
        z-index: 1000000;
        width: 70px;
        height: 70px;
        background: radial-gradient(circle, #ff0000 0%, #990000 100%);
        color: white;
        border: 2px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
    `);

    pipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        activateNativePiP();
    });

    document.body.appendChild(pipBtn);

})();
