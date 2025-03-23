$('#btnDB').on('click', function () {
    $('#rulesInput').trigger('click');
});
async function readRules(event) {
    const file = event.target.files.item(0);
    const key = 'Regeln';
    const text = await file.text();
    localStorage.setItem(key, text);
    if (localStorage.getItem(key) == null) {
        console.log(`Regeln konnten nicht geladen werden`);
    }
    else {
        console.log(`Regeln wurden geladen`);
    }
    location.reload();
}
$('#btnChar').on('click', function () {
    $('#charInput').trigger('click');
});
$('body').on('change', '#charInput', async function () {
    console.log('Input - Change');
    console.log(this.files[0]);
    const file = this.files[0];
    const key = file.name.replace(/\.[^/.]+$/, '');
    const text = await file.text();
    alert(key);
    // Version 8 prüfen
    //let xml: XMLDocument = $.parseXML(text);
    // let CharVersion: string = $(xml).find("CharakterVersion").text();
    // if (CharVersion != '8') alert('App unterstützt Version 8. Charakter hat Version ' + CharVersion +'. Könnte Probleme bereiten.')
    // localStorage.setItem(key,text);
    // for (let [key, value] of Object.entries(localStorage)) {
    //   console.log(`${key}`);
    // } 
    // location.reload();
});
// $('#charInput').on('change', async function(event) { 
//   console.log('Input - Change');
//   const e: JQuery.ChangeEvent = event;
//   const file: File = e.target.files.item(0);
//   const key: string = file.name.replace(/\.[^/.]+$/, '');
//   const text: string = await file.text();
//   // Version 8 prüfen
//   let xml: XMLDocument = $.parseXML(text);
//   let CharVersion: string = $(xml).find("CharakterVersion").text();
//   if (CharVersion != '8') alert('App unterstützt Version 8. Charakter hat Version ' + CharVersion +'. Könnte Probleme bereiten.')
//   localStorage.setItem(key,text);
//   for (let [key, value] of Object.entries(localStorage)) {
//     console.log(`${key}`);
//   } 
//   location.reload();
// })
// async function readChar(event) {
//   const file = event.target.files.item(0);
//   const key = file.name.replace(/\.[^/.]+$/, '');
//   const text = await file.text();
//   // Version 8 prüfen
//   let xml = $.parseXML(text);
//   let CharVersion = $(xml).find("CharakterVersion").text();
//   if (CharVersion != '8') alert('App unterstützt Version 8. Charakter hat Version ' + CharVersion +'. Könnte Probleme bereiten.')
//   localStorage.setItem(key,text);
//   for (let [key, value] of Object.entries(localStorage)) {
//     console.log(`${key}`);
//   } 
//   location.reload();
// }
async function remove(key) {
    localStorage.removeItem(key);
    location.reload();
}
//# sourceMappingURL=files.js.map