import { useState, useEffect } from "react"
import Cim from "../Cim"

const MarkaKartya = ({ kivalasztott }) => {
    const [adatok, setAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)

    useEffect(() => {
        const leToltes = async () => {
            try {
                const response = await fetch(Cim.Cim + "/marka")
                const data = await response.json()

                if (response.ok) {
                    setAdatok(data)
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

        leToltes()
    }, [kivalasztott])

    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {adatok.map((elem, index) => (
                <div
                    key={index}
                    onClick={() => kivalasztott(elem.marka_id)}
                    style={{
                        padding: "10px 15px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        cursor: "pointer",
                        background: "#f8f8f8",
                        transition: "0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#e6e6e6")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#f8f8f8")}
                >
                    {elem.marka_nev}
                </div>
            ))}
        </div>
    )
}

export default MarkaKartya