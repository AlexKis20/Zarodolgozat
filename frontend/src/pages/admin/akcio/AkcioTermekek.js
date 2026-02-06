import { useState, useEffect } from "react"
import { IoCloseSharp } from "react-icons/io5";
import Cim from "../../../components/Cim"
import Kereses from "../../../components/Kereses";

const AkcioTermekek= ({ akcio_id, akcio_kedvezmeny, akcio_tipus, onClose }) => {
    const [adatok, setAdatok] = useState({})
    const [keresettAdatok, setKeresettAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/akcioTermekek/" + akcio_id)
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
    }, [akcio_id])

    const kedvezmenyesArSzamitas = (ar) => {
        if (akcio_tipus === "szazalek") {
            return ar - (ar * (akcio_kedvezmeny / 100))
        } else {
            return ar - akcio_kedvezmeny
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
                    <h4>Akció termékek</h4>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12 text-center">
                    <Kereses adatok={adatok} keresettMezok={["termek_nev"]} setKeresettAdatok={setKeresettAdatok} />
                </div>
            </div>

            <div className="row justify-content-center mb-3">
                <div className="col-sm-3 text-center fw-bold">Termék név</div>
                <div className="col-sm-3 text-center fw-bold">Eredeti ár</div>
                <div className="col-sm-3 text-center fw-bold">Kedvezményes ár</div>
                <div className="col-sm-3 text-center fw-bold">Kedvezmény</div>
            </div>

            {keresettAdatok.map((elem, index) => (
                <div className="row justify-content-center mb-3" key={index}>
                    <div className="col-sm-3 text-center">{elem.termek_nev}</div>
                    <div className="col-sm-3 text-center">{elem.termek_ar} Ft</div>
                    <div className="col-sm-3 text-center">{kedvezmenyesArSzamitas(elem.termek_ar)} Ft</div>
                    <div className="col-sm-3 text-center">{akcio_tipus === "szazalek" ? akcio_kedvezmeny + "%" : akcio_kedvezmeny + " Ft"} </div>
                </div>
            ))}

            <div className="row mt-3">
                <div className="col">
                    <button className="text-end" onClick={() => onClose(false)}>
                        <IoCloseSharp />Bezárás
                    </button>
                </div>
            </div>
        </div>
    )
}


export default AkcioTermekek