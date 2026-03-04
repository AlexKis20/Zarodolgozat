import { useState, useEffect } from "react"
import { FaRegTrashCan } from "react-icons/fa6";
import { MdMoreVert } from "react-icons/md";
import Cim from "../../../Cim"
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";
import { datumFuggveny } from "../../../utils/formazas";
import "../../../utils/Responsive.css";


const Velemeny = () => {
    const [adatok, setAdatok] = useState([])
    const [keresettAdatok, setKeresettAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
    const [openMenuId, setOpenMenuId] = useState(null);

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/velemenyMinden")
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


    const torlesFuggveny = async (e, velemeny_id) => {
        e.stopPropagation();
        const biztos = window.confirm(`Biztosan törölni szeretnéd a véleményt?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/velemenyTorles/" + velemeny_id, {
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

    if (tolt)
        return <div className="text-center">Adatok betöltése folyamatban...</div>

    if (ures)
        return <div className="text-center">Nincs adat!</div>

    if (hiba)
        return <div className="text-center">Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container">
            <div className="row justify-content-center mb-3">
                <div className="col-6 text-center">
                    <Kereses adatok={adatok} keresettMezok={["velemeny_szoveg","felhasznalo_nev","termek_nev","velemeny_datum"]} setKeresettAdatok={setKeresettAdatok} />
                </div>
                <div className="col-4 text-center">
                    <Rendezes adatok={keresettAdatok} setKeresettAdatok={setKeresettAdatok}>
                        <option value="velemeny_szoveg|1">Vélemény szövege növekvő</option>
                        <option value="velemeny_szoveg|2">Vélemény szövege csökkenő</option>
                        <option value="felhasznalo_nev|1">Felhasználó neve növekvő</option>
                        <option value="felhasznalo_nev|2">Felhasználó neve csökkenő</option>
                        <option value="termek_nev|1">Termék neve növekvő</option>
                        <option value="termek_nev|2">Termék neve csökkenő</option>
                        <option value="velemeny_datum|1">Dátum növekvő</option>
                        <option value="velemeny_datum|2">Dátum csökkenő</option>
                    </Rendezes>
                </div>
            </div>
            { isSmallScreen ? (
                <div className="row mb-3">
                    <div className="col-2 text-center fw-bold">Dátum</div>
                    <div className="col-2 text-center fw-bold">Felhasználó</div>
                    <div className="col-3 text-center fw-bold">Termék</div>
                    <div className="col-3 text-center fw-bold">Vélemény</div>
                    <div className="col-2 text-center fw-bold">Továbbiak</div>
                </div>
            ) : (
                 <div className="row mb-3">
                    <div className="col-2 text-center fw-bold">Dátum</div>
                    <div className="col-2 text-center fw-bold">Felhasználó</div>
                    <div className="col-3 text-center fw-bold">Termék</div>
                    <div className="col-3 text-center fw-bold">Vélemény</div>
                    <div className="col-2 text-center fw-bold">Törlés</div>
                </div>
            )}
            {keresettAdatok.map((elem, index) => (
                <div className="row justify-content-center mb-3">
                    { isSmallScreen ? (
                        <>
                            <div className="col-2 text-center">{datumFuggveny(elem.velemeny_datum)}</div>
                            <div className="col-2 text-center">{elem.felhasznalo_nev}</div>
                            <div className="col-3 text-center">{elem.termek_nev}</div>
                            <div className="col-3 text-center">{elem.velemeny_szoveg}</div>
                            <div className="col-2 text-center">
                                <div className="tovabbiak-dropdown-container" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                        className="tovabbiak-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === elem.velemeny_id ? null : elem.velemeny_id);
                                        }}
                                        title="Továbbiak"
                                    >
                                        <MdMoreVert />
                                    </button>
                                    {openMenuId === elem.velemeny_id && (
                                        <div className="tovabbiak-menu">
                                            <div className="tovabbiak-item tovabbiak-item-danger" onClick={(e) => torlesFuggveny(e, elem.velemeny_id)}>
                                                <FaRegTrashCan /> Törlés
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-2 text-center">{datumFuggveny(elem.velemeny_datum)}</div>
                            <div className="col-2 text-center">{elem.felhasznalo_nev}</div>
                            <div className="col-3 text-center">{elem.termek_nev}</div>
                            <div className="col-3 text-center">{elem.velemeny_szoveg}</div>
                            <div className="col-2 text-center">
                                <button
                                    className="btn btn-danger  ml-2"
                                    onClick={(e) => torlesFuggveny(e, elem.velemeny_id)}
                                >
                                    <FaRegTrashCan />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Velemeny

