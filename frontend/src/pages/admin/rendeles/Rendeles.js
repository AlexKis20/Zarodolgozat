import { useState, useEffect } from "react"
import Cim from "../../../Cim"
import Modal from "../../../components/Modal"
import DataTable from "../../../components/DataTable"
import RendelesModosit from "./RendelesModosit"
import RendelesTermekek from "./RendelesTermekek";
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";
import RendelesFelvitel from "./RendelesFelvitel";
import { telefonszamFuggveny } from "../../../utils/formazas";
import "../../../components/DataTable.css"

const Rendeles = () => {
    const [adatok, setAdatok] = useState([])
    const [keresettAdatok, setKeresettAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)
    const [modalOpenModosit, setModalOpenModosit] = useState(false)
    const [modalOpenHozzaad, setModalOpenHozzaad] = useState(false)
    const [modalOpenTermekek, setModalOpenTermekek] = useState(false)
    const [modalTeljesitOpen, setModalTeljesitOpen] = useState(false);
    const [selectedRendelesId, setSelectedRendelesId] = useState(null)
    const [teljesitendoRendelesId, setTeljesitendoRendelesId] = useState(null);
    const [teljesitendoAllapot, setTeljesitendoAllapot] = useState(null);

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

    const torlesFuggveny = async (rowData) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd ezt a rendelést?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/rendelesTorles/" + rowData.rendeles_id, {
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
        setSelectedRendelesId(rowData.rendeles_id)
        setModalOpenModosit(true)
    }

    const closeModalModosit = (frissit) => {
        setModalOpenModosit(false)
        setSelectedRendelesId(null)
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

    const handleViewTermekek = (rowData) => {
        setSelectedRendelesId(rowData.rendeles_id)
        setModalOpenTermekek(true)
    }

    const closeModalTermekek = (frissit) => {
        setModalOpenTermekek(false)
        if (frissit) {
            leToltes()
        }
    }

    const teljesitPipa = (rowData) => {
        const adat = adatok.find(elem => elem.rendeles_id === rowData.rendeles_id);
        setTeljesitendoRendelesId(rowData.rendeles_id);
        setTeljesitendoAllapot(adat.rendeles_teljesitve === 1 ? 0 : 1);
        setModalTeljesitOpen(true);
    }

    const handleTeljesitConfirm = async () => {
        let adat = adatok.find(elem => elem.rendeles_id === teljesitendoRendelesId)
        adat.rendeles_teljesitve = teljesitendoAllapot;
        setAdatok(adatok.map(elem => elem.rendeles_id === teljesitendoRendelesId ? adat : elem))
        await fetch(Cim.Cim + "/rendelesModosit/" + teljesitendoRendelesId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(adat)
        })
        setModalTeljesitOpen(false);
        setTeljesitendoRendelesId(null);
        setTeljesitendoAllapot(null);
    }

    const handleTeljesitCancel = () => {
        setModalTeljesitOpen(false);
        setTeljesitendoRendelesId(null);
        setTeljesitendoAllapot(null);
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
                            Új rendelés felvitele
                        </button>
                    </div>
                </div>
                <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)} isWide={true}>
                    <RendelesFelvitel onClose={closeModalHozzaad} />
                </Modal>
            </div>
        )

    // DataTable oszlopok konfigurálása
    const columns = [
        {
            key: 'rendeles_nev',
            label: 'Név',
        },
        {
            key: 'rendeles_telefonszam',
            label: 'Telefonszám',
            formatter: (value) => telefonszamFuggveny(value),
        },
        {
            key: 'rendeles_cim',
            label: 'Cím',
        },
        {
            key: 'rendeles_datum',
            label: 'Dátum',
            formatter: (value) => new Date(value).toLocaleString('hu-HU'),
        },
        {
            key: 'rendeles_teljesitve',
            label: 'Teljesítve',
            render: (rowData) => (
                <input 
                    type="checkbox" 
                    checked={rowData.rendeles_teljesitve === 1}
                    onChange={() => teljesitPipa(rowData)}
                />
            )
        }
    ]

    // DataTable konfiguráció
    const tableConfig = {
        data: keresettAdatok,
        columns: columns,
        visibleColumnsSmall: ['rendeles_nev', 'rendeles_teljesitve'],  // Kis képernyőn csak a név és státusz legyen látható
        hiddenColumns: [],  // Nagy képernyőn az összes oszlop látható legyen
        actions: {
            view: true,  // Termékek megtekintése
            edit: true,
            delete: true,
            add: true,
        },
        onView: handleViewTermekek,
        onEdit: handleEdit,
        onDelete: torlesFuggveny,
        onAdd: handleAdd,
        primaryKey: 'rendeles_id',
    }

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
                        <option value="rendeles_teljesitve|2">Teljesített rendelés</option>
                        <option value="rendeles_teljesitve|1">Nem teljesített rendelés</option>
                    </Rendezes>
                </div>
            </div>

            <DataTable config={tableConfig} />
            
            <Modal isOpen={modalOpenModosit} onClose={() => closeModalModosit(false)}>
                <RendelesModosit rendeles_id={selectedRendelesId} onClose={closeModalModosit} />
            </Modal>
            <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)} isWide={true}>
                <RendelesFelvitel onClose={closeModalHozzaad} />
            </Modal>
            <Modal isOpen={modalOpenTermekek} onClose={() => closeModalTermekek(false)}>
                <RendelesTermekek rendeles_id={selectedRendelesId} onClose={closeModalTermekek} />
            </Modal>
            <Modal isOpen={modalTeljesitOpen} onClose={handleTeljesitCancel}>
                <div style={{textAlign: 'left;'}}>
                    <span style={{fontSize: '1.5rem', fontStyle: 'Italic text.'}}>
                        {teljesitendoAllapot === 1
                            ? 'Biztos teljesítettnek jelölöd meg?'
                            : 'Biztos visszajelölöd nem teljesítettnek?'}
                    </span>
                    <div style={{marginTop: '20px', textAlign: 'right'}}>
                        <button className="btn btn-primary mx-2" onClick={handleTeljesitConfirm}>OK</button>
                        <button className="btn mx-2" onClick={handleTeljesitCancel}>Mégsem</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Rendeles
