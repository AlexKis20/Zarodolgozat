import { useState, useEffect } from "react"
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import "./Termek.css"
import Cim from "../../../components/Cim"
import Modal from "../../../components/Modal"
import TermekModosit from "./TermekModosit"

const Termek= ({ kivalasztott }) => {
    const [adatok, setAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedTermekId, setSelectedTermekId] = useState(null)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/termek")
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

    const torlesFuggveny = async (termek_id, termek_nev) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${termek_nev} termékét?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/termekTorles/" + termek_id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })

            const data = response.json()

            if (response.ok) {
                alert(data["message"])
                setSiker(prev => !prev)
            } else {
                alert(data["error"])
            }
        }
    }

    const openModal = (termek_id) => {
        setSelectedTermekId(termek_id)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setSelectedTermekId(null)
    }

    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Termék neve</th>
                        <th>Törlés</th>
                        <th>Módosítás</th>
                    </tr>
                </thead>
                <tbody>
                    {adatok.map((elem, index) => (
                        <tr key={index}>
                            <td>{elem.termek_nev}</td>
                            <td>
                                <button
                                    className="btn btn-danger  ml-2"
                                    onClick={() => torlesFuggveny(elem.termek_id, elem.termek_nev)}
                                >
                                   <FaRegTrashCan />
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-alert  ml-2"
                                    onClick={() => openModal(elem.termek_id)}
                                >
                                   <FaPencil />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalOpen} onClose={closeModal}>
                <TermekModosit termek_id={selectedTermekId} onClose={closeModal} />
            </Modal>
        </div>
    )
}

export default Termek