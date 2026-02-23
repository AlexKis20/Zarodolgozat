import { useState } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { mezoValidalas } from "../../../components/BeviteliMezo"
import BeviteliMezo from "../../../components/BeviteliMezo"
import Cim from "../../../Cim"

const KezdolapFelvitel= ({ fajtak, onClose }) => {
    const mezok = [
        {nev: "blog_cim", tipus: "input", megjelenit: "Kezdőlap cím:"},
        {nev: "blog_szoveg", tipus: "textarea", megjelenit: "Kezdőlap szöveg:"},
        {nev: "blog_fajta", tipus: "select", opciok: {lista: fajtak, id_mezo: "fajta_id", nev_mezo: "fajta_nev"}, megjelenit: "Kezdőlap fajta:"},
        {nev: "blog_kep", tipus: "file", megjelenit: "Kezdőlap kép:"}
    ]
    const [felvittAdat, setFelvittAdat] = useState({})
    const kezelesInput = (kulcs, ertek) => {
        setFelvittAdat(prev => ({
            ...prev,
            [kulcs]: ertek
        }))
    }

    const felvittFuggveny = async () => {
        const biztos = window.confirm(`Biztosan hozzá szeretnéd adni a(z) ${felvittAdat.blog_cim} kezdőlapot?`)

        if (biztos) {
            if (!mezok.every(mezo => mezoValidalas(felvittAdat, mezo))) {
                alert("Minden mezőt ki kell tölteni!")
                return
            }

            const formData = new FormData()
            formData.append("blog_cim", felvittAdat.blog_cim)
            formData.append("blog_szoveg", felvittAdat.blog_szoveg)
            formData.append("blog_fajta", felvittAdat.blog_fajta)

            if (felvittAdat.blog_kep instanceof File) {
                formData.append("blog_kep", felvittAdat.blog_kep)
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

export default KezdolapFelvitel

