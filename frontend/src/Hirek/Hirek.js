
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState,useEffect } from "react"
import Cim from "../Cim"
import "../App.css"





export default function Hirek() {
const [index, setIndex] = useState(0);
const [index2, setIndex2] = useState(0);
const [index3, setIndex3] = useState(0);
const [direction, setDirection] = useState(0);
const [direction2, setDirection2] = useState(0);
const [direction3, setDirection3] = useState(0);
    const [adatok,setAdatok]=useState([])
    const [adatok2,setAdatok2]=useState([])
    const [adatok3,setAdatok3]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)

    useEffect(()=>{
    
        const leToltes = async () => {
    try {
      const [r1, r2, r3] = await Promise.all([
        fetch(Cim.Cim + "/hirek1"),
        fetch(Cim.Cim + "/hirek2"),
        fetch(Cim.Cim + "/hirek3"),
      ]);

      if (!r1.ok || !r2.ok || !r3.ok) {
        throw new Error("Hiba a letöltésnél");
      }

      setAdatok(await r1.json());
      setAdatok2(await r2.json());
      setAdatok3(await r3.json());
      setTolt(false);
    } catch (e) {
      console.log(e);
      setHiba(true);
      setTolt(false);
    }
  };
    
            leToltes()
        },[])

const changeItem = (dir) => {
setDirection(dir);
setIndex((prev) => (prev + dir + adatok.length) % adatok.length);
};

const changeItem2 = (dir) => {
setDirection2(dir);
setIndex2((prev) => (prev + dir + adatok2.length) % adatok2.length);
};

const changeItem3 = (dir) => {
setDirection3(dir);
setIndex3((prev) => (prev + dir + adatok3.length) % adatok3.length);
};

if (tolt)
        return (
            <div style={{textAlign:"center"}}>Adatok betöltése folyamatban...</div>
                )
    else if (hiba)
        return (
            <div>Hiba</div>
                )       
    
    
else return (
<div>
<div className="d-flex flex-column align-items-center ">
                  <div className="blogTitle">Akció</div>
          
          {/* Gombok sorban, középre igazítva */}
          <div className="d-flex justify-content-center mb-3 gap-3">
            <button
              onClick={() => changeItem(-1)}
              className="btn"
              style={{
                background: "linear-gradient(135deg, #5a5fdc, #7b4dff)",
                color: "white",
                border: "none",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={() => changeItem(1)}
              className="btn"
              style={{
                background: "linear-gradient(135deg, #5a5fdc, #7b4dff)",
                color: "white",
                border: "none",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRight size={32} />
            </button>
            </div>
              

                {/* Középső tartalom */}
                <div className="w-[340px] h-[320px] overflow-hidden">
                <AnimatePresence mode="wait">
                <motion.div
                key={adatok[index].blog_id}
                initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-[#6f78e8] via-[#8a92ff] to-[#63c7b2]
                  rounded-2xl shadow-2xl ring-4 ring-black/30
                  p-4 text-center text-black"
                >
                <img
                src={`${Cim.Cim}/blogKep/${adatok[index].blog_kep}`}
                /*src={adatok[index].blog_kep}*/
                alt="slide"
                className="kep"
                />
                <p className="blogText">
                {adatok[index].blog_szoveg}
                </p>
                </motion.div>
                </AnimatePresence>
                </div>

      
      </div>

{/*------------------------------------------ Új megjelenések --------------------------------------------------*/  }


        <div className="d-flex flex-column align-items-center ">
                  <div className="blogTitle">Új megjelenés</div>
          
          {/* Gombok sorban, középre igazítva */}
          <div className="d-flex justify-content-center mb-3 gap-3">
            <button
              onClick={() => changeItem2(-1)}
              className="btn"
              style={{
                background: "linear-gradient(135deg, #5a5fdc, #7b4dff)",
                color: "white",
                border: "none",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={() => changeItem2(1)}
              className="btn"
              style={{
                background: "linear-gradient(135deg, #5a5fdc, #7b4dff)",
                color: "white",
                border: "none",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRight size={32} />
            </button>
            </div>
              

                {/* Középső tartalom */}
                <div className="w-[340px] h-[320px] overflow-hidden">
                <AnimatePresence mode="wait">
                <motion.div
                key={adatok2[index2].blog_id}
                initial={{ x: direction2 > 0 ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction2 > 0 ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-[#6f78e8] via-[#8a92ff] to-[#63c7b2]
                  rounded-2xl shadow-2xl ring-4 ring-black/30
                  p-4 text-center text-black"
                >
                <img
                src={`${Cim.Cim}/blogKep/${adatok2[index2].blog_kep}`}
                /*src={adatok[index].blog_kep}*/
                
                alt="slide"
                className="kep"
                />
                <p className="blogText">
                {adatok2[index2].blog_szoveg}
                </p>
                </motion.div>
                </AnimatePresence>
                </div>

      
      </div>



     
      


{/*------------------------------------------ Blog --------------------------------------------------*/  }


        <div className="d-flex flex-column align-items-center ">
                  <h2 className="blogTitle">Blog</h2>
          
          {/* Gombok sorban, középre igazítva */}
          <div className="d-flex justify-content-center mb-3 gap-3">
            <button
              onClick={() => changeItem3(-1)}
              className="btn"
              style={{
                background: "linear-gradient(135deg, #5a5fdc, #7b4dff)",
                color: "white",
                border: "none",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={() => changeItem3(1)}
              className="btn"
              style={{
                background: "linear-gradient(135deg, #5a5fdc, #7b4dff)",
                color: "white",
                border: "none",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRight size={32} />
            </button>
            </div>
              

                {/* Középső tartalom */}
                <div className="w-[340px] h-[320px] overflow-hidden">
                <AnimatePresence mode="wait">
                <motion.div
                key={adatok3[index3].blog_id}
                initial={{ x: direction3 > 0 ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction3 > 0 ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-[#6f78e8] via-[#8a92ff] to-[#63c7b2]
                  rounded-2xl shadow-2xl ring-4 ring-black/30
                  p-4 text-center text-black"
                >
                <img
                src={`${Cim.Cim}/blogKep/${adatok3[index3].blog_kep}`}
                /*src={adatok[index].blog_kep}*/
                
                alt="slide"
                className="kep"
                />
                <p className="blogText">
                  {adatok3[index3].blog_szoveg}
                </p>
                </motion.div>
                </AnimatePresence>
                </div>

      
      </div>
     



        </div>
        );
        }

