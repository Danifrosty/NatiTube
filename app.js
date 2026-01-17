const nativePlayer = document.getElementById('native-viewer');
const iframe = document.getElementById('yt-bridge');
const input = document.getElementById('query');

// 1. Manejador de búsqueda
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let url = input.value;
        if (url.includes('youtube.com/watch')) {
            iframe.src = url;
        } else {
            iframe.src = `https://m.youtube.com/results?search_query=${encodeURIComponent(url)}`;
        }
        input.blur();
    }
});

// 2. Puente Híbrido de Video
function startBridge() {
    setInterval(() => {
        try {
            const ytDoc = iframe.contentDocument || iframe.contentWindow.document;
            const ytVideo = ytDoc.querySelector('video');

            if (ytVideo && !nativePlayer.getAttribute('data-linked')) {
                // Capturamos el Stream del video original
                const stream = ytVideo.captureStream ? ytVideo.captureStream() : ytVideo.mozCaptureStream();
                nativePlayer.srcObject = stream;
                nativePlayer.setAttribute('data-linked', 'true');

                // MODO FANTASMA: El video original se vuelve invisible pero sigue emitiendo
                ytVideo.style.opacity = "0.01";
                ytVideo.style.pointerEvents = "none";
                
                console.log("NatiTube: Bridge Established!");
            }

            // Sincronización de Play/Pause (Si pausas en el nativo, se pausa en el motor)
            if (ytVideo) {
                nativePlayer.onplay = () => ytVideo.play();
                nativePlayer.onpause = () => ytVideo.pause();
            }

        } catch (e) {
            // Esto fallará si YouTube bloquea el acceso al iframe (CORS)
            // Para solucionarlo al 100% se usa el Service Worker o un Proxy
        }
    }, 1000);
}

// 3. Registro del Service Worker para modo PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

startBridge();
