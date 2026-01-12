import { useState, useEffect } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Cim from "../../../components/Cim"

const  BlogModosit= ({ blog_id, onClose }) => {
    const mezok = [
        {nev: "blog_cim", tipus: "input", megjelenit: "Blog cím:"},
        {nev: "blog_szoveg", tipus: "textarea", megjelenit: "Blog szöveg:"},
        {nev: "blog_kep", tipus: "input", megjelenit: "Blog kép:"}
    ]
    const [modositottAdat, setModositottAdat] = useState({})
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)

    const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/blog/" + blog_id)
            const data = await response.json()

            if (response.ok) {
                setModositottAdat(data)
                console.log(data)
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
    }, [blog_id])

    const kezelesInput = (kulcs, ertek) => {
        setModositottAdat(prev => ({
            ...prev,
            [kulcs]: ertek
        }))
    }

    const modositFuggveny = async () => {
        const biztos = window.confirm(`Biztosan módosítani szeretnéd a(z) ${modositottAdat.blog_nev} blogot?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/blogModosit/" + blog_id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(modositottAdat)
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
                    <h4>Blog módosítása</h4>
                </div>
            </div>

            {mezok.map((elem, index) => (
                <div className="row mb-2 align-items-center" key={index}>
                    <div className="col-sm-4">
                        <label className="form-label" htmlFor={elem.nev}>{elem.megjelenit}</label>
                    </div>
                    <div className="col-sm-8">
                        {elem.tipus === "textarea" ? (
                            <textarea
                                id={elem.nev}
                                className="form-control"
                                value={modositottAdat[elem.nev] || ""}
                                rows="3"
                                onChange={(e) => kezelesInput(elem.nev, e.target.value)}
                            />)
                        : (
                            <input
                                id={elem.nev}
                                type="text"
                                className="form-control"
                                value={modositottAdat[elem.nev] || ""}
                                onChange={(e) => kezelesInput(elem.nev, e.target.value)}
                            />)}
                    </div>
                </div>
            ))}

            <div className="row mt-3">
                <div className="col">
                    <button className="btn ml-2" onClick={modositFuggveny}>
                        <FaSave /> Mentés
                    </button>
                    <button className="btn ml-2" onClick={() => onClose(false)}>
                        <IoCloseSharp />Bezárás
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BlogModosit

