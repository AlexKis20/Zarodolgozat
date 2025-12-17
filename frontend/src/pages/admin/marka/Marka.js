import { useState, useEffect } from "react"
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import Cim from "../../../components/Cim"
import Modal from "../../../components/Modal"
import MarkaModosit from "./MarkaModosit"
import MarkaFelvitel from "./MarkaFelvitel";
import { FaPlus } from "react-icons/fa";

const Marka = () => {
    const [adatok, setAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)
    const [modalOpenModosit, setModalOpenModosit] = useState(false)
    const [modalOpenHozzaad, setModalOpenHozzaad] = useState(false)
    const [selectedMarkaId, setSelectedMarkaId] = useState(null)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/marka")
            const data = await response.json()

            if (response.ok) {
                setAdatok(data)
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
        }
    }

    useEffect(() => {
        leToltes()
    }, [siker])


    const torlesFuggveny = async (marka_id, marka_nev) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${marka_nev} márkát?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/markaTorles/" + marka_id, {
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
    
    const openModalModosit = (marka_id) => {
        setSelectedMarkaId(marka_id)
        setModalOpenModosit(true)
    }

    const closeModalModosit = () => {
        setModalOpenModosit(false)
        setSelectedMarkaId(null)
    }

    const openModalHozzaad = () => {
        setModalOpenHozzaad(true)
    }

    const closeModalHozzaad = () => {
        setModalOpenHozzaad(false)
    }


    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>
    if (ures)
        return <div style={{ textAlign: "center" }}>Nincs adat!</div>
    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-6 text-center fw-bold">Márka neve</div>
                <div className="col-1 text-center fw-bold">Törlés</div>
                <div className="col-1 text-center fw-bold">Módosítás</div>
                <div className="col-1 text-center fw-bold">Felvitel</div>
            </div>
            {adatok.map((elem, index) => (
                <div class="row mb-3">
                    <div className="col-6 text-center">{elem.marka_nev}</div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-danger  ml-2"
                            onClick={() => torlesFuggveny(elem.marka_id, elem.marka_nev)}
                        >
                            <FaRegTrashCan />
                        </button>
                    </div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-alert  ml-2"
                            onClick={() => openModalModosit(elem.marka_id)}
                        >
                            <FaPencil />
                        </button>
                    </div>
                    <div className="col-1 text-center">
                        {index === 0 &&
                            <button
                                className="btn btn-alert  ml-2"
                                onClick={() => openModalHozzaad()}
                            >
                                <FaPlus />
                            </button>
                        }
                    </div>
                </div>
            ))}
            <Modal isOpen={modalOpenModosit} onClose={closeModalModosit}>
                <MarkaModosit marka_id={selectedMarkaId} onClose={closeModalModosit} />
            </Modal>
            <Modal isOpen={modalOpenHozzaad} onClose={closeModalHozzaad}>
                <MarkaFelvitel onClose={closeModalHozzaad} />
            </Modal>
        </div>
    )
}

export default Marka