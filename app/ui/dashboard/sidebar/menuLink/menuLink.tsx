"use client"
import "../../../../style/dashboard/menuLink.scss"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
interface MenuItem {
    title: string;
    path: string;
    icon: React.ReactNode;

}
export default function MenuLink({ item }: { item: MenuItem }) {

    const pathname = usePathname();
    return (

        <Link href={item.path} className={`menulink-container ${pathname === item.path ? 'active' : ''}`}>
            {item.icon}
            {item.title}
        </Link>

    );
}