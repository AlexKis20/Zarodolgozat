//useState, useEffect,state-be le tárolni,
import { useState,useEffect } from "react"

const User=()=>{
    const [kosar, setKosar] = useState([]);
    const [kosarSzoveg, setKosarSzoveg] = useState("");

    useEffect(() => {
        const storedKosar = localStorage.getItem("kosar");
        if (storedKosar) {
            setKosar(storedKosar.split(","));
            setKosarSzoveg(storedKosar);
        }
    }, []);

    return (
        <div>
      <h2>Kosár</h2>

      <div>
        {kosar.map((termek_id, index) => (
          <div key={index}>
            Termék ID: {termek_id}
          </div>
          
        ))}

      </div>
      {kosar.length === 0 && <div>A kosár üres.</div>}
      {kosar.length > 0 && (
        <div>
          <h3>Kosár tartalma (szövegként):</h3>
          <div>{kosarSzoveg}</div>
        </div>
      )}
    </div>
    )
}
export default User