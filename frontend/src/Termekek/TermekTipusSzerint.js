

import { useState,useEffect } from "react"
import Cim from "../Cim"
import "../App.css"

const TermekTipusSzerint=({kivalasztott})=>{
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)



    useEffect(()=>{

    const leToltes=async ()=>{
        try{
            let bemenet={
                "tipus_id":kivalasztott
            }
            const response=await fetch(Cim.Cim+"/tipusuTermek",{
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

        leToltes()
    },[kivalasztott])

    if (tolt)
        return (
            <div style={{textAlign:"center", fontSize: "20px"}}>Adatok betöltése folyamatban...</div>
                )
    else if (hiba)
        return (
            <div style={{  fontSize: "20px",color:"red"}}>Hiba</div>
                )

    else return (
        /*
        termek_id
        termek_nev
        termek_ar
        termek_szin
        termek_kijelzo
        termek_processzor
        termek_kapacitás
        termek_oprendszer
        termek_meret Csökkenő 1
        termek_leiras
        termek_kep
        termek_marka
        termek_tipus
        */
        <div>
                {/*kivalasztott*/}
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
           
        </div>
    )
}
export default TermekTipusSzerint

