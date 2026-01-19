import * as AiIcons from "react-icons/ai";
import { IoTabletPortraitSharp } from "react-icons/io5";
import { LuType } from "react-icons/lu"; 
import { FiPercent } from "react-icons/fi";
import { TbBrandApple } from "react-icons/tb";
import { TbFileLike } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";

export const SidebarData = [
        {
        title: "Vezérlőpult",
        path: "/admin/vezerlopult",
        icon: <AiIcons.AiFillHome />
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
        title: "Akció",
        path: "/admin/Akcio",
        icon: <FiPercent />
    },
    {
        title: "Blog",
        path: "/admin/blog",
        icon: <TfiWrite />

    },
    {
        title: "Vélemény",
        path: "/admin/velemeny",
        icon: <TbFileLike />
    }

];