import { useState, useEffect } from "react"
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import Cim from "../../../components/Cim"
import Modal from "../../../components/Modal"
import TipusFelvitel from "./TipusFelvitel";
import TipusModosit from "./TipusModosit";
import { FaPlus } from "react-icons/fa";

const Tipus = () => {
    const [adatok, setAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [modalOpenModosit, setModalOpenModosit] = useState(false)
    const [modalOpenHozzaad, setModalOpenHozzaad] = useState(false)
    const [selectedTipusId, setSelectedTipusId] = useState(null)
    

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/tipus")
            const data = await response.json()

            if (response.ok) {
                setAdatok(data)
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
    }, [siker])


    const torlesFuggveny = async (tipus_id, tipus_nev) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${tipus_nev} típust?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/tipusTorles/" + tipus_id, {
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
    
    const openModalModosit = (tipus_id) => {
        setSelectedTipusId(tipus_id)
        setModalOpenModosit(true)
    }

    const closeModalModosit = () => {
        setModalOpenModosit(false)
        setSelectedTipusId(null)
    }

    const openModalHozzaad = () => {
        setModalOpenHozzaad(true)
    }

    const closeModalHozzaad = () => {
        setModalOpenHozzaad(false)
    }


    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-6 text-center fw-bold">Típus neve</div>
                <div className="col-1 text-center fw-bold">Törlés</div>
                <div className="col-1 text-center fw-bold">Módosítás</div>
                <div className="col-1 text-center fw-bold">Felvitel</div>
            </div>
            {adatok.map((elem, index) => (
                <div class="row mb-3">
                    <div className="col-6 text-center">{elem.tipus_nev}</div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-danger  ml-2"
                            onClick={() => torlesFuggveny(elem.tipus_id, elem.tipus_nev)}
                        >
                            <FaRegTrashCan />
                        </button>
                    </div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-alert  ml-2"
                            onClick={() => openModalModosit(elem.tipus_id)}
                        >
                            <FaPencil />
                        </button>
                    </div>
                    <div className="col-1 text-center">
                        {index == 0 &&
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
                <TipusModosit tipus_id={selectedTipusId} onClose={closeModalModosit} />
            </Modal>
            <Modal isOpen={modalOpenHozzaad} onClose={closeModalHozzaad}>
                <TipusFelvitel onClose={closeModalHozzaad} />
            </Modal>
        </div>
    )
}

export default Tipus