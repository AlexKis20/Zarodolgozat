const BeviteliMezo = ({ elem, adatModFel, kezelesInput}) => {
    if (elem.tipus === "textarea") {
        return (
            <textarea
                id={elem.nev}
                className="form-control"
                value={adatModFel[elem.nev] || ""}
                rows="3"
                onChange={(e) => kezelesInput(elem.nev, e.target.value)}
                style={{ marginLeft: "5px"}}
            />
        )
    } else if (elem.tipus === "select") {
        return (
            <select
                id={elem.nev}
                className="form-control"
                onChange={(e) => kezelesInput(elem.nev, e.target.value)}
                value={adatModFel[elem.nev] || ""}
                style={{ marginLeft: "5px"}}
            >
                <option value="" disabled hidden>Válassz...</option>
                {elem.opciok.lista.map((opcio) => (
                    <option key={opcio[elem.opciok.id_mezo]} value={opcio[elem.opciok.id_mezo]}>
                        {opcio[elem.opciok.nev_mezo]}
                    </option>
                ))}
            </select>
        )
    } else if (elem.tipus === "file") {
        return (
            <input
                id={elem.nev}
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => kezelesInput(elem.nev, e.target.files[0])}
                style={{ marginLeft: "5px"}}
            />
        )
    } else if (elem.tipus === "datetime-local") {
        return (
            <input
                id={elem.nev}
                type="datetime-local"
                className="form-control"
                value={adatModFel[elem.nev] ? adatModFel[elem.nev].slice(0, 16) : ""} 
                onChange={(e) => kezelesInput(elem.nev, e.target.value)}
            />
        )
    } else {
        return (
            <input
                id={elem.nev}
                type="text"
                className="form-control"
                value={adatModFel[elem.nev] || ""}
                onChange={(e) => kezelesInput(elem.nev, e.target.value)}
            />
        )
    }
}

export const mezoValidalas = (adatModFel, mezo, modositas = false) => {
    if (adatModFel === undefined || adatModFel === null) {
        return false
    }

    let kulcs = mezo.nev
        let ertek = adatModFel[kulcs];
        if (modositas && mezo.tipus === "file") {
            return true;
        }
        return ertek !== "" && ertek !== undefined && ertek !== null
}

export default BeviteliMezo