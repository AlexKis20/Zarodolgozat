export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

const uresValidalas = (mezo, ertek) => {
    if (mezo.kotelezo && (ertek === "" || ertek === undefined || ertek === null)) {
        throw new ValidationError(`A(z) "${mezo.megjelenit}" mező kitöltése kötelező!`)
    }
}

const szovegValidalas = (mezo, ertek) => {
    uresValidalas(mezo, ertek)
}

const szamValidalas = (mezo, ertek) => {
    uresValidalas(mezo, ertek)
    if (isNaN(ertek)) {
        throw new ValidationError(`A(z) "${mezo.megjelenit}" mező csak számot tartalmazhat!`)
    }
}

const datumValidalas = (mezo, ertek) => {
    if (isNaN(Date.parse(ertek))) {
        throw new ValidationError(`A(z) "${mezo.megjelenit}" mezőbe mindent meg kell adni (év, hónap, nap, óra, perc)!`)
    }
}

const telefonszamValidalas = (mezo, ertek) => {
    uresValidalas(mezo, ertek)
    if (!/^(\+\d+|\d+)$/.test(ertek)) {
        throw new ValidationError(`A(z) "${mezo.megjelenit}" mező csak érvényes telefonszámot tartalmazhat!`)
    }
}

const validalasTipusok = {
    string: szovegValidalas,
    number: szamValidalas,
    datetime: datumValidalas,
    phone: telefonszamValidalas
}

const mezoValidalas = (adatModFel, mezo, modositas = false) => {
    if (adatModFel === undefined || adatModFel === null) {
        throw new ValidationError("Nincs adat a mező validálásához.")
    }

    if (modositas && mezo.tipus === "file") {
        return;
    }

    const mezoFormatum = mezo.formatum || "string";
    const validaloFunkcio = validalasTipusok[mezoFormatum] || szovegValidalas;

    let ertek = adatModFel[mezo.nev];
    
    validaloFunkcio(mezo, ertek)
}

export const validalas = (adatModFel, mezok, modositas = false, extraValidaciok = []) => {
    const hibak = [];

    for (let mezo of mezok) {
        try {
            mezoValidalas(adatModFel, mezo, modositas);
        } catch (error) {
            if (error instanceof ValidationError) {
                hibak.push(error.message);
            } else {
                hibak.push(`Hiba történt a(z) "${mezo.megjelenit}" mező validálása során!`);
            }
        }
    }

    for (let validacio of extraValidaciok) {
        try {
            validacio();
        } catch (error) {
            hibak.push(error.message);
        }
    }

    if (hibak.length > 0) {
        throw new ValidationError(hibak.join("\n"));
    }
}