// Überprüfen, ob der Local Storage unterstützt wird
const supportedVersion = 8;
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

$( document ).ready(function() {

    if (localStorage.getItem('Regeln') == null) {
        console.log(`keine Regeln geladen`);
    } else {
        $("#btnDB").text("Regeln bereits importiert"); 
        $("#btnDB").prop("disabled", true);
    }
    var CharNames = "";
    getCharList().forEach(function(c) {
        CharNames += (CharNames == ""?"":", ") + c.Name;
var risky = c.Version == supportedVersion;
        $('#CharListShow').append('<div class="card' + (risky?'':' risky') + '">' + c.show('','<br>') 
            + (risky?'':'<div class="riskyNote">Nicht unterstützte Version ' + c.Version + '.<br>Könnte Probleme machen.<br>Es wird Version ' 
                + supportedVersion + ' unterstützt.</div>') 
                + '<div>'
                + '<a class="card--link" href="#" onclick="show(\'' + c.Name + '\');return false;">Zeige</a>'
                +'<a class="card--link" href="#" onclick="remove(\'' + c.Name + '\');return false;">Lösche</a>'
                +'</div>'
            + '</div>');
    });
    console.log(CharNames);
});

