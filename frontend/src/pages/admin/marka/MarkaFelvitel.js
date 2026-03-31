import { useState } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import BeviteliMezo from "../../../components/BeviteliMezo"
import { validalas } from "../../../utils/validalas";
import "./Marka.css"
import Cim from "../../../Cim"

const MarkaFelvitel= ({  onClose }) => {
    const mezok = [{nev: "marka_nev", tipus: "input", megjelenit: "Márka név", kotelezo: true}]
    const [felvittAdat, setFelvittAdat] = useState({})
    const kezelesInput = (kulcs, ertek) => {
        setFelvittAdat(prev => ({
            ...prev,
            [kulcs]: ertek
        }))
    }

    const felvittFuggveny = async () => {
        try {
            validalas(felvittAdat, mezok)
        } catch (error) {
            if (error.name === "ValidationError") {
                alert(error.message)
                return
            } else {
                alert("Hiba történt a validálás során!")
                return
            }
        }

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
                        <label className="form-label" htmlFor={elem.nev}>{elem.megjelenit}:</label>
                    </div>
                    <div className="col-sm-8">
                        <BeviteliMezo elem={elem} adatModFel={felvittAdat} kezelesInput={kezelesInput}/>
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