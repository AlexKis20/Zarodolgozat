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
                {elem.opciok.lista && elem.opciok.lista.map((opcio) => (
                    <option key={opcio[elem.opciok.id_mezo]} value={opcio[elem.opciok.id_mezo]}>
                        {opcio[elem.opciok.nev_mezo]}
                    </option>
                ))}
            </select>
        )
    } else if (elem.tipus === "file") {
        let displayName = "";
        if (adatModFel[elem.nev]) {
            if (adatModFel[elem.nev] instanceof File) {
                displayName = adatModFel[elem.nev].name;
            } else if (typeof adatModFel[elem.nev] === "string") {
                displayName = adatModFel[elem.nev].split("/").pop();
            }
        }
        
        return (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <label
                    htmlFor={elem.nev}
                    className="btn btn-outline-secondary"
                    style={{ cursor: "pointer", margin: 0, whiteSpace: "nowrap", minWidth: "130px" }}
                >
                    Fájl kiválasztása
                </label>
                <input
                    id={elem.nev}
                    type="file"
                    accept="image/*"
                    onChange={(e) => kezelesInput(elem.nev, e.target.files[0])}
                    style={{ display: "none" }}
                />
                <input
                    type="text"
                    className="form-control"
                    value={displayName}
                    readOnly
                    style={{ marginLeft: "0px" }}
                    placeholder="Nincs kiválasztva fájl..."
                />
            </div>
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
    } else if (elem.tipus === "checkbox") {
        return (
            <input 
                type="checkbox" 
                checked={adatModFel[elem.nev] || false}
                onChange={(e) => kezelesInput(elem.nev, e.target.checked)}
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