"use strict";
// Überprüfen, ob der Local Storage unterstützt wird
const supportedVersion = 8;
if (typeof (Storage) !== "undefined") {
    console.log('Local Storage API is supported!');
}
else {
    console.log('Local Storage API is not supported!');
}
// Überprüfen, ob der Service Worker unterstützt wird
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            console.log('Service Worker registriert mit Erfolg:', registration);
        }).catch(function (error) {
            console.log('Fehler bei der Service Worker Registrierung:', error);
        });
    });
}
// Automatisches Update der PWA
if ('serviceWorker' in navigator) {
    console.log('SW auto update wird versucht');
    navigator.serviceWorker.ready.then(function (registration) {
        console.log('SW auto update davor', registration);
        registration.update();
        console.log('SW auto update danach');
    });
}
// Importieren der benötigten Module
//import { Chars} from './char.js';      
document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('Regeln') == null) {
        console.log(`keine Regeln geladen`);
    }
    else {
        const btnDB = document.getElementById('btnDB');
        if (btnDB) {
            btnDB.textContent = "Regeln bereits importiert";
            btnDB.disabled = true;
        }
    }
    let CharNames = "";
    Chars.forEach(c => {
        var _a;
        CharNames += (CharNames == "" ? "" : ", ") + c.Name;
        let risky = c.Version == supportedVersion;
        (_a = document.getElementById('CharListShow')) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', '<div class="card' + (risky ? '' : ' risky') + '"><div>' + c.show(Details.basic, '<br>') + '</div>'
            + (risky ? '' : '<div class="riskyNote">Nicht unterstützte Version ' + c.Version + '.<br>Könnte Probleme machen.<br>Es wird Version '
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
            alert('Charakter ' + event.target.id + ' wird gelöscht.');
            const btn = event.target;
            const key = btn.id;
            localStorage.removeItem(key);
            location.reload();
        });
    });
    //Button zum Anzeigen der Charktere aktivieren
    Array.from(document.getElementsByClassName('showChar')).forEach((btnShow) => {
        btnShow.addEventListener('click', (event) => {
            var _a, _b;
            const key = event.target.id;
            //        alert('Charakter ' + key + ' wird angezeigt.');
            const details = document.getElementById('CharDetailsShow');
            const char = Chars.find(c => c.Name === key);
            if (!char) {
                console.error('Charakter nicht gefunden:', key);
                return;
            }
            if (details) {
                details.innerHTML = char.show(Details.magic, '<br>');
            }
            const attributes = document.getElementById('Attributes');
            if (attributes) {
                const table = document.createElement("table");
                char.Attribute.forEach((a) => {
                    const row = document.createElement("tr");
                    const anzeige = document.createElement("td");
                    anzeige.textContent = a.Anzeige;
                    anzeige.style.textAlign = "left";
                    row.appendChild(anzeige);
                    const wert = document.createElement("td");
                    wert.textContent = a.Wert.toString();
                    wert.style.textAlign = "right";
                    row.appendChild(wert);
                    const PW = document.createElement("td");
                    PW.textContent = (a.Wert * 2).toString();
                    PW.style.textAlign = "right";
                    PW.style.color = "red";
                    PW.style.fontWeight = "bold";
                    row.appendChild(PW);
                    table.appendChild(row);
                });
                const element = (_a = document.getElementById('Attributes')) === null || _a === void 0 ? void 0 : _a.children[0];
                if (element) {
                    attributes.replaceChild(table, element);
                }
                else
                    attributes.appendChild(table);
            }
            const abgeleitete = document.getElementById('Abgeleitete');
            if (abgeleitete) {
                const table = document.createElement("table");
                char.Abgeleitete.forEach((a) => {
                    const row = document.createElement("tr");
                    const anzeige = document.createElement("td");
                    anzeige.textContent = a.Anzeige;
                    anzeige.style.textAlign = "left";
                    row.appendChild(anzeige);
                    const wert = document.createElement("td");
                    if (a.Name == 'RS' || a.Name == 'BE') {
                        wert.textContent = "???";
                    }
                    else {
                        wert.textContent = eval(a.calcBase.replace("this", "char")).toString();
                    }
                    wert.style.textAlign = "right";
                    row.appendChild(wert);
                    table.appendChild(row);
                });
                const element = (_b = document.getElementById('Abgeleitete')) === null || _b === void 0 ? void 0 : _b.children[0];
                if (element) {
                    abgeleitete.replaceChild(table, element);
                }
                else
                    abgeleitete.appendChild(table);
            }
        });
    });
});
//# sourceMappingURL=app.js.map