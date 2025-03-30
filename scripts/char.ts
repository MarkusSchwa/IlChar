class Char {
    Name: string;
     Version: number;
     Profession: string;
     Kurzbeschreibung: string;

    constructor(key: string, xml: Document) {
        this.Name = key;
        this.Version = parseInt(xml.querySelector('CharakterVersion')?.textContent || ""); 
        this.Profession = xml.getElementsByTagName("Profession")[0].textContent || "";
        this.Kurzbeschreibung = xml.getElementsByTagName("Kurzbeschreibung")[0].textContent || "";
    }
    show(details: string, seperator: string): string {
        return this.Name + seperator + ' Profession: ' + this.Profession
            + (details == 'short' ? seperator + 'Kurzbeschreibung: ' + this.Kurzbeschreibung : '');
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

  

