import { useState, useEffect } from "react"
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import { FaPlus, FaList } from "react-icons/fa";
import Cim from "../../../components/Cim"
import Modal from "../../../components/Modal"
import AkcioTermekek from "./AkcioTermekek"
import AkcioModosit from "./AkcioModosit"
import AkcioFelvitel from "./AkcioFelvitel"
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";
import { datumFuggveny } from "../../../utils/datum";

const Akcio = () => {
    const [adatok, setAdatok] = useState([])
    const [keresettAdatok, setKeresettAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)
    const [modalOpenTermekek, setModalOpenTermekek] = useState(false)
    const [modalOpenModosit, setModalOpenModosit] = useState(false)
    const [modalOpenHozzaad, setModalOpenHozzaad] = useState(false)
    const [selectedAkcioId, setSelectedAkcioId] = useState(null)
    const [selectedAkcioKedvezmeny, setSelectedAkcioKedvezmeny] = useState(null)
    const [selectedAkcioTipus, setSelectedAkcioTipus] = useState(null)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/akcioMinden")
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
        }
    }

    useEffect(() => {
        leToltes()
    }, [siker])


    const torlesFuggveny = async (akcio_id, akcio_nev) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${akcio_nev} akciót?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/akcioTorles/" + akcio_id, {
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

    const openModalTermekek = (akcio_id, akcio_kedvezmeny, akcio_tipus) => {
        setSelectedAkcioId(akcio_id)
        setSelectedAkcioKedvezmeny(akcio_kedvezmeny)
        setSelectedAkcioTipus(akcio_tipus)
        setModalOpenTermekek(true)
    }

    const closeModalTermekek = (frissit) => {
        setModalOpenTermekek(false)
        if (frissit) {
            leToltes()
        }
    }
    
    const openModalModosit = (akcio_id) => {
        setSelectedAkcioId(akcio_id)
        setModalOpenModosit(true)
    }

    const closeModalModosit = (frissit) => {
        setModalOpenModosit(false)
        setSelectedAkcioId(null)
        if (frissit) {
            leToltes()
        }
    }

    const openModalHozzaad = () => {
        setModalOpenHozzaad(true)
    }

    const closeModalHozzaad = (frissit) => {
        setModalOpenHozzaad(false)
        if (frissit) {
            leToltes()
        }
    }


    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>
    if (ures)
        return (
            <div className="container">
                <div className="row justify-content-center mb-3">
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
                <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)} isWide={true}>
                    <AkcioFelvitel onClose={closeModalHozzaad} />
                </Modal>
            </div>
        )

    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>
    

    return (
        <div className="container">
            <div className="row justify-content-center mb-3">
                <div className="col-6 text-center">
                    <Kereses adatok={adatok} keresettMezok={["akcio_nev"]} setKeresettAdatok={setKeresettAdatok} />
                </div>
                <div className="col-4 text-center">
                    <Rendezes adatok={keresettAdatok} setKeresettAdatok={setKeresettAdatok}>
                        <option value="0" disabled hidden>Rendezés</option>
                        <option value="akcio_nev|1">Akció neve növekvő</option>
                        <option value="akcio_nev|2">Akció neve csökkenő</option>
                        <option value="akcio_kezdete|1">Akció kezdete növekvő</option>
                        <option value="akcio_kezdete|2">Akció kezdete csökkenő</option>
                        <option value="akcio_vege|1">Akció vége növekvő</option>
                        <option value="akcio_vege|2">Akció vége csökkenő</option>
                    </Rendezes>
                </div>
            </div>
            <div className="row justify-content-center mb-3">
                <div className="col-3 text-center fw-bold">Akció neve</div>
                <div className="col-1 text-center fw-bold">Kedvezmény</div>
                <div className="col-2 text-center fw-bold">Kezdete</div>
                <div className="col-2 text-center fw-bold">Vége</div>
                <div className="col-1 text-center fw-bold">Termékek</div>
                <div className="col-1 text-center fw-bold">Törlés</div>
                <div className="col-1 text-center fw-bold">Módosítás</div>
                <div className="col-1 text-center fw-bold">Felvitel</div>
            </div>
            {keresettAdatok.map((elem, index) => (
                <div className="row justify-content-center mb-3">
                    <div className="col-3 text-center">{elem.akcio_nev}</div>
                    <div className="col-1 text-center">{elem.akcio_kedvezmeny}{elem.akcio_tipus === "szazalek" ? "%" : "Ft"}</div>
                    <div className="col-2 text-center">{datumFuggveny(elem.akcio_kezdete)}</div>
                    <div className="col-2 text-center">{datumFuggveny(elem.akcio_vege)}</div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-primary  ml-2"
                            onClick={() => openModalTermekek(elem.akcio_id, elem.akcio_kedvezmeny, elem.akcio_tipus)}
                        >
                            <FaList />
                        </button>
                    </div>
                    

                    <div className="col-1 text-center">
                        <button
                            className="btn btn-danger  ml-2"
                            onClick={() => torlesFuggveny(elem.akcio_id, elem.akcio_nev)}
                        >
                            <FaRegTrashCan />
                        </button>
                    </div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-alert  ml-2"
                            onClick={() => openModalModosit(elem.akcio_id)}
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
            <Modal isOpen={modalOpenTermekek} onClose={() => closeModalTermekek(false)}>
                <AkcioTermekek akcio_id={selectedAkcioId} akcio_kedvezmeny={selectedAkcioKedvezmeny} akcio_tipus={selectedAkcioTipus} onClose={closeModalTermekek} />
            </Modal>
            <Modal isOpen={modalOpenModosit} onClose={() => closeModalModosit(false)} isWide={true}>
                <AkcioModosit akcio_id={selectedAkcioId} onClose={closeModalModosit} />
            </Modal>
            <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)} isWide={true}>
                <AkcioFelvitel onClose={closeModalHozzaad} />
            </Modal>
        </div>
    )
}

export default Akcio