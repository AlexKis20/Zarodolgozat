import { useState, useEffect } from "react"
//import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import Cim from "../../components/Cim"
import Modal from "../../components/Modal"
import MarkaModosit from "./MarkaModosit"

const Marka = ({ kivalasztott }) => {
    const [adatok, setAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedMarkaId, setSelectedMarkaId] = useState(null)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/marka")
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


    const torlesFuggveny = async (marka_id, marka_nev) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${marka_nev} márkát?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/marka/" +marka_id, {
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
    
    const openModal = (marka_id) => {
        setSelectedMarkaId(marka_id)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setSelectedMarkaId(null)
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
                        <th>Márka neve</th>
                        <th>Törlés</th>
                        <th>Módosítás</th>

                    </tr>
                </thead>
                <tbody>
                    {adatok.map((elem, index) => (
                        <tr key={index}>
                            <td>{elem.marka_nev}</td>
                            <td>
                                <button
                                    className="btn btn-danger  ml-2"
                                    onClick={() => torlesFuggveny(elem.marka_id, elem.marka_nev)}
                                >
                                  b
                                </button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-alert  ml-2"
                                    onClick={() => openModal(elem.marka_id)}
                                >
                                  a
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={modalOpen} onClose={closeModal}>
                <MarkaModosit marka_id={selectedMarkaId} onClose={closeModal} />
            </Modal>
        </div>
    )
}

export default Marka