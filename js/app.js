// Überprüfen, ob der Local Storage unterstützt wird
if (typeof(Storage) !== "undefined") {
    console.log('Local Storage API is supported!');
  } else {
    console.log('Local Storage API is not supported!');
  } 

// Überprüfen, ob der Service Worker unterstützt wird
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
            console.log('Service Worker registriert mit Erfolg:', registration);
        }).catch(function(error) {
            console.log('Fehler bei der Service Worker Registrierung:', error);
        });
    });
}

// Automatisches Update der PWA
if ('serviceWorker' in navigator) {
    console.log('SW auto update wird versucht');
    navigator.serviceWorker.ready.then(function(registration) {
        console.log('SW auto update davor',registration);
        registration.update();
        console.log('SW auto update danach');
    });
}

