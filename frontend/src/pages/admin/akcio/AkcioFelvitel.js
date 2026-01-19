import { useState, useEffect } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Cim from "../../../components/Cim"
import { keresAkcio } from "./keresAkcio";



const AkcioFelvitel = ({  onClose }) => {
    const [felvittAdat, setFelvittAdat] = useState({})
    const [termekek, setTermekek] = useState([])
    const [keresettTermekek, setKeresettTermekek] = useState([])
    const [keresettAkciosTermekek, setKeresettAkciosTermekek] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)

    const leToltes = async () => {
        try {
            const termekResponse = await fetch(Cim.Cim + "/termek")
            const termekData = await termekResponse.json()

            if (termekResponse.ok) {
                setFelvittAdat({akcio_nev: "", akcio_kedvezmeny: "", akcio_tipus: "szazalek", akcio_kezdete: "", akcio_vege: ""})
                setTermekek(termekData.map(termek => ({...termek, kivalaszott: false, keresett: undefined})))
                setKeresettTermekek(termekData.map(termek => ({...termek, kivalaszott: false, keresett: undefined})))
                setKeresettAkciosTermekek(termekData.map(termek => ({...termek, kivalaszott: false, keresett: undefined})))
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

    const termekKivalaszt = (termek_id, akciobaMozgat) => {
        setTermekek(termekek.map(t => (t.termek_id === termek_id ? { ...t, kivalaszott: akciobaMozgat } : t)))
        setKeresettTermekek(keresettTermekek.map(t => (t.termek_id === termek_id ? { ...t, kivalaszott: akciobaMozgat } : t)))
        setKeresettAkciosTermekek(keresettAkciosTermekek.map(t => (t.termek_id === termek_id ? { ...t, kivalaszott: akciobaMozgat } : t)))
    }

    const osszesTermekKivalaszt = (akciobaMozgat) => {
        if (akciobaMozgat) {
            let keresettTermekIdLista = keresettTermekek.every(t => t.keresett === undefined) ?
                keresettTermekek.map(t => t.termek_id) : keresettTermekek.filter(t => t.keresett).map(t => t.termek_id)

            setTermekek(termekek.map(t => (keresettTermekIdLista.includes(t.termek_id) ? { ...t, kivalaszott: akciobaMozgat } : t)))
            setKeresettTermekek(keresettTermekek.map(t => ({ ...t, kivalaszott: akciobaMozgat })))
            setKeresettAkciosTermekek(keresettAkciosTermekek.map(t => (keresettTermekIdLista.includes(t.termek_id) ? { ...t, kivalaszott: akciobaMozgat } : t)))
        } else {
            let keresettAkciosTermekIdLista = keresettAkciosTermekek.every(t => t.keresett === undefined) ?
                keresettAkciosTermekek.map(t => t.termek_id) : keresettAkciosTermekek.filter(t => t.keresett).map(t => t.termek_id)

            setTermekek(termekek.map(t => (keresettAkciosTermekIdLista.includes(t.termek_id) ? { ...t, kivalaszott: akciobaMozgat } : t)))
            setKeresettTermekek(keresettTermekek.map(t => (keresettAkciosTermekIdLista.includes(t.termek_id) ? { ...t, kivalaszott: akciobaMozgat } : t)))
            setKeresettAkciosTermekek(keresettAkciosTermekek.map(t => ({ ...t, kivalaszott: akciobaMozgat })))
        }
    }

    const felvittFuggveny = async () => {
        const biztos = window.confirm(`Biztosan hozzá szeretnéd adni a(z) ${felvittAdat.akcio_nev} akciót?`)

        if (biztos) {
            let body = {...felvittAdat}
            const kivalasztottTermekIdLista = termekek.filter(t => t.kivalaszott).map(t => t.termek_id)
            body.termek_id_lista = kivalasztottTermekIdLista
            console.log(body)

            const response = await fetch(Cim.Cim + "/akcioHozzaad", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            const data = await response.json()

            if (response.ok) {
                alert(data.message || "Sikeres módosítás!") 
                onClose(true)
            } else {
                alert(data.error || "Hiba történt a módosítás során")
            }
        }
    }

    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Akció felvitele</h4>
                </div>
            </div>

            <div className="row mb-2 align-items-center">
                <div className="col-sm-4">
                    <label className="form-label" htmlFor="akcio_nev">Akció neve:</label>
                </div>
                <div className="col-sm-8">
                    <input
                        id="akcio_nev"
                        type="text"
                        className="form-control"
                        value={felvittAdat.akcio_nev || ""} 
                        onChange={(e) => kezelesInput("akcio_nev", e.target.value)}
                    />
                </div>
            </div>

            <div className="row mb-2 align-items-center">
                <div className="col-sm-4">
                    <label className="form-label" htmlFor="akcio_kedvezmeny">Kedvezmény:</label>
                </div>
                <div className="col-sm-8">
                    <div className="row mb-2">
                        <div className="col-6">
                            <input
                                id="akcio_kedvezmeny"
                                type="text"
                                className="form-control"
                                value={felvittAdat.akcio_kedvezmeny || ""} 
                                onChange={(e) => kezelesInput("akcio_kedvezmeny", e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <select
                                id="akcio_tipus"
                                className="form-control"
                                style={{margin: "5px"}}
                                onChange={(e) => kezelesInput("akcio_tipus", e.target.value)}
                                value={felvittAdat.akcio_tipus === "ft" ? "ft" : "szazalek"}
                            >
                                <option value="szazalek">%</option>
                                <option value="ft">Ft</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-2 align-items-center">
                <div className="col-sm-4">
                    <label className="form-label" htmlFor="akcio_kezdete">Akció kezdete:</label>
                </div>
                <div className="col-sm-8">
                    <input
                        id="akcio_kezdete"
                        type="datetime-local"
                        className="form-control"
                        onChange={(e) => kezelesInput("akcio_kezdete", e.target.value)}
                    />
                </div>
            </div>

            <div className="row mb-2 align-items-center">
                <div className="col-sm-4">
                    <label className="form-label" htmlFor="akcio_vege">Akció vége:</label>
                </div>
                <div className="col-sm-8">
                    <input
                        id="akcio_vege"
                        type="datetime-local"
                        className="form-control"
                        onChange={(e) => kezelesInput("akcio_vege", e.target.value)}
                    />
                </div>
            </div>

            <div className="row mb-2 align-items-center">
                <div className="col-12">
                    <div className="row mb-2">
                        <div className="col-6">
                            <h5 className="text-center">Nem akciós</h5>
                            <div className="row mb-3">
                                <div className="col-11 text-center">
                                    <input style={{margin: "0px"}} type="text" class="form-control" placeholder="Keresés" onChange={(e) => keresAkcio(termekek, e.target.value, false, setKeresettTermekek)} />
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
                            <h5 className="text-center">Akciós</h5>
                            <div className="row mb-3">
                                <div className="col-11 text-center">
                                    <input style={{margin: "0px"}} type="text" class="form-control" placeholder="Keresés" onChange={(e) => keresAkcio(termekek, e.target.value, true, setKeresettAkciosTermekek)} />
                                </div>
                                <div className="col-1">
                                    <button className="btn btn-sm btn-light" onClick={() => osszesTermekKivalaszt(false)}>
                                        &lt;&lt;
                                    </button>
                                </div>
                            </div>
                            {keresettAkciosTermekek.map((elem, index) => (
                                (elem.kivalaszott && (elem.keresett || elem.keresett === undefined)) && (
                                    <div className="row justify-content-center mb-3" key={index}>
                                        <div className="col-11 text-start">
                                            {elem.termek_nev}
                                        </div>
                                        <div className="col-1">
                                            <button className="btn btn-sm btn-light" onClick={() => termekKivalaszt(elem.termek_id, false)}>
                                                &lt;
                                            </button>
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

export default AkcioFelvitel