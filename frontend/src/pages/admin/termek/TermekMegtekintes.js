import { useState, useEffect } from "react"
import { IoCloseSharp } from "react-icons/io5";
import Cim from "../../../Cim"
import { arFuggveny } from "../../../utils/formazas";

const TermekMegtekintes = ({ termek_id, onClose }) => {
    const [adat, setAdat] = useState({})
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [termekAdatok, setTermekAdatok] = useState([])

    useEffect(() => {
        const leToltes = async () => {
            try {
                const response = await fetch(Cim.Cim + "/termek/" + termek_id)
                const data = await response.json()

                if (response.ok) {
                    setAdat(data)
                    setTolt(false)
                } else {
                    setHiba(true)
                    setTolt(false)
                }

                setTermekAdatok(() => [
                    { label: "Termék neve", value: data.termek_nev },
                    { label: "Ár", value: `${arFuggveny(data.termek_ar)} Ft` },
                    { label: "Szín", value: data.termek_szin },
                    { label: "Kijelző", value: data.termek_kijelzo },
                    { label: "Processzor", value: data.termek_processzor },
                    { label: "Kapacitás", value: data.termek_kapacitas },
                    { label: "Operációs rendszer", value: data.termek_oprendszer },
                    { label: "Méret", value: data.termek_meret },
                    { label: "Leírás", value: data.termek_leiras },
                    { label: "Kép", value: data.termek_kep },
                ])
            } catch (error) {
                console.log(error)
                setHiba(true)
                setTolt(false)
            }
        }
        leToltes()
    }, [termek_id])

    if (tolt)
        return <div className="text-center">Adat betöltése folyamatban...</div>
    if (hiba)
        return <div className="text-center">Hiba történt az adat betöltése közben.</div>

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Termék adatok</h4>
                </div>
            </div>

            {termekAdatok.map((item, index) => (
                <>
                    {item.value && (
                        <div className="row mb-3" key={index}>
                            <div className="col-6">
                                <strong>{item.label}:</strong>
                            </div>
                            <div className="col-6">
                                {item.value}
                            </div>
                        </div>
                    )}
                </> 
            ))}

            <div className="row mb-3">
                <div className="offset-6 col-3 text-center">
                    <img src={`${Cim.Cim}/termekKep/${adat.termek_kep}`} alt="Termék kép" className="img-fluid" />
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

export default TermekMegtekintes