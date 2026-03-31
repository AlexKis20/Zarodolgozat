import { useState } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import "./Tipus.css"
import BeviteliMezo from "../../../components/BeviteliMezo"
import { validalas } from "../../../utils/validalas";
import Cim from "../../../Cim"

const TipusFelvitel= ({  onClose }) => {
    const mezok= [{nev: "tipus_nev", tipus: "input", megjelenit: "Típus név", kotelezo: true}]
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

        const biztos = window.confirm(`Biztosan hozzá szeretnéd adni a(z) ${felvittAdat.tipus_nev} típust?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/tipusHozzaad", {
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
                    <h4>Típus felvitele</h4>
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

export default TipusFelvitel