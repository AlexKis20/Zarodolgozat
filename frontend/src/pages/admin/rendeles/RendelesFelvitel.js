import { useState, useEffect } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Cim from "../../../components/Cim"
import { keresRendeles } from "./keresRendeles";
import BeviteliMezo from "../../../components/BeviteliMezo";
import { mezoValidalas } from "../../../components/BeviteliMezo";

const RendelesFelvitel = ({ onClose }) => {
    const [felvittAdat, setFelvittAdat] = useState({})
    const [termekek, setTermekek] = useState([])
    const [felhasznalok, setFelhasznalok] = useState([])
    const [keresettTermekek, setKeresettTermekek] = useState([])
    const [keresettRendelesTermekek, setKeresettRendelesTermekek] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)

    const mezok = [
    {nev: "rendeles_felhasznalo_id", tipus: "select", opciok: {lista: felhasznalok, id_mezo: "felhasznalo_id", nev_mezo: "felhasznalo_nev"}, megjelenit: "Felhasználó:"},
    {nev: "rendeles_nev", tipus: "input", megjelenit: "Név:"},
    {nev: "rendeles_cim", tipus: "input", megjelenit: "Cím:"},
    {nev: "rendeles_telefonszam", tipus: "input", megjelenit: "Telefonszám:"}
    ]

    const leToltes = async () => {
        try {
            const termekResponse = await fetch(Cim.Cim + "/termek")
            const termekData = await termekResponse.json()

            const felhasznaloResponse = await fetch(Cim.Cim + "/felhasznalo")
            const felhasznaloData = await felhasznaloResponse.json()

            if (termekResponse.ok && felhasznaloResponse.ok) {
                setTermekek(termekData.map(termek => ({...termek, kivalaszott: false, keresett: undefined, darab: 1})))
                setKeresettTermekek(termekData.map(termek => ({...termek, kivalaszott: false, keresett: undefined, darab: 1})))
                setKeresettRendelesTermekek(termekData.map(termek => ({...termek, kivalaszott: false, keresett: undefined, darab: 1})))
                setFelhasznalok(felhasznaloData)
                setTolt(false)
            } else {
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
    }, [])

    const kezelesInput = (kulcs, ertek) => {
        setFelvittAdat(prev => ({
            ...prev,
            [kulcs]: ertek
        }))
    }

    const termekKivalaszt = (termek_id, rendelesbeMozgat) => {
        setTermekek(termekek.map(t => (t.termek_id === termek_id ? { ...t, kivalaszott: rendelesbeMozgat, darab: 1 } : t)))
        setKeresettTermekek(keresettTermekek.map(t => (t.termek_id === termek_id ? { ...t, kivalaszott: rendelesbeMozgat, darab: 1 } : t)))
        setKeresettRendelesTermekek(keresettRendelesTermekek.map(t => (t.termek_id === termek_id ? { ...t, kivalaszott: rendelesbeMozgat, darab: 1 } : t)))
    }

    const osszesTermekKivalaszt = (rendelesbeMozgat) => {
        if (rendelesbeMozgat) {
            let keresettTermekIdLista = keresettTermekek.every(t => t.keresett === undefined) ?
                keresettTermekek.map(t => t.termek_id) : keresettTermekek.filter(t => t.keresett).map(t => t.termek_id)

            setTermekek(termekek.map(t => (keresettTermekIdLista.includes(t.termek_id) ? { ...t, kivalaszott: rendelesbeMozgat, darab: 1 } : t)))
            setKeresettTermekek(keresettTermekek.map(t => ({ ...t, kivalaszott: rendelesbeMozgat, darab: 1 })))
            setKeresettRendelesTermekek(keresettRendelesTermekek.map(t => (keresettTermekIdLista.includes(t.termek_id) ? { ...t, kivalaszott: rendelesbeMozgat, darab: 1 } : t)))
        } else {
            let keresettRendelesTermekIdLista = keresettRendelesTermekek.every(t => t.keresett === undefined) ?
                keresettRendelesTermekek.map(t => t.termek_id) : keresettRendelesTermekek.filter(t => t.keresett).map(t => t.termek_id)

            setTermekek(termekek.map(t => (keresettRendelesTermekIdLista.includes(t.termek_id) ? { ...t, kivalaszott: rendelesbeMozgat, darab: 1 } : t)))
            setKeresettTermekek(keresettTermekek.map(t => (keresettRendelesTermekIdLista.includes(t.termek_id) ? { ...t, kivalaszott: rendelesbeMozgat, darab: 1 } : t)))
            setKeresettRendelesTermekek(keresettRendelesTermekek.map(t => ({ ...t, kivalaszott: rendelesbeMozgat, darab: 1 })))
        }
    }

    const darabValtoztat = (termek_id, ujDarab) => {
        setTermekek(termekek.map(t => (t.termek_id === termek_id ? { ...t, darab: ujDarab } : t)))
        setKeresettTermekek(keresettTermekek.map(t => (t.termek_id === termek_id ? { ...t, darab: ujDarab } : t)))
        setKeresettRendelesTermekek(keresettRendelesTermekek.map(t => (t.termek_id === termek_id ? { ...t, darab: ujDarab } : t)))
    }

    const felvittFuggveny = async () => {
        const biztos = window.confirm(`Biztosan hozzá szeretnéd adni a rendelést?`)

        if (biztos) {
            if (!mezok.every(mezo => mezoValidalas(felvittAdat, mezo))) {
                alert("Minden mezőt ki kell tölteni!")
                return
            }

            let body = {...felvittAdat}
            const kivalasztottTermekek = termekek.filter(t => t.kivalaszott).map(t => ({rendeles_termek_id: t.termek_id, rendeles_ar: t.termek_ar, rendeles_darab: t.darab}))
            body.rendeles_termekek = kivalasztottTermekek

            //rendeles_felhasznalo_id, rendeles_nev, rendeles_cim, rendeles_telefonszam, rendeles_datum, rendeles_teljesitve, rendeles_termekek
            const response = await fetch(Cim.Cim + "/rendelesHozzaadTermekkel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...body,
                    rendeles_datum: new Date().toISOString(),
                    rendeles_teljesitve: false
                })
            })

            const data = await response.json()

            if (response.ok) {
                alert(data.message || "Sikeres hozzáadás!") 
                onClose(true)
            } else {
                alert(data.error || "Hiba történt a hozzáadás során.")
            }
        }
    }

    if (tolt)
        return <div className="text-center">Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div className="text-center">Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Rendelés felvitele</h4>
                </div>
            </div>

            <div className="row mb-2 align-items-center">
                <div className="col-sm-4">
                    <label className="form-label" htmlFor="rendeles_felhasznalo_id">Felhasználó:</label>
                </div>
                <div className="col-sm-8">
                    <BeviteliMezo elem={mezok.find(m => m.nev === "rendeles_felhasznalo_id")} adatModFel={felvittAdat} kezelesInput={kezelesInput}/>
                </div>
            </div>

            <div className="row mb-2 align-items-center">
                <div className="col-sm-4">
                    <label className="form-label" htmlFor="rendeles_nev">Név:</label>
                </div>
                <div className="col-sm-8">
                    <BeviteliMezo elem={mezok.find(m => m.nev === "rendeles_nev")} adatModFel={felvittAdat} kezelesInput={kezelesInput}/>
                </div>
            </div>

            <div className="row mb-2 align-items-center">
                <div className="col-sm-4">
                    <label className="form-label" htmlFor="rendeles_cim">Cím:</label>
                </div>
                <div className="col-sm-8">
                    <BeviteliMezo elem={mezok.find(m => m.nev === "rendeles_cim")} adatModFel={felvittAdat} kezelesInput={kezelesInput}/>
                </div>
            </div>

            <div className="row mb-2 align-items-center">
                <div className="col-sm-4">
                    <label className="form-label" htmlFor="rendeles_telefonszam">Telefonszám:</label>
                </div>
                <div className="col-sm-8">
                    <BeviteliMezo elem={mezok.find(m => m.nev === "rendeles_telefonszam")} adatModFel={felvittAdat} kezelesInput={kezelesInput}/>
                </div>
            </div>

            <div className="row mb-2 align-items-center">
                <div className="col-12">
                    <div className="row mb-2">
                        <div className="col-6">
                            <h5 className="text-center">Termék</h5>
                            <div className="row mb-3">
                                <div className="col-11 text-center">
                                    <input style={{margin: "0px"}} type="text" className="form-control" placeholder="Keresés" onChange={(e) => keresRendeles(termekek, e.target.value, false, setKeresettTermekek)} />
                                </div>
                                <div className="col-1">
                                    <button className="btn btn-sm btn-light" onClick={() => osszesTermekKivalaszt(true)}>
                                        &gt;&gt;
                                    </button>
                                </div>
                            </div>
                            {keresettTermekek.map((elem, index) => (
                                (!elem.kivalaszott && (elem.keresett || elem.keresett === undefined)) && (
                                    <div className="row justify-content-center mb-3" key={index}>
                                        <div className="col-11 text-start">
                                            {elem.termek_nev}
                                        </div>
                                        <div className="col-1">
                                            <button className="btn btn-sm btn-light" onClick={() => termekKivalaszt(elem.termek_id, true)}>
                                                &gt;
                                            </button>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                        <div className="col-6">
                            <h5 className="text-center">Rendelés</h5>
                            <div className="row mb-3">
                                <div className="col-9 text-center">
                                    <input style={{margin: "0px"}} type="text" class="form-control" placeholder="Keresés" onChange={(e) => keresRendeles(termekek, e.target.value, true, setKeresettRendelesTermekek)} />
                                </div>
                                <div className="col-1">
                                    <button className="btn btn-sm btn-light" onClick={() => osszesTermekKivalaszt(false)}>
                                        &lt;&lt;
                                    </button>
                                </div>
                                <div className="col-2 text-center">Darabszám</div>
                            </div>
                            {keresettRendelesTermekek.map((elem, index) => (
                                (elem.kivalaszott && (elem.keresett || elem.keresett === undefined)) && (
                                    <div className="row justify-content-center mb-3" key={index}>
                                        <div className="col-9 text-start">
                                            {elem.termek_nev}
                                        </div>
                                        <div className="col-1">
                                            <button className="btn btn-sm btn-light" onClick={() => termekKivalaszt(elem.termek_id, false)}>
                                                &lt;
                                            </button>
                                        </div>
                                        <div className="col-2">
                                            <input style={{margin: "0px"}} type="text" className="form-control" value={elem.darab} onChange={(e) => darabValtoztat(elem.termek_id, e.target.value)} />
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <button className="btn" onClick={felvittFuggveny}>
                        <FaSave /> Mentés
                    </button>
                </div>
                <div className="col text-end">
                    <button className="btn" onClick={() => onClose(false)}>
                        <IoCloseSharp /> Bezárás
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RendelesFelvitel