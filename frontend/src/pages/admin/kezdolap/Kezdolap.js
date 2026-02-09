import { useState, useEffect } from "react"
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import Cim from "../../../components/Cim"
import Modal from "../../../components/Modal"
import KezdolapModosit from "./KezdolapModosit";
import KezdolapFelvitel from "./KezdolapFelvitel";
import { FaPlus } from "react-icons/fa";
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";


const Kezdolap= () => {
    const [adatok, setAdatok] = useState([])
    const [fajtak, setFajtak] = useState([])
    const [keresettAdatok, setKeresettAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)
    const [modalOpenModosit, setModalOpenModosit] = useState(false)
    const [modalOpenHozzaad, setModalOpenHozzaad] = useState(false)
    const [selectedBlogId, setSelectedBlogId] = useState(null)
        
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
        }
    }

    useEffect(() => {
        leToltes()
    }, [siker])


    const torlesFuggveny = async (blog_id, blog_cim) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${blog_cim} kezdőlapot?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/kezdolapTorles/" + blog_id, {
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
    
    const openModalModosit = (blog_id) => {
        setSelectedBlogId(blog_id)
        setModalOpenModosit(true)
    }

    const closeModalModosit = (frissit) => {
        setModalOpenModosit(false)
        setSelectedBlogId(null)
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
        return <div className="text-center">Adatok betöltése folyamatban...</div>
    
    if (ures)
        return (
            <div className="container">
                <div className="row mb-3">
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
                    <KezdolapFelvitel onClose={closeModalHozzaad} />
                </Modal>
            </div>
        )
    
    if (hiba)
        return <div className="text-center">Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container">
            <div className="row justify-content-center mb-3">
                <div className="col-6 text-center">
                    <Kereses adatok={adatok} keresettMezok={["blog_cim"]} setKeresettAdatok={setKeresettAdatok} />
                </div>
                <div className="col-4 text-center">
                    <Rendezes adatok={keresettAdatok} setKeresettAdatok={setKeresettAdatok}>
                        <option value="blog_cim|1">Kezdőlap címe növekvő</option>
                        <option value="blog_cim|2">Kezdőlap címe csökkenő</option>
                    </Rendezes>
                </div>
            </div>
            <div className="row justify-content-center mb-3">
                <div className="col-6 text-center fw-bold">Kezdőlap címe</div>
                <div className="col-1 text-center fw-bold">Törlés</div>
                <div className="col-1 text-center fw-bold">Módosítás</div>
                <div className="col-1 text-center fw-bold">Felvitel</div>
            </div>
            {keresettAdatok.map((elem, index) => (
                <div key={elem.blog_id} className="row justify-content-center mb-3">
                    <div className="col-6 text-center">{elem.blog_cim}</div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-danger  ml-2"
                            onClick={() => torlesFuggveny(elem.blog_id, elem.blog_cim)}
                        >
                            <FaRegTrashCan />
                        </button>
                    </div>
                    <div className="col-1 text-center">
                        <button
                            className="btn btn-alert  ml-2"
                            onClick={() => openModalModosit(elem.blog_id)}
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
            <Modal isOpen={modalOpenModosit} onClose={() => closeModalModosit(false)}>
                <KezdolapModosit blog_id={selectedBlogId} onClose={closeModalModosit} fajtak={fajtak} />
            </Modal>
            <Modal isOpen={modalOpenHozzaad} onClose={() => closeModalHozzaad(false)}>
                <KezdolapFelvitel onClose={closeModalHozzaad} fajtak={fajtak} />
            </Modal>
        </div>
    )
}

export default Kezdolap

