import { useState, useEffect } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import "./Termek.css"
import Cim from "../../../components/Cim"

const TermekModosit= ({ termek_id, onClose }) => {
    const [modositottAdat, setModositottAdat] = useState({})
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
            const response = await fetch(Cim.Cim + "/termekModosit/" + modositottAdat.termek_id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(modositottAdat)
            })

            const data = await response.json()

            if (response.ok) {
                alert(data.message || "Sikeres módosítás!")
                onClose()
            } else {
                alert(data.error || "Hiba történt a módosítás során")
            }
        }
    }

    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Termék neve</th>
                        <th>Módosítás</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(modositottAdat).map((elem, index) => (
                        <tr key={index}>
                            <td>{elem}</td>
                            <td>
                                <input 
                                    type="text" 
                                    value={modositottAdat[elem] || ""} 
                                    onChange={(e) => kezelesInput(elem, e.target.value)}
                                    style={{ width: "100%", padding: "5px" }}
                                />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <button className="btn ml-2"
                    onClick={modositFuggveny}
            >
                <FaSave /> Mentés
            </button>
            <button className="btn ml-2" onClick={onClose}>
                <IoCloseSharp />Bezárás
            </button>
        </div>
    )
}

export default TermekModosit