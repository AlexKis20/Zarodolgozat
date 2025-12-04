import { useState } from 'react';
import MarkaKartya from './MarkaKartya';
import MarkaAdat from './MarkaAdat';


const MarkaKeres=()=>{
    const [kivalasztott,setKivalasztott]=useState(1)

    return (
        <div>
            <div style={{textAlign:"center",marginBottom:20}}>Termékek</div>
            <div className="row">
                <div className="col-sm-4">
                    <MarkaKartya kivalasztott={setKivalasztott}/>

                    
                    </div>
                <div className="col-sm-8">
                    <MarkaAdat kivalasztott={kivalasztott}/>
                </div>
            </div>

        </div>
    )
}
export default MarkaKeres