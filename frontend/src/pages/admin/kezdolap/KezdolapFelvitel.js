import { useState } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import BeviteliMezo from "../../../components/BeviteliMezo"
import { validalas } from "../../../utils/validalas";
import Cim from "../../../Cim"

const KezdolapFelvitel= ({ fajtak, onClose }) => {
    const mezok = [
        {nev: "kezdolap_cim", tipus: "input", megjelenit: "Kezdőlap cím", kotelezo: true},
        {nev: "kezdolap_szoveg", tipus: "textarea", megjelenit: "Kezdőlap szöveg", kotelezo: true},
        {nev: "kezdolap_fajta", tipus: "select", opciok: {lista: fajtak, id_mezo: "fajta_id", nev_mezo: "fajta_nev"}, megjelenit: "Kezdőlap fajta", kotelezo: true},
        {nev: "kezdolap_kep", tipus: "file", megjelenit: "Kezdőlap kép", kotelezo: true}
    ]
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

        const biztos = window.confirm(`Biztosan hozzá szeretnéd adni a(z) ${felvittAdat.kezdolap_cim} kezdőlapot?`)

        if (biztos) {
            const formData = new FormData()
            formData.append("kezdolap_cim", felvittAdat.kezdolap_cim)
            formData.append("kezdolap_szoveg", felvittAdat.kezdolap_szoveg)
            formData.append("kezdolap_fajta", felvittAdat.kezdolap_fajta)

            if (felvittAdat.kezdolap_kep instanceof File) {
                formData.append("kezdolap_kep", felvittAdat.kezdolap_kep)
            }

            const response = await fetch(Cim.Cim + "/kezdolapHozzaad", {
                method: "POST",
                body: formData
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
                    <h4>Kezdőlap felvitele</h4>
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

export default KezdolapFelvitel

