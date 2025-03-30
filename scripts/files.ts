
document.getElementById('rulesInput')?.addEventListener('change', (event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const file = input.files[0];
    let key = file.name.replace(/\.[^/.]+$/, '');
    if (key == 'datenbank') key = 'Regeln'; else {
      alert('Es dürfen nur datenbank.xml Dateien als Regeln geladen werden.');
      return;
    }
    file.text().then((text) => {
      localStorage.setItem(key, text);
    });
    location.reload();
  }; 
});

document.getElementById('charInput')?.addEventListener('change', (event) => {
 const input = event.target as HTMLInputElement;
  if (input.files) {
    const file = input.files[0];
    let key = file.name.replace(/\.[^/.]+$/, '');
    file.text().then((text) => {
      // Version 8 prüfen
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");
      let CharVersionNode = xml.querySelector('CharakterVersion');
      if (CharVersionNode == null ) { alert('Das ist keine Ilaris-Charakter-Datei und kann somit nicht geladen werden.'); return; } else
        {let CharVersion = CharVersionNode?.textContent;
        if (CharVersion != '8') alert('App unterstützt Version 8. Charakter hat Version ' + CharVersion + '. Könnte Probleme bereiten.')}
      localStorage.setItem(key, text);
    });
    location.reload();
  };
});




