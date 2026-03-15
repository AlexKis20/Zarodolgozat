import { useState, useEffect } from "react"
import "./Termek.css"
import Cim from "../../../Cim"
import Modal from "../../../components/Modal"
import DataTable from "../../../components/DataTable"
import TermekModosit from "./TermekModosit"
import TermekFelvitel from "./TermekFelvitel";
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";
import "../../../components/DataTable.css"

const Termek = () => {
    const [adatok, setAdatok] = useState([])
    const [markak, setMarkak] = useState([])
    const [tipusok, setTipusok] = useState([])
    const [keresettAdatok, setKeresettAdatok] = useState([])
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

            const markaResponse = await fetch(Cim.Cim + "/marka")
            const markaData = await markaResponse.json()

            const tipusResponse = await fetch(Cim.Cim + "/tipus")
            const tipusData = await tipusResponse.json()
    
            if (response.ok && markaResponse.ok && tipusResponse.ok) {
                setMarkak(markaData)
                setTipusok(tipusData)
                setAdatok(data)
                setKeresettAdatok(data)
                setTolt(false)
            } 
            else if (response.status === 404 || markaResponse.status === 404 || tipusResponse.status === 404) {
                if (markaResponse.status !== 404) {
                    setMarkak(markaData)
                } else {
                    setMarkak([])
                }
                if (tipusResponse.status !== 404) {
                    setTipusok(tipusData)
                } else {
                    setTipusok([])
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
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${rowData.termek_nev} terméket?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/termekTorles/" + rowData.termek_id, {
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
        setSelectedTermekId(rowData.termek_id)
        setModalOpenModosit(true)
    }

    const closeModalModosit = (frissit) => {
        setModalOpenModosit(false)
        setSelectedTermekId(null)
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
                            Új termék felvitele
                        </button>
                    </div>
                </div>
                <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)}>
                    <TermekFelvitel onClose={closeModalHozzaad} markak={markak} tipusok={tipusok} />
                </Modal>
            </div>
        )

    // DataTable oszlopok konfigurálása
    const columns = [
        {
            key: 'termek_nev',
            label: 'Termék neve',
        },
        {
            key: 'termek_ar',
            label: 'Ár',
            formatter: (value) => `${value} Ft`,
        },
        {
            key: 'termek_szin',
            label: 'Szín',
        },
        {
            key: 'termek_kijelzo',
            label: 'Kijelző',
        },
        {
            key: 'termek_processzor',
            label: 'Processzor',
        },
        {
            key: 'termek_kapacitas',
            label: 'Kapacitás',
        },
        {
            key: 'termek_oprendszer',
            label: 'Operációs rendszer',
        },
        {
            key: 'termek_meret',
            label: 'Méret',
        },
        {
            key: 'termek_leiras',
            label: 'Leírás',
        }
    ]

    // DataTable konfiguráció
    const tableConfig = {
        data: keresettAdatok,
        columns: columns,
        visibleColumnsSmall: ['termek_nev'],  // Kis képernyőn csak a név és ár legyen látható
        hiddenColumns: ['termek_ar', 'termek_szin', 'termek_kijelzo', 'termek_processzor', 'termek_kapacitas', 'termek_oprendszer', 'termek_meret', 'termek_leiras'],  // Ezek a lenyíló sorban jelenjenek meg
        actions: {
            view: false,
            edit: true,
            delete: true,
            add: true,
        },
        onEdit: handleEdit,
        onDelete: torlesFuggveny,
        onAdd: handleAdd,
        primaryKey: 'termek_id',
    }

    return (
        <div className="container">
            <div className="row justify-content-center mb-3">
                <div className="col-6 text-center">
                    <Kereses adatok={adatok} keresettMezok={["termek_nev"]} setKeresettAdatok={setKeresettAdatok} />
                </div>
                <div className="col-4 text-center">
                    <Rendezes adatok={keresettAdatok} setKeresettAdatok={setKeresettAdatok}>
                        <option value="termek_nev|1">Termék neve növekvő</option>
                        <option value="termek_nev|2">Termék neve csökkenő</option>
                    </Rendezes>
                </div>
            </div>

            <DataTable config={tableConfig} />

            <Modal isOpen={modalOpenModosit} onClose={() => closeModalModosit(false)}>
                <TermekModosit termek_id={selectedTermekId} onClose={closeModalModosit} markak={markak} tipusok={tipusok} />
            </Modal>
            <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)}>
                <TermekFelvitel onClose={closeModalHozzaad} markak={markak} tipusok={tipusok} />
            </Modal>
        </div>
    )
}

export default Termek