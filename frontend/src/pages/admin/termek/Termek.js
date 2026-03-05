import { useState, useEffect } from "react"
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import "./Termek.css"
import Cim from "../../../Cim"
import Modal from "../../../components/Modal"
import TermekModosit from "./TermekModosit"
import TermekFelvitel from "./TermekFelvitel";
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";
import "../../../utils/Responsive.css";


const Termek= () => {
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
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
    const [openMenuId, setOpenMenuId] = useState(null);

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
        }
    }

    useEffect(() => {
        leToltes()
    }, [siker])

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1200);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = () => {
            setOpenMenuId(null);
        };

        if (openMenuId) {
            document.addEventListener("click", handleClickOutside);
            return () => document.removeEventListener("click", handleClickOutside);
        }
    }, [openMenuId]);

    const torlesFuggveny = async (e, termek_id, termek_nev) => {
        e.stopPropagation();
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
        setOpenMenuId(null);
    }

    const openModalModosit = (e, termek_id) => {
        e.stopPropagation();
        setSelectedTermekId(termek_id)
        setModalOpenModosit(true)
        setOpenMenuId(null);
    }

    const closeModalModosit = (frissit) => {
        setModalOpenModosit(false)
        setSelectedTermekId(null)
        if (frissit) {
            leToltes()
        }
    }

    const openModalHozzaad = (e) => {
        e.stopPropagation();
        setModalOpenHozzaad(true)
        setOpenMenuId(null);
    }

    const closeModalHozzaad = (frissit) => {
        setModalOpenHozzaad(false)
        if (frissit) {
            leToltes()
        }
    }

    if (tolt)
        return <div className="text-center">Adatok betöltése folyamatban...</div>
    if (ures)
        return (
            <div className="container-fluid">
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
                <Modal isOpen={modalOpenHozzaad} onClose={closeModalHozzaad}>
                    <TermekFelvitel onClose={closeModalHozzaad} markak={markak} tipusok={tipusok} />
                </Modal>
            </div>
        )
    if (hiba)
        return <div className="text-center">Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container-fluid">
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
            { isSmallScreen ? (
                <div className="row mb-3">
                    <div className="col-8 text-center fw-bold">Termék neve</div>
                    <div className="col-3 text-center fw-bold">Továbbiak</div>
                </div>
            ) : (
                <div className="row mb-3">
                    <div className="col-8 text-center fw-bold">Termék neve</div>
                    <div className="col-1 text-center fw-bold">Törlés</div>
                    <div className="col-1 text-center fw-bold">Módosítás</div>
                    <div className="col-1 text-center fw-bold">Felvitel</div>
                </div>
            )}
            {keresettAdatok.map((elem, index) => (
                <div className="row mb-3" key={elem.termek_id || index}>
                    { isSmallScreen ? (
                        <>
                            <div className="col-8 text-center">{elem.termek_nev}</div>
                            <div className="col-3 text-center">
                                <div className="tovabbiak-dropdown-container" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                        className="tovabbiak-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === elem.termek_id ? null : elem.termek_id);
                                        }}
                                        title="Továbbiak"
                                    >
                                        <MdMoreVert />
                                    </button>
                                    {openMenuId === elem.termek_id && (
                                        <div className="tovabbiak-menu">
                                            <div className="tovabbiak-item" onClick={(e) => openModalModosit(e, elem.termek_id)}>
                                                <FaPencil /> Módosítás
                                            </div>
                                            <div className="tovabbiak-item tovabbiak-item-danger" onClick={(e) => torlesFuggveny(e, elem.termek_id, elem.termek_nev)}>
                                                <FaRegTrashCan /> Törlés
                                            </div>
                                            {index === 0 && (
                                                <div className="tovabbiak-item" onClick={(e) => openModalHozzaad(e)}>
                                                    <FaPlus /> Termék felvitele
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-8 text-center">{elem.termek_nev}</div>
                            <div className="col-1 text-center">
                                <button
                                    className="btn btn-danger ml-2"
                                    onClick={(e) => torlesFuggveny(e, elem.termek_id, elem.termek_nev)}
                                >
                                    <FaRegTrashCan />
                                </button>
                            </div>
                            <div className="col-1 text-center">
                                <button
                                    className="btn btn-alert ml-2"
                                    onClick={(e) => openModalModosit(e, elem.termek_id)}
                                >
                                    <FaPencil />
                                </button>
                            </div>
                            <div className="col-1 text-center">
                                {index === 0 &&
                                    <button
                                        className="btn btn-alert  ml-2"
                                        onClick={(e) => openModalHozzaad(e)}
                                    >
                                        <FaPlus />
                                    </button>
                                }
                            </div>
                        </>
                    )}
                </div>
            ))}
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