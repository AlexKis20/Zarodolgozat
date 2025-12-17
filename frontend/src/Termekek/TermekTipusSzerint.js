

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
                <div class="row">
                {adatok.map((elem,index)=>(
                    <div key={index} className="col-sm-4" > 
                    <div className="doboz">
                        <div className="jatekCim">{elem.termek_nev} </div>
                        <div style={{textAlign:"center",marginTop:"20px"}}>
                            <img style={{width:"200px"}} src={`${Cim.Cim}/termekKep/${elem.termek_kep}`} alt={elem.termek_nev} />
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
                ))}
                </div>
           
        </div>
    )
}
export default TermekTipusSzerint

