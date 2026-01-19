import { useState, useEffect } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import "./Marka.css"
import Cim from "../../../components/Cim"

const MarkaFelvitel= ({  onClose }) => {
    const mezok = [{nev: "marka_nev", tipus: "input", megjelenit: "Márka név:"}]
    const [felvittAdat, setFelvittAdat] = useState({})
    const kezelesInput = (kulcs, ertek) => {
        setFelvittAdat(prev => ({
            ...prev,
            [kulcs]: ertek
        }))
    }

    const felvittFuggveny = async () => {
        const biztos = window.confirm(`Biztosan hozzá szeretnéd adni a(z) ${felvittAdat.marka_nev} márkát?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/markaHozzaad", {
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
        }
    }

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Márka felvitele</h4>
                </div>
            </div>

            {mezok.map((elem, index) => (
                <div className="row mb-2 align-items-center" key={index}>
                    <div className="col-sm-4">
                        <label className="form-label" htmlFor={elem.nev}>{elem.megjelenit}</label>
                    </div>
                    <div className="col-sm-8">
                        <input
                            id={elem.nev}
                            type="text"
                            className="form-control"
                            value={felvittAdat[elem.nev] || ""}
                            onChange={(e) => kezelesInput(elem.nev, e.target.value)}
                        />
                    </div>
                </div>
            ))}

            <div className="row mt-3">
                <div className="col">
                    <button className="btn" onClick={felvittFuggveny}>
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

export default MarkaFelvitel