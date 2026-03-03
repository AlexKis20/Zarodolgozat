import { useState, useEffect, useRef } from "react"
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import { FaList, FaPlus } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import "./Rendeles.css"
import Cim from "../../../Cim"
import Modal from "../../../components/Modal"
import RendelesModosit from "./RendelesModosit"
import RendelesTermekek from "./RendelesTermekek";
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";
import RendelesFelvitel from "./RendelesFelvitel";
import { telefonszamFuggveny } from "../../../utils/formazas";

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
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);

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

    const torlesFuggveny = async (rendeles_id) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd ezt a rendelést?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/rendelesTorles/" + rendeles_id, {
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

    const openModalModosit = (rendeles_id) => {
        setSelectedRendelesId(rendeles_id)
        setModalOpenModosit(true)
    }

    const closeModalModosit = (frissit) => {
        setModalOpenModosit(false)
        setSelectedRendelesId(null)
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

    const openModalTermekek = (rendeles_id) => {
        setSelectedRendelesId(rendeles_id)
        setModalOpenTermekek(true)
    }

    const closeModalTermekek = (frissit) => {
        setModalOpenTermekek(false)
        if (frissit) {
            leToltes()
        }
    }

    const teljesitPipa = (rendeles_id) => {
        const adat = adatok.find(elem => elem.rendeles_id === rendeles_id);
        setTeljesitendoRendelesId(rendeles_id);
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

    const handleMobileAction = (e, action, rendeles_id, index) => {
        e.stopPropagation();
        
        if (action === "termekek") {
            openModalTermekek(rendeles_id);
        } else if (action === "teljesitet") {
            teljesitPipa(rendeles_id);
        } else if (action === "torles") {
            torlesFuggveny(rendeles_id);
        } else if (action === "modosit") {
            openModalModosit(rendeles_id);
        } else if (action === "hozzaad") {
            openModalHozzaad();
        }
        setOpenMenuId(null);
    };

    if (tolt)
        return <div className="text-center">Adatok betöltése folyamatban...</div>
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
                <Modal isOpen={modalOpenHozzaad} onClose={closeModalHozzaad} isWide={true}>
                    <RendelesFelvitel onClose={closeModalHozzaad} />
                </Modal>
            </div>
        )
    if (hiba)
        return <div className="text-center">Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container-fluid">
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
            { isSmallScreen ? (
                <div className="row mb-3">
                    <div className="col-1 text-center fw-bold">Név</div>
                    <div className="col-3 text-center fw-bold">Telefonszám</div>
                    <div className="col-3 text-center fw-bold">Cím</div>
                    <div className="col-2 text-center fw-bold">Dátum</div>
                    <div className="col-3 text-center fw-bold">Műveletek</div>
                </div>
            ) : (
                <div className="row mb-3">
                    <div className="col-1 text-center fw-bold">Név</div>
                    <div className="col-2 text-center fw-bold">Telefonszám</div>
                    <div className="col-2 text-center fw-bold">Cím</div>
                    <div className="col-2 text-center fw-bold">Dátum</div>
                    <div className="col-1 text-center fw-bold">Termékek</div>
                    <div className="col-1 text-center fw-bold">Teljesített</div>
                    <div className="col-1 text-center fw-bold">Törlés</div>
                    <div className="col-1 text-center fw-bold">Módosítás</div>
                    <div className="col-1 text-center fw-bold">Felvitel</div>
                </div>
                )}
            {keresettAdatok.map((elem, index) => (
                <div className="row mb-3" key={elem.rendeles_id || index}>
                    
                    {isSmallScreen ? (
                        <>
                            <div className="col-1 text-center">{elem.rendeles_nev}</div>
                            <div className="col-3 text-center">{telefonszamFuggveny(elem.rendeles_telefonszam)}</div>
                            <div className="col-3 text-center">{elem.rendeles_cim}</div>
                            <div className="col-2 text-center">{new Date(elem.rendeles_datum).toLocaleString('hu-HU')}</div>
                            <div className="col-3 text-center">
                                <div className="muvelet-dropdown-container" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                        className="muvelet-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === elem.rendeles_id ? null : elem.rendeles_id);
                                        }}
                                        title="Műveletek"
                                    >
                                        <MdMoreVert />
                                    </button>
                                    {openMenuId === elem.rendeles_id && (
                                        <div className="muvelet-menu">
                                            <div className="muvelet-item" onClick={(e) => handleMobileAction(e, "termekek", elem.rendeles_id, index)}>
                                                <FaList /> Termékek megtekintése
                                            </div>
                                            <div className="muvelet-item" onClick={(e) => handleMobileAction(e, "teljesitet", elem.rendeles_id, index)}>
                                                ✓ Teljesítettként jelöl
                                            </div>
                                            <div className="muvelet-item" onClick={(e) => handleMobileAction(e, "modosit", elem.rendeles_id, index)}>
                                                <FaPencil /> Módosítás
                                            </div>
                                            <div className="muvelet-item muvelet-item-danger" onClick={(e) => handleMobileAction(e, "torles", elem.rendeles_id, index)}>
                                                <FaRegTrashCan /> Törlés
                                            </div>
                                            {index === 0 && (
                                                <div className="muvelet-item" onClick={(e) => handleMobileAction(e, "hozzaad", elem.rendeles_id, index)}>
                                                    <FaPlus /> Új rendelés felvitele
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-1 text-center">{elem.rendeles_nev}</div>
                            <div className="col-2 text-center">{telefonszamFuggveny(elem.rendeles_telefonszam)}</div>
                            <div className="col-2 text-center">{elem.rendeles_cim}</div>
                            <div className="col-2 text-center">{new Date(elem.rendeles_datum).toLocaleString('hu-HU')}</div>
                            <div className="col-1 text-center">
                                <button
                                    className="btn btn-primary ml-2"
                                    onClick={() => openModalTermekek(elem.rendeles_id)}
                                >
                                    <FaList />
                                </button>
                            </div>
                            <div className="col-1 text-center">
                                <input 
                                    type="checkbox" 
                                    checked={elem.rendeles_teljesitve === 1}
                                    onChange={() => teljesitPipa(elem.rendeles_id)}
                                />
                            </div>
                            <div className="col-1 text-center">
                                <button
                                    className="btn btn-danger ml-2"
                                    onClick={() => torlesFuggveny(elem.rendeles_id)}
                                >
                                    <FaRegTrashCan />
                                </button>
                            </div>
                            <div className="col-1 text-center">
                                <button
                                    className="btn btn-alert ml-2"
                                    onClick={() => openModalModosit(elem.rendeles_id)}
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
                        </>
                    )}
                </div>
            ))}
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
