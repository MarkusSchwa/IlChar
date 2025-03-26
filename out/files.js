var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
$('.files').on('change', 'input[type=file]', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const id = this.id;
        const file = this.files[0];
        let key = file.name.replace(/\.[^/.]+$/, '');
        const text = yield file.text();
        if (id == 'rulesInput') {
            if (key == 'datenbank')
                key = 'Regeln';
            else {
                alert('Es dürfen nur datenbank.xml Dateien als Regeln geladen werden.');
                return;
            }
        }
        else {
            // Version 8 prüfen
            let xml = $.parseXML(text);
            let CharVersion = $(xml).find("CharakterVersion").text();
            if (CharVersion == '') {
                alert('Das ist keine Ilaris-Charakter-Datei und kann somit nicht geladen werden.');
                return;
            }
            else if (CharVersion != '8')
                alert('App unterstützt Version 8. Charakter hat Version ' + CharVersion + '. Könnte Probleme bereiten.');
        }
        localStorage.setItem(key, text);
        location.reload();
    });
});
$('#CharListShow').on('click', '.delChar', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const key = this.id;
        localStorage.removeItem(key);
        location.reload();
    });
});
//# sourceMappingURL=files.js.map