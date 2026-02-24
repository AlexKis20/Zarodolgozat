import { useState } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import "./Termek.css"
import BeviteliMezo from "../../../components/BeviteliMezo"
import { mezoValidalas } from "../../../components/BeviteliMezo"
import Cim from "../../../Cim"

const TermekFelvitel = ({ onClose, markak, tipusok }) => {
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
        {nev: "termek_marka", tipus: "select", opciok: {lista: markak, id_mezo: "marka_id", nev_mezo: "marka_nev"}, megjelenit: "Termék márka:"},
        {nev: "termek_tipus", tipus: "select", opciok: {lista: tipusok, id_mezo: "tipus_id", nev_mezo: "tipus_nev"}, megjelenit: "Termék típus:"},
        {nev: "termek_kep", tipus: "file", megjelenit: "Termék kép:"},
    ]

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
            if (!mezok.every(mezo => mezoValidalas(felvittAdat, mezo))) {
                alert("Minden mezőt ki kell tölteni!")
                return
            }

            const formData = new FormData()
            formData.append("termek_nev", felvittAdat.termek_nev)
            formData.append("termek_ar", felvittAdat.termek_ar)
            formData.append("termek_szin", felvittAdat.termek_szin)
            formData.append("termek_kijelzo", felvittAdat.termek_kijelzo)
            formData.append("termek_processzor", felvittAdat.termek_processzor)
            formData.append("termek_kapacitas", felvittAdat.termek_kapacitas)
            formData.append("termek_oprendszer", felvittAdat.termek_oprendszer)
            formData.append("termek_meret", felvittAdat.termek_meret)
            formData.append("termek_leiras", felvittAdat.termek_leiras)
            formData.append("termek_marka", felvittAdat.termek_marka)
            formData.append("termek_tipus", felvittAdat.termek_tipus)
            
            if (felvittAdat.termek_kep instanceof File) {
                formData.append("termek_kep", felvittAdat.termek_kep)
            } else {
                alert("Hibás kép fájl!")
                return
            }

            const response = await fetch(Cim.Cim + "/termekHozzaad", {
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
                    <h4>Termék felvitele</h4>
                </div>
            </div>

            {mezok.map((elem, index) => (
                <div className="row mb-2 align-items-center" key={index}>
                    <div className="col-sm-4">
                        <label className="form-label" htmlFor={elem.nev}>{elem.megjelenit}</label>
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

export default TermekFelvitel