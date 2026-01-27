import * as AiIcons from "react-icons/ai";
import { IoTabletPortraitSharp } from "react-icons/io5";
import { LuType } from "react-icons/lu"; 
import { FiPercent } from "react-icons/fi";
import { TbBrandApple } from "react-icons/tb";
import { TbFileLike } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { CiShoppingBasket } from "react-icons/ci";

export const SidebarData = [
        {
        title: "Vezérlőpult",
        path: "/admin/vezerlopult",
        icon: <AiIcons.AiFillHome />
    },
    {
        title: "Kezdőlap",
        path: "/admin/kezdolap",
        icon: <TfiWrite />

    },
    {
        title: "Termék",
        path: "/admin/termek",
        icon: <IoTabletPortraitSharp />
    },
    {
        title: "Márka",
        path: "/admin/marka",
        icon: <TbBrandApple />
    },
    {
        title: "Típus",
        path: "/admin/tipus",
        icon: <LuType />
    },    
    {
        title: "Rendelés",
        path: "/admin/rendeles",
        icon: <CiShoppingBasket />
    },
    {
        title: "Akció",
        path: "/admin/akcio",
        icon: <FiPercent />
    },
    {
        title: "Vélemény",
        path: "/admin/velemeny",
        icon: <TbFileLike />
    }

];