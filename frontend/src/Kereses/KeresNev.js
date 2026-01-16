import { useState } from "react"
import Cim from "../Cim"
import "../App.css"

const KeresNev=()=>{
    const [nev, setNev] = useState("");
    const [minAr, setMinAr] = useState("");
    const [maxAr, setMaxAr] = useState("");
    const [adatok,setAdatok]=useState([])
    //const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)

    const keres=async ()=>{
        setHiba(false)
        try{
            let bemenet={
                termek_nev: nev,
                termek_oprendszer: nev,
                minAr: minAr,
                maxAr: maxAr
                
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
                    //setTolt(false)
                }
            else 
                {
                    setHiba(true)
                    //setTolt(false)
                    
                }
            }
        catch (error){
            console.log(error)
            setHiba(true)
        }
        
    }
    return (
        <div>
    {/* KERESŐ SOR */}
    <div className="keretKeres">
        {/* NÉV */}
        <div className="inputBlokk">
            <label className="label">Keresendő név</label>    
            <input
                type="text"
                placeholder="Add meg a keresendő szót..."
                onChange={(e) => setNev(e.target.value)}
            />
        </div>

        {/* MINIMUM ÁR */}
        <div className="inputBlokk">
            <label className="label">Minimum ár</label>
            <input
                type="text"
                placeholder="0"
                onChange={(e) => setMinAr(e.target.value)}
            />
        </div>

        {/* MAXIMUM ÁR */}
        <div className="inputBlokk">
            <label className="label">Maximum ár</label>
            <input
                type="text"
                placeholder="0"
                onChange={(e) => setMaxAr(e.target.value)}
            />
        </div>
    </div>

    {/* ✅ EZ MÁR ÚJ SORBAN VAN */}
    <div className="talalat">
        <button className="btn btn-primary mt-3 mb-3" onClick={keres}>
            Keresés
        </button>

        { hiba  ? <div style={{  fontSize: "20px",color:"red"}}>Hiba!</div> :
        <div className="containerFlex">
  {adatok.map((elem, index) => (
    <div key={index} className="productCard">
      
      <h2 className="productTitle">{elem.termek_nev}</h2>

      <div className="imageWrapper">
        <img
          src={`${Cim.Cim}/termekKep/${elem.termek_kep}`}
          alt={elem.termek_nev}
        />
      </div>

      <div className="price">💰 {elem.termek_ar} Ft</div>

      <div className="specList">
  {elem.termek_szin && (
    <span><strong>Szín:</strong> {elem.termek_szin}</span>
  )}

  {elem.termek_kijelzo && (
    <span><strong>Kijelző:</strong> {elem.termek_kijelzo}</span>
  )}

  {elem.termek_processzor && (
    <span><strong>Processzor:</strong> {elem.termek_processzor}</span>
  )}

  {elem.termek_kapacitás && (
    <span><strong>Kapacitás:</strong> {elem.termek_kapacitás}</span>
  )}

  {elem.termek_oprendszer && (
    <span><strong>OS:</strong> {elem.termek_oprendszer}</span>
  )}

  {elem.termek_meret && (
    <span><strong>Méret:</strong> {elem.termek_meret}</span>
  )}

  {elem.marka_nev && (
    <span><strong>Márka:</strong> {elem.marka_nev}</span>
  )}
</div>

      <div className="productType">{elem.tipus_nev}</div>

    </div>
  ))}
</div>
        }
    </div>
</div>
    )

}

export default KeresNev

