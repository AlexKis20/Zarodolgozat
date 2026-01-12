import { useState, useEffect } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import "./Termek.css"
import Cim from "../../../components/Cim"

const TermekModosit= ({ termek_id, onClose, markak, tipusok }) => {
    const [modositottAdat, setModositottAdat] = useState({})
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
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/termek/" + termek_id)
            const data = await response.json()

            if (response.ok) {
                setModositottAdat(data)
                console.log(data)
                setTolt(false)
            } else {
                setHiba(true)
                setTolt(false)
            }
        } catch (error) {
            console.log(error)
            setHiba(true)
        }
    }

    useEffect(() => {
        leToltes()
    }, [termek_id])

    const kezelesInput = (kulcs, ertek) => {
        setModositottAdat(prev => ({
            ...prev,
            [kulcs]: ertek
        }))
    }

    const modositFuggveny = async () => {
        const biztos = window.confirm(`Biztosan módosítani szeretnéd a(z) ${modositottAdat.termek_nev} termékét?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/termekModosit/" + termek_id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(modositottAdat)
            })

            const data = await response.json()

            if (response.ok) {
                alert(data.message || "Sikeres módosítás!")
                onClose(true)
            } else {
                alert(data.error || "Hiba történt a módosítás során!")
            }
        }
    }

    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>

    const bevitelMezo = (elem) => {
        if (elem.tipus === "textarea") {
            return (
                <textarea
                    id={elem.nev}
                    className="form-control"
                    value={modositottAdat[elem.nev] || ""}
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
                    value={modositottAdat[elem.nev] || ""}
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
                    value={modositottAdat[elem.nev] || ""}
                    onChange={(e) => kezelesInput(elem.nev, e.target.value)}
                />
            )
        }
    }

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Termék módosítása</h4>
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
                    <button className="btn ml-2" onClick={modositFuggveny}>
                        <FaSave /> Mentés
                    </button>
                    <button className="btn ml-2" onClick={() => onClose(false)}>
                        <IoCloseSharp />Bezárás
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TermekModosit