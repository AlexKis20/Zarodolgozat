import { useState, useEffect } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import BeviteliMezo from "../../../components/BeviteliMezo"
import { validalas } from "../../../utils/validalas";
import Cim from "../../../Cim"

const RendelesModosit = ({ rendeles_id, onClose }) => {
    const [modositottAdat, setModositottAdat] = useState({})
    const mezok = [
        { nev: "rendeles_nev", tipus: "input", megjelenit: "Rendelő neve", kotelezo: true },
        { nev: "rendeles_cim", tipus: "input", megjelenit: "Szállítási cím", kotelezo: true },
        { nev: "rendeles_telefonszam", tipus: "input", megjelenit: "Telefonszám", kotelezo: true, formatum: "phone" }
    ]
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)

    useEffect(() => {
        const leToltes = async () => {
            try {
                const response = await fetch(Cim.Cim + "/rendeles/" + rendeles_id)
                const data = await response.json()

                if (response.ok) {
                    setModositottAdat(data)
                    setTolt(false)
                } else {
                    setHiba(true)
                    setTolt(false)
                }
            } catch (error) {
                console.log(error)
                setHiba(true)
                setTolt(false)
            }
        }
        leToltes()
    }, [rendeles_id])

    const kezelesInput = (kulcs, ertek) => {
        setModositottAdat(prev => ({
            ...prev,
            [kulcs]: ertek
        }))
    }

    const modositFuggveny = async () => {
        try {
            validalas(modositottAdat, mezok, true)
        } catch (error) {
            if (error.name === "ValidationError") {
                alert(error.message)
                return
            } else {
                alert("Hiba történt a validálás során!")
                return
            }
        }

        const biztos = window.confirm(`Biztosan módosítani szeretnéd ezt a rendelést?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/rendelesModosit/" + rendeles_id, {
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

    if (tolt) return <div className="text-center">Betöltés...</div>
    if (hiba) return <div className="text-center">Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Rendelés módosítása</h4>
                </div>
            </div>

            {mezok.map((elem, index) => (
                <div className="row mb-2 align-items-center" key={index}>
                    <div className="col-sm-4">
                        <label className="form-label" htmlFor={elem.nev}>{elem.megjelenit}:</label>
                    </div>
                    <div className="col-sm-8">
                        <BeviteliMezo elem={elem} adatModFel={modositottAdat} kezelesInput={kezelesInput}/>
                    </div>
                </div>
            ))}

            <div className="row mt-3">
                <div className="col">
                    <button className="btn" onClick={modositFuggveny}>
                        <FaSave /> Mentés
                    </button>
                </div>
                <div className="col text-end">
                    <button className="btn" onClick={() => onClose(false)}>
                        <IoCloseSharp /> Bezárás
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RendelesModosit
