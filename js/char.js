const getCharList = () => {
    const CharList = [];
    let names = "";
    for (let [key, value] of Object.entries(localStorage)) {
        if (key != 'Regeln')
        {
            let xml = $.parseXML(value);
            let c = new Char(key,xml);
            CharList.push(c);
        }
    }
    CharList.forEach(function(c) {
        names += (names == ""?"":", ") + c.Name;
    });
    console.log('Instanzen: ' + names);
    return CharList;
}
