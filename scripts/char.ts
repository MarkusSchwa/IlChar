enum Details {
    basic = 1,
    short = 2,
    long = 3
}
class Attribut {
    Name: string;
    Wert: number;
    constructor(xml: Element) {
        this.Name = xml.getAttribute("name") || "";
        this.Wert = parseInt(xml.getAttribute("wert") || "");
    }
}
class Char {
    Name: string;
     Version: number;
     Profession: string;
     Kurzbeschreibung: string;
     Eigenheiten: string[];
     Attribute: Attribut[] ;

    constructor(key: string, xml: Document) {
        this.Name = key;
        this.Version = parseInt(xml.getElementsByTagName('CharakterVersion')[0].textContent || ""); 
        this.Profession = xml.getElementsByTagName("Profession")[0].textContent || "";
        this.Kurzbeschreibung = xml.getElementsByTagName("Kurzbeschreibung")[0].textContent || "";
        this.Eigenheiten = Array.from(xml.getElementsByTagName("Eigenheit")).map((e) => e.textContent || "");
        this.Attribute = Array.from(xml.getElementsByTagName("Attribut")).map((a) => new Attribut(a));
    }
    show(details: number, seperator: string): string {
        let textChar: string = this.Name + seperator + ' Profession: ' + this.Profession
        if (details >= Details.short ) {
                textChar += seperator + 'Kurzbeschreibung: ' + this.Kurzbeschreibung;
        }
        if (details >= Details.long ) {   
                textChar += seperator + 'Eigenheiten: ' + this.Eigenheiten.join(', ');
        }  
        return textChar;
    }
    getAttribut(attr: string): number {
        const Attribut = this.Attribute.find((attribut) => {
            return attribut;
        });
        return Attribut?.Wert || 0;
    }
}

     const Chars: Char[] = [];
     let names = "";
     for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key != 'Regeln') {
            const item = localStorage.getItem(key);
            if (item) { // Ensures item is not null
                const parser = new DOMParser();
                const xml = parser.parseFromString(item, "application/xml"); 
                let c = new Char(key,xml);
                Chars.push(c);
            }
        }
    }; 
//Basisfunktionen für Scripte
//roundDown(value)

  

