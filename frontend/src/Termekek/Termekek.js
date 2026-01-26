import { useState } from 'react';
import LenyiloTipus from './LenyiloTipus';
import TermekTipusSzerint from './TermekTipusSzerint';


const Termekek=()=>{
    const [kivalasztott,setKivalasztott]=useState(1)
    
    return (
        <div>
            <div style={{textAlign:"center",marginBottom: "20px", fontSize: "30px", fontWeight: "bold"}}>Termékek</div>
            <div className="row">
                <div className="col-sm-4">
                   
                    <LenyiloTipus kivalasztott={setKivalasztott}/>
                    </div>
                <div className="col-sm-8">
                    <TermekTipusSzerint kivalasztott={kivalasztott}/>
                </div>
            </div>

        </div>
    )
}
export default Termekek

