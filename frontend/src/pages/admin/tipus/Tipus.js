import { useState, useEffect } from "react"
import Cim from "../../../Cim"
import Modal from "../../../components/Modal"
import DataTable from "../../../components/DataTable"
import TipusFelvitel from "./TipusFelvitel";
import TipusModosit from "./TipusModosit";
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";
import "../../../components/DataTable.css"

const Tipus = () => {
    const [adatok, setAdatok] = useState([])
    const [keresettAdatok, setKeresettAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)
    const [modalOpenModosit, setModalOpenModosit] = useState(false)
    const [modalOpenHozzaad, setModalOpenHozzaad] = useState(false)
    const [selectedTipusId, setSelectedTipusId] = useState(null)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/tipus")
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

    const torlesFuggveny = async (rowData) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${rowData.tipus_nev} típust?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/tipusTorles/" + rowData.tipus_id, {
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

    const handleEdit = (rowData) => {
        setSelectedTipusId(rowData.tipus_id)
        setModalOpenModosit(true)
    }

    const closeModalModosit = (frissit) => {
        setModalOpenModosit(false)
        setSelectedTipusId(null)
        if (frissit) {
            leToltes()
        }
    }

    const handleAdd = () => {
        setModalOpenHozzaad(true)
    }

    const closeModalHozzaad = (frissit) => {
        setModalOpenHozzaad(false)
        if (frissit) {
            leToltes()
        }
    }

    if (tolt)
        return <div className="text-center">Adatok betöltése folyamatban...</div>
    
    if (hiba)
        return <div className="text-center">Hiba történt az adatok betöltése közben.</div>
    
    if (ures)
        return (
            <div className="container">
                <div className="row justify-content-center mb-3">
                    <div className="col-5"></div>
                    <div className="col-2 text-center">Nincs adat!</div>
                    <div className="col-5 text-center">
                        <button
                            className="btn btn-alert ml-2"
                            onClick={() => handleAdd()}>      
                            Új típus felvitele
                        </button>
                    </div>
                </div>
                <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)}>
                    <TipusFelvitel onClose={closeModalHozzaad} />
                </Modal>
            </div>
        )

    // DataTable oszlopok konfigurálása
    const columns = [
        {
            key: 'tipus_nev',
            label: 'Típus neve',
        }
    ]

    // DataTable konfiguráció
    const tableConfig = {
        data: keresettAdatok,
        columns: columns,
        hiddenColumns: [],
        actions: {
            view: false,
            edit: true,
            delete: true,
            add: true,
        },
        onEdit: handleEdit,
        onDelete: torlesFuggveny,
        onAdd: handleAdd,
        primaryKey: 'tipus_id',
    }

    return (
        <div className="container">
            <div className="row justify-content-center mb-3">
                <div className="col-6 text-center">
                    <Kereses adatok={adatok} keresettMezok={["tipus_nev"]} setKeresettAdatok={setKeresettAdatok} />
                </div>
                <div className="col-4 text-center">
                    <Rendezes adatok={keresettAdatok} setKeresettAdatok={setKeresettAdatok}>
                        <option value="tipus_nev|1">Típus neve növekvő</option>
                        <option value="tipus_nev|2">Típus neve csökkenő</option>
                    </Rendezes>
                </div>
            </div>

            <DataTable config={tableConfig} />

            <Modal isOpen={modalOpenModosit} onClose={() => closeModalModosit(false)}>
                <TipusModosit tipus_id={selectedTipusId} onClose={closeModalModosit} />
            </Modal>
            <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)}> 
                <TipusFelvitel onClose={closeModalHozzaad} />
            </Modal>
        </div>
    )
}

export default Tipus