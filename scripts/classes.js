class Char {
    constructor(key,xml)
    {
        this.Name = key;
        this.Version = $(xml).find("CharakterVersion").text();
        this.Profession = $(xml).find("Profession").text();
        this.Kurzbeschreibung = $(xml).find("Kurzbeschreibung").text();
    }
    show(details,seperator)
    {
        return this.Name + seperator + ' Profession: '+ this.Profession
        + (details == 'short' ? seperator + 'Kurzbeschreibung: ' + this.Kurzbeschreibung : '');
    }
}