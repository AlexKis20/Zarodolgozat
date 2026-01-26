import { useState, useEffect } from "react"
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import Cim from "../../../components/Cim"
import Modal from "../../../components/Modal"
import RendelesModosit from "./RendelesModosit"
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";

const Rendeles = () => {
    const [adatok, setAdatok] = useState([])
    const [keresettAdatok, setKeresettAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)
    const [modalOpenModosit, setModalOpenModosit] = useState(false)
    const [selectedRendelesId, setSelectedRendelesId] = useState(null)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/rendeles")
            const data = await response.json()
    
            if (response.ok) {
                setAdatok(data)
                setKeresettAdatok(data)
                setTolt(false)
            } 
            else if (response.status === 404) {
                setUres(true)
                setTolt(false)
            }
            else {
                setHiba(true)
                setTolt(false)
            }
        } catch (error) {
            console.log(error)
            setHiba(true)
            setTolt(false)
        }
    }

    useEffect(() => {
        leToltes()
    }, [siker])

    const torlesFuggveny = async (rendeles_id) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd ezt a rendelést?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/rendelesTorles/" + rendeles_id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })

            const data = await response.json()

            if (response.ok) {
                alert(data["message"])
                setSiker(prev => !prev)
            } else {
                alert(data["error"])
            }
        }
    }

    const openModalModosit = (rendeles_id) => {
        setSelectedRendelesId(rendeles_id)
        setModalOpenModosit(true)
    }

    const closeModalModosit = (frissit) => {
        setModalOpenModosit(false)
        setSelectedRendelesId(null)
        if (frissit) {
            leToltes()
        }
    }

    const teljesitPipa = async (rendeles_id) => {
        let adat = adatok.find(elem => elem.rendeles_id === rendeles_id)
        adat.rendeles_teljesitve = adat.rendeles_teljesitve === 1 ? 0 : 1
        setAdatok(adatok.map(elem => elem.rendeles_id === rendeles_id ? adat : elem))

        await fetch(Cim.Cim + "/rendelesModosit/" + rendeles_id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(adat)
        })
    }

    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>
    if (ures)
        return (
            <div className="container">
                <div className="row justify-content-center mb-3">
                    <div className="col-12 text-center">Nincs bejövő rendelés.</div>
                </div>
            </div>
        )

    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container">
            <div className="row justify-content-center mb-3">
                <div className="col-6 text-center">
                    <Kereses adatok={adatok} keresettMezok={["rendeles_nev"]} setKeresettAdatok={setKeresettAdatok} />
                </div>
                <div className="col-4 text-center">
                    <Rendezes adatok={keresettAdatok} setKeresettAdatok={setKeresettAdatok}>
                        <option value="0" disabled hidden>Rendezés</option>
                        <option value="rendeles_datum|1">Dátum növekvő</option>
                        <option value="rendeles_datum|2">Dátum csökkenő</option>
                    </Rendezes>
                </div>
            </div>
            <div className="row justify-content-center mb-3">
                <div className="col-2 text-center fw-bold">Név</div>
                <div className="col-2 text-center fw-bold">Cím</div>
                <div className="col-2 text-center fw-bold">Dátum</div>
                <div className="col-1 text-center fw-bold">Teljesített</div>
                <div className="col-1 text-center fw-bold">Törlés</div>
                <div className="col-1 text-center fw-bold">Módosítás</div>
            </div>
            {keresettAdatok.map((elem, index) => (
                <div className="row justify-content-center mb-3" key={elem.rendeles_id || index}>
                    <div className="col-2 text-center">{elem.rendeles_nev}</div>
                    <div className="col-2 text-center">{elem.rendeles_cim}</div>
                    <div className="col-2 text-center">{new Date(elem.rendeles_datum).toLocaleString('hu-HU')}</div>
                    <div className="col-1 text-center">
                        <input 
                            type="checkbox" 
                            checked={elem.rendeles_teljesitve === 1}
                            onChange={() => teljesitPipa(elem.rendeles_id)}
                        />
                    </div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-danger ml-2"
                            onClick={() => torlesFuggveny(elem.rendeles_id)}
                        >
                            <FaRegTrashCan />
                        </button>
                    </div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-alert ml-2"
                            onClick={() => openModalModosit(elem.rendeles_id)}
                        >
                            <FaPencil />
                        </button>
                    </div>
                </div>
            ))}
            <Modal isOpen={modalOpenModosit} onClose={() => closeModalModosit(false)}>
                <RendelesModosit rendeles_id={selectedRendelesId} onClose={closeModalModosit} />
            </Modal>
        </div>
    )
}

export default Rendeles
