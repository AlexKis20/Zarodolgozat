
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState,useEffect } from "react"
import Cim from "../Cim"
import "../App.css"





export default function Hirek() {
const [index, setIndex] = useState(0);
const [direction, setDirection] = useState(0);
   const [adatok,setAdatok]=useState([])
    const [tolt,setTolt]=useState(true)
    const [hiba,setHiba]=useState(false)

    useEffect(()=>{
    
        const leToltes=async ()=>{
            try{
                
                const response=await fetch(Cim.Cim+"/hirek")
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
        },[])

const changeItem = (dir) => {
setDirection(dir);
setIndex((prev) => (prev + dir + adatok.length) % adatok.length);
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
        <div className="d-flex flex-column align-items-center ">
  
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
        <p className="mt-4 text-lg font-medium">
        {adatok[index].blog_cim}
        </p>
        </motion.div>
        </AnimatePresence>
        </div>


        
        </div>
        );
        }

