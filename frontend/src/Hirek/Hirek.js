
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState,useEffect } from "react"
import Cim from "../Cim"
import "../App.css"

const items = [
{
id: 1,
image: "https://via.placeholder.com/300x200",
text: "Ez az első elem szövege",
},
{
id: 2,
image: "https://via.placeholder.com/300x200/aaa",
text: "Ez a második elem szövege",
},
{
id: 3,
image: "https://via.placeholder.com/300x200/777",
text: "Ez a harmadik elem szövege",
},
];



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
setIndex((prev) => (prev + dir + items.length) % items.length);
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
        <div className="flex items-center justify-center min-h-screen gap-6">
        {/* Bal nyíl */}
        <button
        onClick={() => changeItem(-1)}
        className="p-2 rounded-full hover:bg-gray-200"
        >
        <ChevronLeft size={32} />
        </button>


        {/* Középső tartalom */}
        <div className="w-[340px] h-[320px] overflow-hidden">
        <AnimatePresence mode="wait">
        <motion.div
        key={adatok[index].blog_id}
        initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-4 text-center"
        >
        <img
        src={`${Cim.Cim}/blogKep/${adatok[index].blog_kep}`}
        /*src={adatok[index].blog_kep}*/
        alt="slide"
        className="w-full h-[200px] object-cover rounded-xl"
        />
        <p className="mt-4 text-lg font-medium">
        {adatok[index].blog_cim}
        </p>
        </motion.div>
        </AnimatePresence>
        </div>


        {/* Jobb nyíl */}
        <button
        onClick={() => changeItem(1)}
        className="p-2 rounded-full hover:bg-gray-200"
        >
        <ChevronRight size={32} />
        </button>
        </div>
        );
        }

