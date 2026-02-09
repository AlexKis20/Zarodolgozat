import { useState, useEffect } from "react";
import Cim from "../../../components/Cim"
import { FaList } from "react-icons/fa";
import "./Vezerlopult.css";
import { datumFuggveny } from "../../../utils/datum";
import Modal from "../../../components/Modal"
import RendelesTermekek from "../rendeles/RendelesTermekek";

const Vezerlopult = () => {
    const [velemenyek, setVelemenyek] = useState([])
    const [rendelesek, setRendelesek] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)
    const [velemenyIndex, setVelemenyIndex] = useState(0);
    const [rendelesIndex, setRendelesIndex] = useState(0);
    const [rendelesPaused, setRendelesPaused] = useState(false);
    const [velemenyekPaused, setVelemenyekPaused] = useState(false);
    const [selectedRendelesId, setSelectedRendelesId] = useState(null)
    const [modalOpenTermekek, setModalOpenTermekek] = useState(false)

    const kartyakSzama = 3; // Egyszerre megjelenő kártyák száma

    const leToltes = async () => {
        try {
            const velemenyResponse = await fetch(Cim.Cim + "/velemenyMinden")
            const velemenyData = await velemenyResponse.json()

            const rendelesResponse = await fetch(Cim.Cim + "/rendeles")
            const rendelesData = await rendelesResponse.json()

            if (velemenyResponse.ok && rendelesResponse.ok) {
                setVelemenyek(velemenyData)
                setRendelesek(rendelesData)
                setTolt(false)
            } 
            else if (velemenyResponse.status === 404 || rendelesResponse.status === 404) {
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
        const interval = setInterval(() => {
            if (!rendelesPaused && rendelesek && rendelesek.length > 0) {
                setRendelesIndex(prev => (prev + 1) % rendelesek.length);
            }
        }, 10000);
        return () => clearInterval(interval);
    }, [rendelesPaused, rendelesek]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!velemenyekPaused && velemenyek && velemenyek.length > 0) {
                setVelemenyIndex(prev => (prev + 1) % velemenyek.length);
            }
        }, 10000);
        return () => clearInterval(interval);
    }, [velemenyekPaused, velemenyek]);

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

    const lapoz = (irany, tipus) => {
        if (tipus === "velemenyek") {
            const ujIndex = (velemenyIndex + irany + velemenyek.length) % velemenyek.length;
            setVelemenyIndex(ujIndex);
        } else if (tipus === "rendelesek") {
            const ujIndex = (rendelesIndex + irany + rendelesek.length) % rendelesek.length;
            setRendelesIndex(ujIndex);
        }
    };

    const megjelenitendoAdat = (adatok, kezdoIndex) => {
        const kartyak = Math.min(kartyakSzama, adatok.length);
        const megjelenitendo = [];

        for (let i = 0; i < kartyak; i++) {
            const index = (kezdoIndex + i) % adatok.length;
            megjelenitendo.push(adatok[index]);
        }

        return megjelenitendo
    };

    if (tolt)
        return <div className="text-center">Adatok betöltése folyamatban...</div>

    if (ures)
        return <div className="text-center">Nincs adat!</div>

    if (hiba)
        return <div className="text-center">Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="vezerlopult">
            <div className="szekcio">
                <h3>Rendelések</h3>
                <div className="carousel">
                    <button className="btn btn-secondary" onClick={() => lapoz(-1, "rendelesek")}>&lt;</button>
                    <div className="kartyak" onMouseEnter={() => setRendelesPaused(true)} onMouseLeave={() => setRendelesPaused(false)}>
                        {megjelenitendoAdat(rendelesek, rendelesIndex).map((adat, index) => (
                            <div key={index} className="container-fluid kartya">
                                <div className="row mb-2">
                                    <div className="col">Név:</div>
                                    <div className="col text-start">{adat.rendeles_nev}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">Cím:</div>
                                    <div className="col text-start">{adat.rendeles_cim}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">Telefonszám:</div>
                                    <div className="col text-start">{adat.rendeles_telefonszam}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">Termékek:</div>
                                    <div className="col text-start">
                                        <button className="btn btn-primary ml-2" onClick={() => openModalTermekek(adat.rendeles_id)}>
                                            <FaList />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-secondary" onClick={() => lapoz(1, "rendelesek")}>&gt;</button>
                </div>
            </div>
            <div className="szekcio">
                <h3>Vélemények</h3>
                <div className="carousel">
                    <button className="btn btn-secondary" onClick={() => lapoz(-1, "velemenyek")}>&lt;</button>
                    <div className="kartyak" onMouseEnter={() => setVelemenyekPaused(true)} onMouseLeave={() => setVelemenyekPaused(false)}>
                        {megjelenitendoAdat(velemenyek, velemenyIndex).map((adat, index) => (
                            <div key={index} className="container-fluid kartya">
                                <div className="row mb-2">
                                    <div className="col text-center">{adat.felhasznalo_nev}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col text-center"><h4>{adat.velemeny_szoveg}</h4></div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col text-center">{adat.velemeny_ertekeles}/5</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col text-center">{adat.termek_nev}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col text-end fs-6">{datumFuggveny(adat.velemeny_datum)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-secondary" onClick={() => lapoz(1, "velemenyek")}>&gt;</button>
                </div>
            </div>

            <Modal isOpen={modalOpenTermekek} onClose={() => closeModalTermekek(false)}>
                <RendelesTermekek rendeles_id={selectedRendelesId} onClose={closeModalTermekek} />
            </Modal>
        </div>
    );
};

export default Vezerlopult;