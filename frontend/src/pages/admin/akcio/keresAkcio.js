export const keresAkcio = (termekek, keresett, kivalasztott, setFuggveny) => {
    let szurtLista = []
    if (keresett.length === 0 || keresett === undefined) {
        szurtLista = termekek
            .map((elem) => ({ ...elem, keresett: true }))
    } else {
        szurtLista = termekek
            .map((elem) => {
                let kivalasztott = false
                const keresettSzoveg = keresett.toLowerCase();
                const keresettMezok = ["termek_nev", "termek_ar"]
                keresettMezok.forEach(k => {
                    if (elem[k].toString().toLowerCase().includes(keresettSzoveg)) {
                        kivalasztott = true
                        return;
                    }
                });
                return { ...elem, keresett: kivalasztott }
            })
    }

    if (kivalasztott) {
        setFuggveny(szurtLista)
    } else {
        setFuggveny(szurtLista)
    }
}