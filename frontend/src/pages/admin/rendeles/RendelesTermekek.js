import { useState, useEffect } from "react"
import { IoCloseSharp } from "react-icons/io5";
import Cim from "../../../components/Cim"
import Kereses from "../../../components/Kereses";

const RendelesTermekek= ({ rendeles_id, onClose }) => {
    const [adatok, setAdatok] = useState({})
    const [keresettAdatok, setKeresettAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/rendelesTermekek/" + rendeles_id)
            const data = await response.json()

            if (response.ok) {
                setAdatok(data)
                setKeresettAdatok(data)
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

    useEffect(() => {
        leToltes()
    }, [rendeles_id])

    const osszArSzamitas = () => {
        let osszeg = 0
        for (let elem of adatok) {
            osszeg += elem.rendeles_ar * elem.rendeles_darab
        }
        return osszeg
    }

    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Akció termékek</h4>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12 text-center">
                    <Kereses adatok={adatok} keresettMezok={["termek_nev"]} setKeresettAdatok={setKeresettAdatok} />
                </div>
            </div>

            <div className="row justify-content-center mb-3">
                <div className="col-8 text-center fw-bold">Termék név</div>
                <div className="col-2 text-center fw-bold">Darabszám</div>
                <div className="col-2 text-center fw-bold">Rendelési ár</div>
            </div>

            {keresettAdatok.map((elem, index) => (
                <div className="row justify-content-center mb-3" key={index}>
                    <div className="col-8 text-start">{elem.termek_nev}</div>
                    <div className="col-2 text-center">{elem.rendeles_darab}</div>
                    <div className="col-2 text-center">{elem.rendeles_ar} Ft</div>
                </div>
            ))}

            <div className="row mt-3">
                <div className="col-6 text-start">
                    <h4>Teljes ár:</h4>
                </div>
                <div className="col-6 text-end">
                    <h4>{osszArSzamitas()} Ft</h4>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <button className="btn ml-2" onClick={() => onClose(false)}>
                        <IoCloseSharp />Bezárás
                    </button>
                </div>
            </div>
        </div>
    )
}


export default RendelesTermekek