import { useState } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import "./Termek.css"
import Cim from "../../../components/Cim"

const TermekFelvitel = ({ onClose }) => {
    const mezok = ["termek_nev", "termek_ar", "termek_szin", "termek_kijelzo", "termek_processzor", "termek_kapacitas", "termek_oprendszer",
        "termek_meret", "termek_leiras", "termek_kep", "termek_marka", "termek_tipus"]

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
                    onClose()
                } else {
                    alert(data.error || "Hiba történt a hozzáadás során!")
                }
            } catch (err) {
                alert("Hálózati hiba: " + err.message)
            }
        }
    }

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Termék felvétele</h4>
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

export default TermekFelvitel