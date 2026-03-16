import { useState, useEffect } from "react"
import Cim from "../../../Cim"
import Modal from "../../../components/Modal"
import DataTable from "../../../components/DataTable"
import KezdolapModosit from "./KezdolapModosit";
import KezdolapFelvitel from "./KezdolapFelvitel";
import KezdolapMegtekintes from "./KezdolapMegtekintes";
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";
import "../../../components/DataTable.css"

const Kezdolap = () => {
    const [adatok, setAdatok] = useState([])
    const [fajtak, setFajtak] = useState([])
    const [keresettAdatok, setKeresettAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)
    const [modalOpenModosit, setModalOpenModosit] = useState(false)
    const [modalOpenHozzaad, setModalOpenHozzaad] = useState(false)
    const [modalOpenMegtekintes, setModalOpenMegtekintes] = useState(false)
    const [selectedKezdolapId, setSelectedKezdolapId] = useState(null)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/kezdolap")
            const data = await response.json()
            const fajtaResponse = await fetch(Cim.Cim + "/fajta")
            const fajtaData = await fajtaResponse.json()

            if (response.ok && fajtaResponse.ok) {
                setAdatok(data)
                setFajtak(fajtaData)
                setKeresettAdatok(data)
                setTolt(false)
            }
            else if (response.status === 404 || fajtaResponse.status === 404) {
                if (fajtaResponse.status !== 404) {
                    setFajtak(fajtaData)
                } else {
                    setFajtak([])
                }
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
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${rowData.kezdolap_cim} kezdőlapot?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/kezdolapTorles/" + rowData.kezdolap_id, {
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

    const handleView = (rowData) => {
        setSelectedKezdolapId(rowData.kezdolap_id)
        setModalOpenMegtekintes(true)
    }

    const closeModalMegtekintes = () => {
        setModalOpenMegtekintes(false)
        setSelectedKezdolapId(null)
    }
    
    const handleEdit = (rowData) => {
        setSelectedKezdolapId(rowData.kezdolap_id)
        setModalOpenModosit(true)
    }

    const closeModalModosit = (frissit) => {
        setModalOpenModosit(false)
        setSelectedKezdolapId(null)
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
            <div className="container-fluid">
                <div className="row mb-3">
                    <div className="col-5"></div>
                    <div className="col-2 text-center">Nincs adat!</div>
                    <div className="col-5 text-center">
                        <button
                            className="btn btn-alert ml-2"
                            onClick={() => handleAdd()}>      
                            Új kezdőlap felvitele
                        </button>
                    </div>
                </div>
                <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)}>
                    <KezdolapFelvitel onClose={closeModalHozzaad} fajtak={fajtak} />
                </Modal>
            </div>
        )

    // DataTable oszlopok konfigurálása
    const columns = [
        {
            key: 'kezdolap_cim',
            label: 'Kezdőlap címe',
        }
    ]

    // DataTable konfiguráció
    const tableConfig = {
        data: keresettAdatok,
        columns: columns,
        hiddenColumns: [],
        showExpandRow: false,
        actions: {
            view: true,
            edit: true,
            delete: true,
            add: true,
        },
        onView: handleView,
        onEdit: handleEdit,
        onDelete: torlesFuggveny,
        onAdd: handleAdd,
        primaryKey: 'kezdolap_id',
    }

    return (
        <div className="container">
            <div className="row justify-content-center mb-3">
                <div className="col-6 text-center">
                    <Kereses adatok={adatok} keresettMezok={["kezdolap_cim"]} setKeresettAdatok={setKeresettAdatok} />
                </div>
                <div className="col-4 text-center">
                    <Rendezes adatok={keresettAdatok} setKeresettAdatok={setKeresettAdatok}>
                        <option value="kezdolap_cim|1">Kezdőlap címe növekvő</option>
                        <option value="kezdolap_cim|2">Kezdőlap címe csökkenő</option>
                    </Rendezes>
                </div>
            </div>

            <DataTable config={tableConfig} />

            <Modal isOpen={modalOpenMegtekintes} onClose={() => closeModalMegtekintes()}>
                <KezdolapMegtekintes kezdolap_id={selectedKezdolapId} onClose={closeModalMegtekintes} />
            </Modal>
            <Modal isOpen={modalOpenModosit} onClose={() => closeModalModosit(false)}>
                <KezdolapModosit kezdolap_id={selectedKezdolapId} onClose={closeModalModosit} fajtak={fajtak} />
            </Modal>
            <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)}>
                <KezdolapFelvitel onClose={closeModalHozzaad} fajtak={fajtak} />
            </Modal>
        </div>
    )
}

export default Kezdolap

