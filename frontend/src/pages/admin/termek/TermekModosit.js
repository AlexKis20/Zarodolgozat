import { useState, useEffect } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import "./Termek.css"
import Cim from "../../../components/Cim"

const TermekModosit= ({ termek_id, onClose }) => {
    const [modositottAdat, setModositottAdat] = useState({})
       const mezokMegjelenik = ["Termék név:", "Termék ár:", "Termék szín:", "Termék kijelző:", "Termék processzor:", "Termék kapacitás:", "Termék oprendszer:",
        "Termék méret:", "Termék leírás:", "Termék kép:", "Termék márka:", "Termék típus:"]
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

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Termék módosítása</h4>
                </div>
            </div>

            {Object.keys(modositottAdat).map((elem, index) => (
                <div className="row mb-2 align-items-center" key={index}>
                    <div className="col-sm-4">
                        <label className="form-label" htmlFor={elem}>{mezokMegjelenik[index]}</label>
                    </div>
                    <div className="col-sm-8">
                        <input
                            id={elem}
                            type="text"
                            className="form-control"
                            value={modositottAdat[elem] || ""} 
                            onChange={(e) => kezelesInput(elem, e.target.value)}
                        />
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