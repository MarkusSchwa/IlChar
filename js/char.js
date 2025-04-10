"use strict";
var Details;
(function (Details) {
    Details[Details["basic"] = 1] = "basic";
    Details[Details["short"] = 2] = "short";
    Details[Details["long"] = 3] = "long";
    Details[Details["magic"] = 4] = "magic";
})(Details || (Details = {}));
class Attribut {
    constructor(xml) {
        this.Name = xml.getAttribute("name") || "";
        this.Wert = parseInt(xml.getAttribute("wert") || "");
        const result = Regeln.evaluate("//Attribut[@name ='" + this.Name + "']/@anzeigename", Regeln, null, XPathResult.STRING_TYPE, null);
        this.Anzeige = result.stringValue;
    }
}
class Abgeleitet {
    constructor(xml) {
        this.Name = xml.getAttribute("name") || "";
        let calcScript = xml.getAttribute("script") || "";
        calcScript = calcScript.replace("get", "this.get");
        this.calcBase = calcScript;
        this.Anzeige = xml.getAttribute("anzeigename") || "";
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
        this.Abgeleitete = Array.from(Regeln.getElementsByTagName("AbgeleiteterWert")).map((a) => new Abgeleitet(a));
    }
    show(details, seperator) {
        let textChar = this.Name + seperator + ' Profession: ' + this.Profession;
        if (details >= Details.short) {
            textChar += seperator + 'Kurzbeschreibung: ' + this.Kurzbeschreibung;
        }
        if (details >= Details.long) {
            textChar += seperator + 'Eigenheiten: ' + this.Eigenheiten.join(', ');
        }
        if (details >= Details.magic) {
            const KO = this.Attribute.find(item => item.Name === "KO");
            textChar += seperator + (KO === null || KO === void 0 ? void 0 : KO.Anzeige) + ": " + (KO === null || KO === void 0 ? void 0 : KO.Wert);
            //    const result = Regeln.evaluate("//AbgeleiteterWert[@name ='WS']/@script",Regeln, null, XPathResult.STRING_TYPE, null);
            const WS = this.Abgeleitete.find(item => item.Name === "WS");
            if (WS != null)
                textChar += seperator + WS.Anzeige + ": " + eval(WS.calcBase);
        }
        return textChar;
    }
    getAttribut(attr) {
        const Attribut = this.Attribute.find(a => a.Name === attr);
        if (Attribut)
            return Attribut.Wert;
        else
            return 0;
    }
}
const parser = new DOMParser();
const regelTemp = localStorage.getItem('Regeln');
let Regeln = new Document;
if (regelTemp) {
    Regeln = parser.parseFromString(regelTemp, "application/xml");
}
const Chars = [];
let names = "";
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key != 'Regeln') {
        const item = localStorage.getItem(key);
        if (item) { // Ensures item is not null
            const xml = parser.parseFromString(item, "application/xml");
            let c = new Char(key, xml);
            Chars.push(c);
        }
    }
}
;
function roundDown(value) {
    return Math.floor(value);
}
//# sourceMappingURL=char.js.map