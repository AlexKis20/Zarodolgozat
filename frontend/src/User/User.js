//useState, useEffect,state-be le tárolni,
import { useState,useEffect } from "react"
import Cim from "../Cim"
import { div } from "framer-motion/m";

const User=()=>{
    const [kosar, setKosar] = useState([]);
    const [kosarSzoveg, setKosarSzoveg] = useState("");
    const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)

    const [vegosszeg, setVegosszeg] = useState(0);
    const [megrendeles, setMegrendeles] = useState(false);
    const [nev, setNev] = useState("");
    const [lakcim, setLakcim] = useState("");
    const [telefonszam, setTelefonszam] = useState("");
  const felhasznaloId = localStorage.getItem("fid"); 

    useEffect(() => {
        // const storedKosar = localStorage.getItem("kosar");
        // if (storedKosar) {
        //     setKosar(storedKosar.split(","));
        //     setKosarSzoveg(storedKosar);
        // }
        //alert(localStorage.getItem("fid"))
        const leToltes=async ()=>{
        try{
            let bemenet={
                "termekIds": localStorage.getItem("kosar")
            }
            const response=await fetch(Cim.Cim+"/termekSelectIn",{
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
    }, [kosarSzoveg]);

    useEffect(() => {
  const osszeg = adatok.reduce((sum, elem) => {
    return sum + Number(elem.termek_ar);
  }, 0);

  setVegosszeg(osszeg);
}, [adatok]);

const rendelesKuldes = async () => {
  try {
    // ---- Automatikus adatok ----
    
    const datum = new Date().toISOString().slice(0, 10);

    // ---- Termékek összeállítása ----
    const rendelesTermekek = adatok.map((termek) => ({
      rendeles_termek_id: termek.termek_id,
      rendeles_ar: termek.termek_ar,
      rendeles_darab: 1
    }));

    // ---- Küldendő objektum ----
    const kuldendoAdat = {
      rendeles_felhasznalo_id: felhasznaloId,
      rendeles_nev: nev,
      rendeles_cim: lakcim,
      rendeles_telefonszam: telefonszam,
      rendeles_datum: datum,
      rendeles_teljesitve: 0,
      rendeles_termekek: rendelesTermekek
    };

    const response = await fetch(
      Cim.Cim + "/rendelesHozzaadTermekkel",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(kuldendoAdat)
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Sikeres megrendelés!");

      // kosár ürítése
      localStorage.removeItem("kosar");
      setAdatok([]);
      setVegosszeg(0);
      setMegrendeles(false);
    } else {
      alert("Hiba: " + data.error);
    }

  } catch (error) {
    console.log(error);
    alert("Szerver hiba!");
  }
};

const termekTorlesKosarbol = (torlendoId) => {
  const kosarString = localStorage.getItem("kosar");
  if (!kosarString) return;
  let kosarTomb = kosarString.split(",");
  kosarTomb = kosarTomb.filter(
    (id) => Number(id) !== Number(torlendoId)
  );

  // ---- Ha üres lett ----
  if (kosarTomb.length === 0) {
    localStorage.removeItem("kosar");

    setKosarSzoveg("");
    setAdatok([]);        // kártyák törlése
    setVegosszeg(0);     // összeg nullázás
    return;
  }

  // ---- Ha maradt termék ----
  const ujKosar = kosarTomb.join(",");

  localStorage.setItem("kosar", ujKosar);
  setKosarSzoveg(ujKosar);
};

    return (
        <div>
      <h2>Kosár</h2>

      {/* <div>
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
      )} */}

      <div className="pageLayout">



<div className="kosarOldal">
<div className="containerFlex">
  {adatok.map((elem, index) => (
    <div key={index} className="productCard">

      {/* Törlés gomb */}
  <button
    className="torlesGomb"
    onClick={() => {
  if (window.confirm("Biztos törlöd a terméket a kosárból?")) {
    termekTorlesKosarbol(elem.termek_id);
  }
}}
  >
    ✖
  </button>
      
      <h2 className="productTitle">{elem.termek_nev}</h2>

      <div className="imageWrapper">
        <img
          src={`${Cim.Cim}/termekKep/${elem.termek_kep}`}
          alt={elem.termek_nev}
        />
      </div>

      <div className="price">💵 {elem.termek_ar} Ft</div>

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

      






    </div>
  ))}
</div>


</div>


<div className="osszegzoWrapper">
  <div className="osszegzoPanel">
    <h3>Összegzés</h3>

    <p><strong>Végösszeg:</strong></p>
    <h2>{vegosszeg} Ft</h2>

    <button onClick={() => setMegrendeles(true)}>
      Vásárlás folytatása
    </button>
  </div>

  {megrendeles && (
    <div className="megrendelesPanel">
      <h2>Megrendelési adatok</h2>

      <label>
        Név:
        <input
          type="text"
          value={nev}
          onChange={(e) => setNev(e.target.value)}
        />
      </label>

      <label>
        Lakcím:
        <input
          type="text"
          value={lakcim}
          onChange={(e) => setLakcim(e.target.value)}
        />


      </label>


            <label>
        Telefonszám:
        <input
          type="text"
          value={telefonszam}
          onChange={(e) => setTelefonszam(e.target.value)}
        />
      </label>

      {/* Megrendelés gomb */}
    
  <div className="gombKeret">
  <button
    className="vasarlasGomb"
    onClick={rendelesKuldes}
  >
    Megrendelés
  </button>
</div>





    </div>
  )}

  
</div>
</div>
</div>
    )
    
}
export default User