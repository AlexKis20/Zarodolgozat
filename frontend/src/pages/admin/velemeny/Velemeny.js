import { useState, useEffect } from "react"
import Cim from "../../../Cim"
import DataTable from "../../../components/DataTable"
import Kereses from "../../../components/Kereses";
import Rendezes from "../../../components/Rendezes";
import { datumFuggveny } from "../../../utils/formazas";
import "../../../components/DataTable.css"

const Velemeny = () => {
    const [adatok, setAdatok] = useState([])
    const [keresettAdatok, setKeresettAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)
    const [ures, setUres] = useState(false)

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
            setTolt(false)
        }
    }

    useEffect(() => {
        leToltes()
    }, [siker])

    const torlesFuggveny = async (rowData) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd a véleményt?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/velemenyTorles/" + rowData.velemeny_id, {
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

    if (tolt)
        return <div className="text-center">Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div className="text-center">Hiba történt az adatok betöltése közben.</div>

    if (ures)
        return <div className="text-center">Nincs adat!</div>

    // DataTable oszlopok konfigurálása
    const columns = [
        {
            key: 'felhasznalo_nev',
            label: 'Felhasználó'
        },
        {
            key: 'velemeny_ertekeles',
            label: 'Értékelés',
            formatter: (value) => `${value} / 5`
        },
        {
            key: 'velemeny_szoveg',
            label: 'Vélemény'
        },
        {
            key: 'termek_nev',
            label: 'Termék'
        },
        {
            key: 'velemeny_datum',
            label: 'Dátum',
            formatter: (value) => datumFuggveny(value),
        }
    ]

    // DataTable konfiguráció
    const tableConfig = {
        data: keresettAdatok,
        columns: columns,
        visibleColumnsSmall: ['felhasznalo_nev', 'velemeny_ertekeles'],
        hiddenColumns: [],
        actions: {
            view: false,
            edit: false,
            delete: true,
            add: false,
        },
        onDelete: torlesFuggveny,
        primaryKey: 'velemeny_id',
    }

    return (
        <div className="container">
            <div className="row justify-content-center mb-3">
                <div className="col-6 text-center">
                    <Kereses adatok={adatok} keresettMezok={["velemeny_szoveg","felhasznalo_nev","termek_nev","velemeny_datum","velemeny_ertekeles"]} setKeresettAdatok={setKeresettAdatok} />
                </div>
                <div className="col-4 text-center">
                    <Rendezes adatok={keresettAdatok} setKeresettAdatok={setKeresettAdatok}>
                        <option value="felhasznalo_nev|1">Felhasználó neve növekvő</option>
                        <option value="felhasznalo_nev|2">Felhasználó neve csökkenő</option>
                        <option value="velemeny_ertekeles|1">Értékelés növekvő</option>
                        <option value="velemeny_ertekeles|2">Értékelés csökkenő</option>
                        <option value="velemeny_szoveg|1">Vélemény szövege növekvő</option>
                        <option value="velemeny_szoveg|2">Vélemény szövege csökkenő</option>
                        <option value="termek_nev|1">Termék neve növekvő</option>
                        <option value="termek_nev|2">Termék neve csökkenő</option>
                        <option value="velemeny_datum|1">Dátum növekvő</option>
                        <option value="velemeny_datum|2">Dátum csökkenő</option>
                    </Rendezes>
                </div>
            </div>

            <DataTable config={tableConfig} />
        </div>
    )
}

export default Velemeny
