import { useState ,  useEffect } from "react"
import Cim from "../Cim"
import "../App.css"


const KeresNev=()=>{
    const [nev, setNev] = useState("");
    const [minAr, setMinAr] = useState("");
    const [maxAr, setMaxAr] = useState("");
    const [adatok,setAdatok]=useState([])
    //const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const loggedIn = !!token;

    // ⭐ Értékelések state
  const [ertekelesek, setErtekelesek] = useState({});
  const [aktivTermek, setAktivTermek] = useState(null);
  const [csillagPont, setCsillagPont] = useState(0);
  const [velemenySzoveg, setVelemenySzoveg] = useState("");
  const [modalNyitva, setModalNyitva] = useState(false);
  const userId = localStorage.getItem("fid");


  const [velemenyek, setVelemenyek] = useState({});
const [nyitottTermek, setNyitottTermek] = useState(null);

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

    const velemenyekBetoltese = async (termekId) => {
  try {
    const res = await fetch(
      Cim.Cim + `/velemenyek/${termekId}`
    );

    if (!res.ok) return;

    const data = await res.json();

    setVelemenyek((prev) => ({
      ...prev,
      [termekId]: data,
    }));

    setNyitottTermek(termekId);
  } catch (err) {
    console.log(err);
  }
};

    // ---------------- VÉLEMÉNY ÁTLAG BETÖLTÉS ----------------
      useEffect(() => {
        adatok.forEach((termek) => {
          velemenyBetoltes(termek.termek_id);
        });
      }, [adatok]);
    
      const velemenyBetoltes = async (termekId) => {
        try {
          const res = await fetch(
            Cim.Cim + `/velemenyAtlag/${termekId}`
          );
          const data = await res.json();
    
          setErtekelesek((prev) => ({
            ...prev,
            [termekId]: data,
          }));
        } catch (err) {
          console.log(err);
        }
      };

//kosárba helyezés---------------------------------
    const vasarlas = (termek_id) => {
        alert("A termék kosárba lett helyezve!");
        let kosar = localStorage.getItem("kosar");
        if (kosar===null){
            kosar=""+termek_id;
            //alert("ures")
        }
        else{
            kosar=kosar+","+termek_id;
        }
        
        localStorage.setItem('kosar', kosar);
    }

    // ---------------- CSILLAG KATT ----------------
      const csillagKattintas = (termekId, pont) => {
        setAktivTermek(termekId);
        setCsillagPont(pont);
        setModalNyitva(true);
      };
    
      // ---------------- VÉLEMÉNY KÜLDÉS ----------------
      
      const velemenyKuldes = async () => {
      try {
    
        if (!csillagPont) {
          alert("Adj értékelést!");
          return;
        }
    
        if (!velemenySzoveg.trim()) {
          alert("Írj véleményt!");
          return;
        }
        //alert(userId)
        const adat = {
          velemeny_felhasz_id: userId,
          velemeny_termek_id: aktivTermek,
          velemeny_ertekeles: csillagPont,
          velemeny_szoveg: velemenySzoveg
        };
    
        const res = await fetch(
          Cim.Cim + "/ujVelemeny",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(adat)
          }
        );
    
        const valasz = await res.json();
        console.log(valasz);
    
        if (res.ok) {
          alert("Vélemény elküldve!");
    
          setModalNyitva(false);
          setVelemenySzoveg("");
          setCsillagPont(0);
    
          velemenyBetoltes(aktivTermek);
        }
    
      } catch (err) {
        console.log(err);
      }
      };
//-------------------------------------------------

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

  {/* ⭐ ÉRTÉKELÉS */}
              <div className="ertekelesBlokk">
                <div className="csillagSor">
                  {[1, 2, 3, 4, 5].map((pont) => (
                    <span
                      key={pont}
                      className="csillag"
                      onClick={() =>
                        csillagKattintas(
                          elem.termek_id,
                          pont
                        )
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="ertekelesInfo">
                  Átlag:{" "}
                  {ertekelesek[elem.termek_id]
                    ?.atlag || 0}{" "}
                  ⭐
                  <br />
                  Értékelők:{" "}
                  {ertekelesek[elem.termek_id]
                    ?.db || 0}{" "}
                  fő
                </div>
              </div>

              <button
  onClick={() =>
    velemenyekBetoltese(elem.termek_id)
  }
>
  Vélemények megtekintése
</button>
</div>
{nyitottTermek === elem.termek_id &&
  velemenyek[elem.termek_id] && (
    <div className="velemenyLista">
      {velemenyek[elem.termek_id].map((v) => (
        <div
          key={v.velemeny_id}
          className="velemenyDoboz"
        >
          <div>
            {"⭐".repeat(v.velemeny_ertekeles)}
          </div>

          <div>{v.velemeny_szoveg}</div>

          <small>
            {new Date(
              v.velemeny_datum
            ).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  )}

      <div className="productType">{elem.tipus_nev}</div>





{loggedIn ? (
            <button onClick={() => vasarlas(elem.termek_id)} className="cartButton">
                <span className="cartIcon">🛒</span>
            </button>
        ) : null}


        
    </div>
  ))}
</div>
        }
    </div>

{/* ⭐ MODAL – MAPON KÍVÜL */}
      {modalNyitva && (
        <div className="modalHatter">
          <div className="modalDoboz">
            <h3>Vélemény írása</h3>

            <p>
              Értékelés: {csillagPont} ⭐
            </p>

            <textarea
              placeholder="Írd le a véleményed..."
              value={velemenySzoveg}
              onChange={(e) =>
                setVelemenySzoveg(
                  e.target.value
                )
              }
            />

            <div className="modalGombok">
              <button onClick={velemenyKuldes}>
                Küldés
              </button>

              <button
                onClick={() =>
                  setModalNyitva(false)
                }
              >
                Mégse
              </button>
            </div>
          </div>
        </div>
      )}

</div>
    )

}

export default KeresNev

