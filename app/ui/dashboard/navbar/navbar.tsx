"use client"
import "../../../style/dashboard/navbar.scss"
import { usePathname } from "next/navigation"
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md";



export default function Navbar() {

    const pathname = usePathname()
    return (
        <div className="nav-container">
            <div className="nav-title">{pathname.split("/").pop()}</div>

        </div>
    );
}
