import { useState, useEffect } from "react"
import Cim from "../../components/Cim"

const TipusTorles= ({ kivalasztott }) => {
    const [adatok, setAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    const [siker, setSiker] = useState(false)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/tipus")
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

    useEffect(() => {
        leToltes()
    }, [siker])

    const torlesFuggveny = async (tipus_id, tipus_nev) => {
        const biztos = window.confirm(`Biztosan törölni szeretnéd a(z) ${tipus_nev} tipust?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/tipusTorles/" + tipus_id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })

            const data = response.json()

            if (response.ok) {
                alert(data["message"])
                setSiker(prev => !prev)
            } else {
                alert(data["error"])
            }
        }
    }

    if (tolt)
        return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>

    if (hiba)
        return <div>Hiba történt az adatok betöltése közben.</div>

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Termék neve</th>

                    </tr>
                </thead>
                <tbody>
                    {adatok.map((elem, index) => (
                        <tr key={index}>
                            <td>{elem.tipus_nev}</td>


                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => torlesFuggveny(elem.tipus_id, elem.tipus_nev)}
                                >
                                    
                                    <img style={{height:"30px",width:"30px"}} src="kuka.png"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TipusTorles