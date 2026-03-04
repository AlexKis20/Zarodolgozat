import { useState, useEffect } from "react"
import { FaPlus } from "react-icons/fa";
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import { MdMoreVert } from "react-icons/md";
import Cim from "../../../Cim"
import Modal from "../../../components/Modal"
import MarkaModosit from "./MarkaModosit"
import MarkaFelvitel from "./MarkaFelvitel";
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";
import "../../../utils/Responsive.css";

const Marka = () => {
    const [adatok, setAdatok] = useState([])
    const [keresettAdatok, setKeresettAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)
    const [modalOpenModosit, setModalOpenModosit] = useState(false)
    const [modalOpenHozzaad, setModalOpenHozzaad] = useState(false)
    const [selectedMarkaId, setSelectedMarkaId] = useState(null)
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
    const [openMenuId, setOpenMenuId] = useState(null);

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/marka")
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

    const torlesFuggveny = async (e, marka_id, marka_nev) => {
        e.stopPropagation();
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${marka_nev} márkát?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/markaTorles/" + marka_id, {
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

    const openModalModosit = (e, marka_id) => {
        e.stopPropagation();
        setSelectedMarkaId(marka_id)
        setModalOpenModosit(true)
        setOpenMenuId(null);
    }

    const closeModalModosit = (frissit) => {
        setModalOpenModosit(false)
        setSelectedMarkaId(null)
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
                    <MarkaFelvitel onClose={closeModalHozzaad} />
                </Modal>
            </div>
        )

    if (hiba)
        return <div className="text-center">Hiba történt az adatok betöltése közben.</div>
    

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mb-3">
                <div className="col-6 text-center">
                    <Kereses adatok={adatok} keresettMezok={["marka_nev"]} setKeresettAdatok={setKeresettAdatok} />
                </div>
                <div className="col-4 text-center">
                    <Rendezes adatok={keresettAdatok} setKeresettAdatok={setKeresettAdatok}>
                        <option value="marka_nev|1">Márka neve növekvő</option>
                        <option value="marka_nev|2">Márka neve csökkenő</option>
                    </Rendezes>
                </div>
            </div>
            { isSmallScreen ? (
                <div className="row mb-3">
                    <div className="col-8 text-center fw-bold">Márka neve</div>
                    <div className="col-3 text-center fw-bold">Továbbiak</div>
                </div>
            ) : (
                <div className="row mb-3">
                    <div className="col-8 text-center fw-bold">Márka neve</div>
                    <div className="col-1 text-center fw-bold">Törlés</div>
                    <div className="col-1 text-center fw-bold">Módosítás</div>
                    <div className="col-1 text-center fw-bold">Felvitel</div>
                </div>
            )}
            {keresettAdatok.map((elem, index) => (
                <div key={elem.marka_id} className="row mb-3">
                    { isSmallScreen ? (
                        <>
                            <div className="col-8 text-center">{elem.marka_nev}</div>
                            <div className="col-3 text-center">
                                <div className="tovabbiak-dropdown-container" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                        className="tovabbiak-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === elem.marka_id ? null : elem.marka_id);
                                        }}
                                        title="Továbbiak"
                                    >
                                        <MdMoreVert />
                                    </button>
                                    {openMenuId === elem.marka_id && (
                                        <div className="tovabbiak-menu">
                                            <div className="tovabbiak-item" onClick={(e) => openModalModosit(e, elem.marka_id)}>
                                                <FaPencil /> Módosítás
                                            </div>
                                            <div className="tovabbiak-item tovabbiak-item-danger" onClick={(e) => torlesFuggveny(e, elem.marka_id, elem.marka_nev)}>
                                                <FaRegTrashCan /> Törlés
                                            </div>
                                            {index === 0 && (
                                                <div className="tovabbiak-item" onClick={(e) => openModalHozzaad(e)}>
                                                    <FaPlus /> Márka felvitele
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-8 text-center">{elem.marka_nev}</div>
                            <div className="col-1 text-center">
                                <button
                                    className="btn btn-danger  ml-2"
                                    onClick={() => torlesFuggveny(elem.marka_id, elem.marka_nev)}
                                >
                                    <FaRegTrashCan />
                                </button>
                            </div>
                            <div className="col-1 text-center">
                                <button
                                    className="btn btn-alert  ml-2"
                                    onClick={() => openModalModosit(elem.marka_id)}
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
                <MarkaModosit marka_id={selectedMarkaId} onClose={closeModalModosit} />
            </Modal>
            <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)}>
                <MarkaFelvitel onClose={closeModalHozzaad} />
            </Modal>
        </div>
    )
}

export default Marka