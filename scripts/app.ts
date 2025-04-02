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

// Importieren der benötigten Module
//import { Chars} from './char.js';      


document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('Regeln') == null) {
        console.log(`keine Regeln geladen`);
    } else {
        const btnDB =  document.getElementById('btnDB') as HTMLButtonElement;
        if (btnDB) {
        btnDB.textContent = "Regeln bereits importiert"; 
        btnDB.disabled = true;
        }
    }
    let CharNames = "";
    Chars.forEach(c => {
        CharNames += (CharNames == ""?"":", ") + c.Name;
        let risky = c.Version == supportedVersion;
        document.getElementById('CharListShow')?.insertAdjacentHTML('beforeend','<div class="card' + (risky?'':' risky') + '"><div>' + c.show(Details.basic,'<br>') + '</div>' 
            + (risky?'':'<div class="riskyNote">Nicht unterstützte Version ' + c.Version + '.<br>Könnte Probleme machen.<br>Es wird Version ' 
            + supportedVersion + ' unterstützt.</div>') 
            + '<div class="buttons">'
            + '<a class="card-link showChar" href="#" id = "' + c.Name + '" >Zeige</a>'
            + '<a class="card-link delChar" href="#" id = "' + c.Name + '" >Lösche</a>'
            + '</div>'
            + '</div>');
    }); 
    console.log('Instanzen: ' + CharNames);
    //Button zum Löschen der Charktere aktivieren
    Array.from(document.getElementsByClassName('delChar')).forEach((btnDel) => {
        btnDel.addEventListener('click', (event) => {
            alert('Charakter ' + (event.target as HTMLButtonElement).id + ' wird gelöscht.');
            const btn = event.target as HTMLButtonElement;
            const key = btn.id;
            localStorage.removeItem(key);
            location.reload();
        })
    });
    //Button zum Anzeigen der Charktere aktivieren
    Array.from(document.getElementsByClassName('showChar')).forEach((btnShow) => {
        btnShow.addEventListener('click', (event) => {
            const key = (event.target as HTMLButtonElement).id;
    //        alert('Charakter ' + key + ' wird angezeigt.');
            const details = document.getElementById('CharDetailsShow') ;
            if (details) {
                const char = Chars.find(c => c.Name === key);
                if (!char) {
                    console.error('Charakter nicht gefunden:', key);
                    return;
                }
                details.innerHTML = char.show(Details.long, '<br>'); 
            }
        })
    });
})
