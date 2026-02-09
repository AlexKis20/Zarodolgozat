export const keresRendeles = (termekek, keresett, kivalasztott, setFuggveny) => {
    let szurtLista = []
    if (keresett.length === 0 || keresett === undefined) {
        szurtLista = termekek
            .map((elem) => ({ ...elem, keresett: true }))
    } else {
        szurtLista = termekek
            .map((elem) => {
                const keresettSzoveg = keresett.toLowerCase();
                let talalat = elem.termek_nev.toLowerCase().includes(keresettSzoveg)
                return { ...elem, keresett: talalat }
            })
    }

    if (kivalasztott) {
        setFuggveny(szurtLista)
    } else {
        setFuggveny(szurtLista)
    }
}