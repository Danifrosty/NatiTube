// ==UserScript==
// @name         NatiTube
// @version      2.0
// @description  Opens YouTube videos in the native system player and enhances the web experience.
// @author       3lprox
// @match        *://*.youtube.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // --- CORE LOGIC: OPEN IN NATIVE PLAYER ---
    const openInNativePlayer = () => {
        const videoElement = document.querySelector('video');
        if (videoElement && videoElement.src && !videoElement.getAttribute('data-natitube-active')) {
            // Set flag to avoid infinite loops
            videoElement.setAttribute('data-natitube-active', 'true');
            
            // Redirect to the raw video source to trigger the native system player
            window.location.href = videoElement.src;
        }
    };

    // Monitor for video changes (especially in SPAs like YouTube)
    const observer = new MutationObserver(() => {
        if (window.location.pathname === '/watch') {
            openInNativePlayer();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // --- PLUGIN SYSTEM ---
    // The following section contains modular enhancements.
    // You can add your own snippets at the end of this block.

    // [Plugin 1] Background Play Enabler
    // Tricking the browser to stay "visible" even when minimized.
    Object.defineProperty(document, 'visibilityState', { get: () => 'visible', configurable: true });
    Object.defineProperty(document, 'hidden', { get: () => false, configurable: true });
    window.addEventListener('visibilitychange', (e) => { e.stopImmediatePropagation(); }, true);

    // [Plugin 2] Auto-Lite Mode
    // Hides heavy UI elements to improve performance and focus.
    const cleanNatiUI = () => {
        const selectors = [
            '#comments', 
            '#related', 
            'ytm-item-section-renderer[section-identifier="comment-item-section"]',
            'ytm-rich-section-renderer' // For those annoying grids
        ];
        selectors.forEach(s => {
            const el = document.querySelector(s);
            if (el) el.style.display = 'none';
        });
    };
    setInterval(cleanNatiUI, 1500);

    // ========================================================
    // USER PLUGINS AREA (Paste your custom snippets below)
    // ========================================================
    
    /* [YOUR CODE HERE] */

    // ========================================================

})();
