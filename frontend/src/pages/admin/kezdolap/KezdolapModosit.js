import { useState, useEffect } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { mezoValidalas } from "../../../components/BeviteliMezo"
import BeviteliMezo from "../../../components/BeviteliMezo"
import Cim from "../../../Cim"

const  KezdolapModosit= ({ kezdolap_id, fajtak, onClose }) => {
    const mezok = [
        {nev: "kezdolap_cim", tipus: "input", megjelenit: "Kezdőlap cím:"},
        {nev: "kezdolap_szoveg", tipus: "textarea", megjelenit: "Kezdőlap szöveg:"},
        {nev: "kezdolap_fajta", tipus: "select", opciok: {lista: fajtak, id_mezo: "fajta_id", nev_mezo: "fajta_nev"}, megjelenit: "Kezdőlap fajta:"},
        {nev: "kezdolap_kep", tipus: "file", megjelenit: "Kezdőlap kép:"}
    ]
    const [modositottAdat, setModositottAdat] = useState({})
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)

    useEffect(() => {
        const leToltes = async () => {
            try {
                const response = await fetch(Cim.Cim + "/kezdolap/" + kezdolap_id)
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
    }, [kezdolap_id])

    const kezelesInput = (kulcs, ertek) => {
        setModositottAdat(prev => ({
            ...prev,
            [kulcs]: ertek
        }))
    }

    const modositFuggveny = async () => {
        const biztos = window.confirm(`Biztosan módosítani szeretnéd a(z) ${modositottAdat.kezdolap_cim} kezdőlapot?`)

        if (biztos) {
            if (!mezok.every(mezo => mezoValidalas(modositottAdat, mezo, true))) {
                alert("Minden mezőt ki kell tölteni!")
                return
            }

            const formData = new FormData()
            formData.append("kezdolap_cim", modositottAdat.kezdolap_cim)
            formData.append("kezdolap_szoveg", modositottAdat.kezdolap_szoveg)
            formData.append("kezdolap_fajta", modositottAdat.kezdolap_fajta)
            
            if (modositottAdat.kezdolap_kep instanceof File) {
                formData.append("kezdolap_kep", modositottAdat.kezdolap_kep)
            }

            const response = await fetch(Cim.Cim + "/kezdolapModosit/" + kezdolap_id, {
                method: "PUT",
                body: formData
            })

            const data = await response.json()

            if (response.ok) {
                alert(data.message || "Sikeres módosítás!")
                onClose(true)
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
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Kezdőlap módosítása</h4>
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

export default KezdolapModosit

