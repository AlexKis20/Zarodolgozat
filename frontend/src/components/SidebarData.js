import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { BiLogoBlogger } from "react-icons/bi";
import { IoTabletPortraitSharp } from "react-icons/io5";
import { LuType } from "react-icons/lu"; 

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
        icon: <IoIcons.IoIosPaper />
    },
    {
        title: "Típus",
        path: "/admin/tipus",
        icon: <LuType />
    },
    {
        title: "Blog",
        path: "/admin/blog",
        icon:<BiLogoBlogger />

    },
    {
        title: "Vélemény",
        path: "/admin/velemeny",
        icon: <IoIcons.IoIosPaper />
    }

];