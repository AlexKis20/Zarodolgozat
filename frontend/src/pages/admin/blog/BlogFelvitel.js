import { useState } from "react"
import { FaSave } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Cim from "../../../components/Cim"

const BlogFelvitel= ({  onClose }) => {
    const mezok = [
        {nev: "blog_cim", tipus: "input", megjelenit: "Blog cím:"},
        {nev: "blog_szoveg", tipus: "textarea", megjelenit: "Blog szöveg:"},
        {nev: "blog_kep", tipus: "input", megjelenit: "Blog kép:"}
    ]
    const [felvittAdat, setFelvittAdat] = useState({})
    const kezelesInput = (kulcs, ertek) => {
        setFelvittAdat(prev => ({
            ...prev,
            [kulcs]: ertek
        }))
    }

    const felvittFuggveny = async () => {
        const biztos = window.confirm(`Biztosan hozzá szeretnéd adni a(z) ${felvittAdat.blog_cim} blogot?`)

        if (biztos) {
            const response = await fetch(Cim.Cim + "/blogHozzaad", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(felvittAdat)
            })

            const data = await response.json()

            if (response.ok) {
                alert(data.message || "Sikeres hozzáadás!")
                onClose(true)
            } else {
                alert(data.error || "Hiba történt a hozzáadás során!")
            }
        }
    }

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h4>Blog felvitele</h4>
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
                                value={felvittAdat[elem.nev] || ""}
                                rows="3"
                                onChange={(e) => kezelesInput(elem.nev, e.target.value)}
                            />)
                        : (
                            <input
                                id={elem.nev}
                                type="text"
                                className="form-control"
                                value={felvittAdat[elem.nev] || ""}
                                onChange={(e) => kezelesInput(elem.nev, e.target.value)}
                            />)}
                    </div>
                </div>
            ))}

            <div className="row mt-3">
                <div className="col">
                    <button className="btn ml-2" onClick={felvittFuggveny}>
                        <FaSave /> Mentés
                    </button>
                    <button className="btn ml-2" onClick={() => onClose(false)}>
                        <IoCloseSharp /> Bezárás
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BlogFelvitel

