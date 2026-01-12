import { useState } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import "./Termek.css"
import Cim from "../../../components/Cim"

const TermekFelvitel = ({ onClose, markak, tipusok }) => {
    const mezok = [
        {nev: "termek_nev", tipus: "input", megjelenit: "Termék név:"},
        {nev: "termek_ar", tipus: "input", megjelenit: "Termék ár:"},
        {nev: "termek_szin", tipus: "input", megjelenit: "Termék szín:"},
        {nev: "termek_kijelzo", tipus: "input", megjelenit: "Termék kijelző:"},
        {nev: "termek_processzor", tipus: "input", megjelenit: "Termék processzor:"},
        {nev: "termek_kapacitas", tipus: "input", megjelenit: "Termék kapacitás:"},
        {nev: "termek_oprendszer", tipus: "input", megjelenit: "Termék oprendszer:"},
        {nev: "termek_meret", tipus: "textarea", megjelenit: "Termék méret:"},
        {nev: "termek_leiras", tipus: "textarea", megjelenit: "Termék leírás:"},
        {nev: "termek_kep", tipus: "input", megjelenit: "Termék kép:"},
        {nev: "termek_marka", tipus: "select", opciok: {lista: markak, id_mezo: "marka_id", nev_mezo: "marka_nev"}, megjelenit: "Termék márka:"},
        {nev: "termek_tipus", tipus: "select", opciok: {lista: tipusok, id_mezo: "tipus_id", nev_mezo: "tipus_nev"}, megjelenit: "Termék típus:"}
    ]

    const [felvittAdat, setFelvittAdat] = useState({})

    const kezelesInput = (kulcs, ertek) => {
        setFelvittAdat(prev => ({
            ...prev,
            [kulcs]: ertek
        }))
    }

    const felvittFuggveny = async () => {
        const nev = felvittAdat.termek_nev || "(ismeretlen)"
        const biztos = window.confirm(`Biztosan hozzá szeretnéd adni a(z) ${nev} terméket?`)

        if (biztos) {
            try {
                const response = await fetch(Cim.Cim + "/termekHozzaad", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(felvittAdat)
                })

                const data = await response.json()

                if (response.ok) {
                    alert(data.message || "Sikeres hozzáadás!")
                     onClose(true)
                } else {
                    alert(data.error || "Hiba történt a hozzáadás során!")
                }
            } catch (err) {
                alert("Hálózati hiba: " + err.message)
            }
        }
    }

    const bevitelMezo = (elem) => {
        if (elem.tipus === "textarea") {
            return (
                <textarea
                    id={elem.nev}
                    className="form-control"
                    value={felvittAdat[elem.nev] || ""}
                    rows="3"
                    onChange={(e) => kezelesInput(elem.nev, e.target.value)}
                />
            )
        } else if (elem.tipus === "select") {
            return (
                <select
                    id={elem.nev}
                    className="form-control"
                    onChange={(e) => kezelesInput(elem.nev, e.target.value)}
                    value={felvittAdat[elem.nev] || ""}
                >
                    {elem.opciok.lista.map((opcio) => (
                        <option key={opcio[elem.opciok.id_mezo]} value={opcio[elem.opciok.id_mezo]}>
                            {opcio[elem.opciok.nev_mezo]}
                        </option>
                    ))}
                </select>
            )
        } else {
            return (
                <input
                    id={elem.nev}
                    type="text"
                    className="form-control"
                    value={felvittAdat[elem.nev] || ""}
                    onChange={(e) => kezelesInput(elem.nev, e.target.value)}
                />
            )
        }
    }

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Termék felvitele</h4>
                </div>
            </div>

            {mezok.map((elem, index) => (
                <div className="row mb-2 align-items-center" key={index}>
                    <div className="col-sm-4">
                        <label className="form-label" htmlFor={elem.nev}>{elem.megjelenit}</label>
                    </div>
                    <div className="col-sm-8">
                        {bevitelMezo(elem)}
                    </div>
                </div>
            ))}

            <div className="row mt-3">
                <div className="col">
                    <button className="btn ml-2" onClick={felvittFuggveny}>
                        <FaSave /> Mentés
                    </button>
                    <button className="btn ml-2" onClick={() => onClose(false)}>
                        <IoCloseSharp /> Bezárás
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TermekFelvitel