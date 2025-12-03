import { useState, useEffect } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import "./Marka.css"
import Cim from "../../../components/Cim"

const MarkaFelvitel= ({  onClose }) => {
    const mezok = ["marka_nev"]
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
                onClose()
            } else {
                alert(data.error || "Hiba történt a hozzáadás során!")
            }
        }
    }

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Márka felvétele</h4>
                </div>
            </div>

            {mezok.map((elem, index) => (
                <div className="row mb-2 align-items-center" key={index}>
                    <div className="col-sm-4">
                        <label className="form-label" htmlFor={elem}>{elem}</label>
                    </div>
                    <div className="col-sm-8">
                        <input
                            id={elem}
                            type="text"
                            className="form-control"
                            value={felvittAdat[elem] || ""}
                            onChange={(e) => kezelesInput(elem, e.target.value)}
                        />
                    </div>
                </div>
            ))}

            <div className="row mt-3">
                <div className="col">
                    <button className="btn ml-2" onClick={felvittFuggveny}>
                        <FaSave /> Mentés
                    </button>
                    <button className="btn ml-2" onClick={onClose}>
                        <IoCloseSharp /> Bezárás
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MarkaFelvitel