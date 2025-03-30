"use strict";
class Char {
    constructor(key, xml) {
        var _a;
        this.Name = key;
        this.Version = parseInt(((_a = xml.querySelector('CharakterVersion')) === null || _a === void 0 ? void 0 : _a.textContent) || "");
        this.Profession = xml.getElementsByTagName("Profession")[0].textContent || "";
        this.Kurzbeschreibung = xml.getElementsByTagName("Kurzbeschreibung")[0].textContent || "";
    }
    show(details, seperator) {
        return this.Name + seperator + ' Profession: ' + this.Profession
            + (details == 'short' ? seperator + 'Kurzbeschreibung: ' + this.Kurzbeschreibung : '');
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