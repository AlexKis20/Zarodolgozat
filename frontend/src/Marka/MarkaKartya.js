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
        return <div style={{ textAlign: "center" , fontSize: "20px"}}>Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div style={{  fontSize: "20px",color:"red"}}>Hiba történt az adatok betöltése közben.</div>

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {adatok.map((elem, index) => (
                <div
        key={index}
        onClick={() => kivalasztott(elem.marka_id)}
        style={{
            width: "160px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            cursor: "pointer",
            background: "#ffffff",
            fontWeight: "600",
            boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
            transition: "all 0.2s ease-in-out",
            userSelect: "none",
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f0f0f0"
            e.currentTarget.style.transform = "scale(1.05)"
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.background = "#ffffff"
            e.currentTarget.style.transform = "scale(1)"
        }}
    >
        {elem.marka_nev}
    </div>
            ))}
        </div>
    )
}

export default MarkaKartya