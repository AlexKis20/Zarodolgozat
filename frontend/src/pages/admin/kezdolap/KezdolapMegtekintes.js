import { useState, useEffect } from "react"
import { IoCloseSharp } from "react-icons/io5";
import Cim from "../../../Cim"

const KezdolapMegtekintes = ({ kezdolap_id, onClose, fajtak }) => {
    const [adat, setAdat] = useState({})
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [fajtaNev, setFajtaNev] = useState("")

    useEffect(() => {
        const leToltes = async () => {
            try {
                const response = await fetch(Cim.Cim + "/kezdolap/" + kezdolap_id)
                const data = await response.json()

                if (response.ok) {
                    setAdat(data)
                    setTolt(false)
                } else {
                    setHiba(true)
                    setTolt(false)
                }
            } catch (error) {
                console.log(error)
                setHiba(true)
                setTolt(false)
            }
        }
        leToltes()
        setFajtaNev(fajtak.find(f => f.fajta_id === adat.kezdolap_fajta)?.fajta_nev || "")
    }, [kezdolap_id, fajtak, adat.kezdolap_fajta])

    if (tolt)
        return <div className="text-center">Adat betöltése folyamatban...</div>
    if (hiba)
        return <div className="text-center">Hiba történt az adat betöltése közben.</div>

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Kezdőlap adatok</h4>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-6">
                    <strong>Kezdőlap cím:</strong>
                </div>
                <div className="col-6">
                    {adat.kezdolap_cim}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-6">
                    <strong>Kezdőlap szöveg:</strong>
                </div>
                <div className="col-6">
                    {adat.kezdolap_szoveg}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-6">
                    <strong>Kezdőlap fajta:</strong>
                </div>
                <div className="col-6">
                    {fajtaNev}
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-6">
                    <strong>Kezdőlap kép:</strong>
                </div>
                <div className="col-6">
                    {adat.kezdolap_kep}
                </div>
            </div>
            <div className="row mb-3">
                <div className="offset-6 col-3 text-center">
                    <img src={`${Cim.Cim}/kezdolapKep/${adat.kezdolap_kep}`} alt="Kezdőlap kép" className="img-fluid" />
                </div>
            </div>

            <div className="row mt-3">
                <div className="col text-end">
                    <button className="btn" onClick={() => onClose(false)}>
                        <IoCloseSharp />Bezárás
                    </button>
                </div>
            </div>
        </div>
    )
}

export default KezdolapMegtekintes