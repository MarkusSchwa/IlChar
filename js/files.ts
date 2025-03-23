// $('#btnDB').on('click', function() { 
//   $('#rulesInput').trigger('click');
// })

$('body').on('change', '#rulesInput', async function() { 
  const file = this.files[0];
  const key = 'Regeln';
  const text = await file.text();
  localStorage.setItem(key,text);
  if (localStorage.getItem(key) == null) {
    console.log(`Regeln konnten nicht geladen werden`);
  } else {
    console.log(`Regeln wurden geladen`);
  }
  location.reload();
})

$('#btnChar').on('click', function() { 
  $('#charInput').trigger('click');
})

$('body').on('change', '#charInput', async function() { 
    const file = this.files[0];
    const key = file.name.replace(/\.[^/.]+$/, '');
    const text = await file.text();
  // Version 8 prüfen
    let xml = $.parseXML(text);
    let CharVersion = $(xml).find("CharakterVersion").text();
    if (CharVersion != '8') alert('App unterstützt Version 8. Charakter hat Version ' + CharVersion +'. Könnte Probleme bereiten.')
    localStorage.setItem(key,text);
    for (let [key, value] of Object.entries(localStorage)) {
    console.log(`${key}`);
  } 
  location.reload();
})

async function remove(key) {
  localStorage.removeItem(key);
  location.reload();
}

