import { useState } from "react"
import Cim from "../Cim"
import "../App.css"

const KeresNev=()=>{
    const [nev, setNev] = useState("");
    const [minAr, setMinAr] = useState("");
    const [maxAr, setMaxAr] = useState("");
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)

    const keres=async ()=>{
        try{
            let bemenet={
                termek_nev: nev,
                termek_oprendszer: nev,
                minAr: Number(minAr),
                maxAr: Number(maxAr)
                
            }
            
            
            const response=await fetch(Cim.Cim+"/termeknevKeres",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(bemenet)
                    
            })
            const data=await response.json()
            //alert(JSON.stringify(data))
            //console.log(data)
            if (response.ok)
                {
                    setAdatok(data)
                    setTolt(false)}
            else 
                {
                    setHiba(true)
                    setTolt(false)
                }
            }
        catch (error){
            console.log(error)
            setHiba(true)
        }
        
    }

    return (
        <div>
            <div className="cim1">Keresés név szerint:</div><div className="cim2">Keresés ár szerint:</div>
            
            <div className="keretKeres">
                {/* Név */}
                <input
                    type="text"
                    placeholder="Add meg a keresendő szót..."
                    style={{ width: "300px" }}
                    onChange={(e) => setNev(e.target.value)}
                />

                {/* Minimum ár */}
                <input
                    type="number"
                    placeholder="Add meg a minimum árat..."
                    style={{ width: "300px" }}
                    onChange={(e) => setMinAr(e.target.value)}
                />

                {/* Maximum ár */}
                <input
                    type="number"
                    placeholder="Add meg a maximum árat..."
                    style={{ width: "300px" }}
                    onChange={(e) => setMaxAr(e.target.value)}
                />

            

            <br />
            <button className="btn btn-primary mt-3 mb-3" onClick={keres}>Keresés</button>
            <ul>
            {adatok.map((elem,index)=>(
                <div className="row" key={index}>
                    <div className="col-lg-6" > 
                                        <div className="doboz">
                                            <div className="jatekCim">{elem.termek_nev} </div>
                                            <div style={{textAlign:"center",marginTop:"20px"}}>
                                                <img style={{width:"150px"}} src={`${Cim.Cim}/termekKep/${elem.termek_kep}`} alt={elem.termek_nev} />
                                            </div>
                                            <div>Ár: {elem.termek_ar} </div>
                                            <div>Szín: {elem.termek_szin} </div>
                                            <div>Kijelző: {elem.termek_kijelzo} </div>
                                            <div>Processzor: {elem.termek_processzor} </div>
                                            <div>Kapacitás: {elem.termek_kapacitás} </div>
                                            <div>Operációs rendszer: {elem.termek_oprendszer} </div>
                                            <div>Méret: {elem.termek_meret} </div>
                                            {/* <div>Leírás: {elem.termek_leiras} </div> */}
                                            <div>Termék márkája: {elem.marka_nev} </div>
                                            <div className="jatekTipus">Termék típusa: {elem.tipus_nev} </div>
                    
                                        </div>
                                        </div>
                                        </div>
                ) ) }

            </ul>
            </div>
        </div>
    )

}

export default KeresNev

