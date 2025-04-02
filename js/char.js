"use strict";
var Details;
(function (Details) {
    Details[Details["basic"] = 1] = "basic";
    Details[Details["short"] = 2] = "short";
    Details[Details["long"] = 3] = "long";
})(Details || (Details = {}));
class Attribut {
    constructor(xml) {
        this.Name = xml.getAttribute("name") || "";
        this.Wert = parseInt(xml.getAttribute("wert") || "");
    }
}
class Char {
    constructor(key, xml) {
        this.Name = key;
        this.Version = parseInt(xml.getElementsByTagName('CharakterVersion')[0].textContent || "");
        this.Profession = xml.getElementsByTagName("Profession")[0].textContent || "";
        this.Kurzbeschreibung = xml.getElementsByTagName("Kurzbeschreibung")[0].textContent || "";
        this.Eigenheiten = Array.from(xml.getElementsByTagName("Eigenheit")).map((e) => e.textContent || "");
        this.Attribute = Array.from(xml.getElementsByTagName("Attribut")).map((a) => new Attribut(a));
    }
    show(details, seperator) {
        let textChar = this.Name + seperator + ' Profession: ' + this.Profession;
        if (details >= Details.short) {
            textChar += seperator + 'Kurzbeschreibung: ' + this.Kurzbeschreibung;
        }
        if (details >= Details.long) {
            textChar += seperator + 'Eigenheiten: ' + this.Eigenheiten.join(', ');
        }
        return textChar;
    }
}
const Chars = [];
let names = "";
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key != 'Regeln') {
        const item = localStorage.getItem(key);
        if (item) { // Ensures item is not null
            const parser = new DOMParser();
            const xml = parser.parseFromString(item, "application/xml");
            let c = new Char(key, xml);
            Chars.push(c);
        }
    }
}
;
//# sourceMappingURL=char.js.map