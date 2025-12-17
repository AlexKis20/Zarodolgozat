import { useState, useEffect } from "react"
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import "./Termek.css"
import Cim from "../../../components/Cim"
import Modal from "../../../components/Modal"
import TermekModosit from "./TermekModosit"
import TermekFelvitel from "./TermekFelvitel";

const Termek= () => {
    const [adatok, setAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)
    const [modalOpenModosit, setModalOpenModosit] = useState(false)
    const [modalOpenHozzaad, setModalOpenHozzaad] = useState(false)
    const [selectedTermekId, setSelectedTermekId] = useState(null)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/termek")
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

    const torlesFuggveny = async (termek_id, termek_nev) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${termek_nev} termékét?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/termekTorles/" + termek_id, {
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

    const openModalModosit = (termek_id) => {
        setSelectedTermekId(termek_id)
        setModalOpenModosit(true)
    }

    const closeModalModosit = () => {
        setModalOpenModosit(false)
        setSelectedTermekId(null)
    }

    const openModalHozzaad = (marka_id) => {
        setModalOpenHozzaad(true)
    }

    const closeModalHozzaad = () => {
        setModalOpenHozzaad(false)
    }

    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>
    if (ures)
        return (
            <div className="container">
                <div className="row mb-3">
                    <div className="col-5"></div>
                    <div className="col-2 text-center">Nincs adat!</div>
                    <div className="col-5 text-center">
                        Felvitel
                        <div>
                            <button
                            className="btn btn-alert  ml-2"
                                onClick={() => openModalHozzaad()} >      
                                <FaPlus />
                        </button>
                        </div>
                    </div>
                </div>
                <Modal isOpen={modalOpenHozzaad} onClose={closeModalHozzaad}>
                    <TermekFelvitel onClose={closeModalHozzaad} />
                </Modal>
            </div>
        )

    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-6 text-center fw-bold">Termék neve</div>
                <div className="col-1 text-center fw-bold">Törlés</div>
                <div className="col-1 text-center fw-bold">Módosítás</div>
                <div className="col-1 text-center fw-bold">Felvitel</div>
            </div>
            {adatok.map((elem, index) => (
                <div class="row mb-3">
                    <div className="col-6 text-center">{elem.termek_nev}</div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-danger  ml-2"
                            onClick={() => torlesFuggveny(elem.termek_id, elem.termek_nev)}
                        >
                            <FaRegTrashCan />
                        </button>
                    </div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-alert  ml-2"
                            onClick={() => openModalModosit(elem.termek_id)}
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
                <TermekModosit termek_id={selectedTermekId} onClose={closeModalModosit} />
            </Modal>
            <Modal isOpen={modalOpenHozzaad} onClose={closeModalHozzaad}>
                <TermekFelvitel onClose={closeModalHozzaad} />
            </Modal>
        </div>
    )
}

export default Termek