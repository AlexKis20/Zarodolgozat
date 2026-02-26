import { useState, useEffect } from "react";
import Cim from "../Cim";
import "../App.css";

const TermekTipusSzerint = ({ kivalasztott }) => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);

  const token = localStorage.getItem("token");
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

  // ---------------- TERMÉKEK BETÖLTÉSE ----------------
  useEffect(() => {
    const leToltes = async () => {
      try {
        const bemenet = { tipus_id: kivalasztott };

        const response = await fetch(Cim.Cim + "/tipusuTermek", {
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
      }
    };

    leToltes();
  }, [kivalasztott]);

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

  // ---------------- KOSÁR ----------------
  const vasarlas = (termek_id) => {
    alert("A termék kosárba lett helyezve!");
    let kosar = localStorage.getItem("kosar");

    if (kosar === null) kosar = "" + termek_id;
    else kosar = kosar + "," + termek_id;

    localStorage.setItem("kosar", kosar);
  };

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

  // ---------------- BETÖLTÉS / HIBA ----------------
  if (tolt)
    return (
      <div style={{ textAlign: "center", fontSize: "20px" }}>
        Adatok betöltése...
      </div>
    );

  if (hiba)
    return (
      <div style={{ fontSize: "20px", color: "red" }}>
        Hiba történt
      </div>
    );

  // ---------------- RENDER ----------------
  return (
    <div>
      <div className="containerFlex">
        {adatok.map((elem) => (
          <div key={elem.termek_id} className="productCard">
            <h2 className="productTitle">
              {elem.termek_nev}
            </h2>

            <div className="imageWrapper">
              <img
                src={`${Cim.Cim}/termekKep/${elem.termek_kep}`}
                alt={elem.termek_nev}
              />
            </div>

            <div className="price">
              💵 {elem.termek_ar} Ft
            </div>

            <div className="specList">
              {elem.marka_nev && (
                <span>
                  <strong>Márka:</strong>{" "}
                  {elem.marka_nev}
                </span>
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
            </div>
<button
  onClick={() =>
    velemenyekBetoltese(elem.termek_id)
  }
>
  Vélemények megtekintése
</button>
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
            {loggedIn && (
              <button
                onClick={() =>
                  vasarlas(elem.termek_id)
                }
                className="cartButton"
              >
                🛒
              </button>
            )}
          </div>
        ))}
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
  );
};

export default TermekTipusSzerint;
