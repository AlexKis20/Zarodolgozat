import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";

const MarkaAdat = ({ kivalasztott }) => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);

  useEffect(() => {
    const leToltes = async () => {
      try {
        let bemenet = { marka_id: kivalasztott };
        const response = await fetch(Cim.Cim + "/MarkajuTermek", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bemenet),
        });
        const data = await response.json();
        if (response.ok) {
          setAdatok(data);
          setTolt(false);
        } else {
          setHiba(true);
          setTolt(false);
        }
      } catch (error) {
        console.log(error);
        setHiba(true);
        setTolt(false);
      }
    };
    leToltes();
  }, [kivalasztott]);

  if (tolt) return <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>;
  if (hiba) return <div>Hiba</div>;

  return (
    <div>
      {/* KULCS: itt containerFlex-t használunk — NINCS row / col-md-4 */}
      <div className="containerFlex">
        {adatok.map((elem, index) => (
          <div key={index} className="doboz2">
            <div className="jatekCim">{elem.termek_nev}</div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <img
                style={{ width: "100%", maxWidth: "250px", height: "auto" }}
                src={`${Cim.Cim}/termekKep/${elem.termek_kep}`}
                alt={elem.termek_nev}
              />
            </div>

            <div>Ár: {elem.termek_ar}</div>
            <div>Szín: {elem.termek_szin}</div>
            <div>Kijelző: {elem.termek_kijelzo}</div>
            <div>Processzor: {elem.termek_processzor}</div>
            <div>Kapacitás: {elem.termek_kapacitás}</div>
            <div>Operációs rendszer: {elem.termek_oprendszer}</div>
            <div>Méret: {elem.termek_meret}</div>
            <div>Termék márkája: {elem.marka_nev}</div>
            <div className="jatekTipus">Termék típusa: {elem.tipus_nev}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarkaAdat;