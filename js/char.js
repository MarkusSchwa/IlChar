const getCharList = () => {
    const CharList = [];
    var names = "";
    for (let [key, value] of Object.entries(localStorage)) {
        console.log(`Local: ${key}`);
        if (key != 'Regeln')
        {
            var xml = $.parseXML(value);
            var c = new Char(key,xml);
            CharList.push(c);
        }
    }
    CharList.forEach(function(c) {
        names += (names == ""?"":", ") + c.Name;
    });
    console.log('intern: ' + names);
    return CharList;
}
