

$('body').on('change', 'input[type=file]', async function() { 
  const id = this.id;
  const file = this.files[0];
  let key = file.name.replace(/\.[^/.]+$/, ''); 
  const text = await file.text();
  if (id == 'rulesInput'){
    if (key == 'datenbank') key = 'Regeln'; else {
    alert ('Es dürfen nur datenbank.xml Dateien als Regeln geladen werden.');
    return;}
  } else {
  // Version 8 prüfen
    let xml = $.parseXML(text);
    let CharVersion = $(xml).find("CharakterVersion").text();
    if (CharVersion == '') {alert('Das ist keine Ilaris-Charakter-Datei und kann somit nicht geladen werden.'); return;} else
    if (CharVersion != '8') alert('App unterstützt Version 8. Charakter hat Version ' + CharVersion +'. Könnte Probleme bereiten.')
  } 
  localStorage.setItem(key,text);
  location.reload();
})

async function remove(key) {
  localStorage.removeItem(key);
  location.reload();
}

