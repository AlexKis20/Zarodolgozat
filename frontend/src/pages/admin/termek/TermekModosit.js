import { useState, useEffect } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import "./Termek.css"
import BeviteliMezo from "../../../components/BeviteliMezo"
import { mezoValidalas } from "../../../components/BeviteliMezo"
import Cim from "../../../Cim"

const TermekModosit= ({ termek_id, onClose, markak, tipusok }) => {
    const [modositottAdat, setModositottAdat] = useState({})
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
        {nev: "termek_kep", tipus: "file", megjelenit: "Termék kép:"}
    ]
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)

    useEffect(() => {
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
            if (!mezok.every(mezo => mezoValidalas(modositottAdat, mezo, true))) {
                alert("Minden mezőt ki kell tölteni!")
                return
            }

            const formData = new FormData()
            formData.append("termek_nev", modositottAdat.termek_nev)
            formData.append("termek_ar", modositottAdat.termek_ar)
            formData.append("termek_szin", modositottAdat.termek_szin)
            formData.append("termek_kijelzo", modositottAdat.termek_kijelzo)
            formData.append("termek_processzor", modositottAdat.termek_processzor)
            formData.append("termek_kapacitas", modositottAdat.termek_kapacitas)
            formData.append("termek_oprendszer", modositottAdat.termek_oprendszer)
            formData.append("termek_meret", modositottAdat.termek_meret)
            formData.append("termek_leiras", modositottAdat.termek_leiras)
            formData.append("termek_marka", modositottAdat.termek_marka)
            formData.append("termek_tipus", modositottAdat.termek_tipus)
            
            if (modositottAdat.termek_kep instanceof File) {
                formData.append("termek_kep", modositottAdat.termek_kep)
            }

            const response = await fetch(Cim.Cim + "/termekModosit/" + termek_id, {
                method: "PUT",
                body: formData
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
        return <div className="text-center">Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div className="text-center">Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Termék módosítása</h4>
                </div>
            </div>

            {mezok.map((elem, index) => (
                <div className="row mb-2 align-items-center" key={index}>
                    <div className="col-sm-4">
                        <label className="form-label" htmlFor={elem.nev}>{elem.megjelenit}</label>
                    </div>
                    <div className="col-sm-8">
                        <BeviteliMezo elem={elem} adatModFel={modositottAdat} kezelesInput={kezelesInput}/>
                    </div>
                </div>
            ))}

            <div className="row mt-3">
                <div className="col">
                    <button className="btn" onClick={modositFuggveny}>
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

export default TermekModosit