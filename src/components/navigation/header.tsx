'use client'
import Link from "next/link";
import { FilledButton, IconButton } from "@/components/buttons";
import { CiSearch } from "react-icons/ci";
import {Button} from "antd";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

export default function Header() {
    const [windowHeight, setWindowHeight] = useState(0);
    const pathName = usePathname();

    const navBarTop = () => {
        if (window !== undefined) {
            let height = window.scrollY;
            console.log(height)
            setWindowHeight(height);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", navBarTop);
        return () => {
            window.removeEventListener("scroll", navBarTop);
        };
    }, []);

    const isHomePage = pathName === '/';
    return (
        <div className={`fixed w-full z-30 shadow-md ${isHomePage && windowHeight < 20? 'bg-transparent': 'bg-dark shadow-sm' }`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/">
                    <img src="/logo/logo.svg" alt="Logo" className="aspect-square h-8" />
                </Link>
                <div className="flex gap-4">
                    <Link href="/events" className="block active:text-primary hover:text-primary text-gray-500">
                        Events
                    </Link>
                    <Link href="/comedy" className="block active:text-primary hover:text-primary text-gray-500">
                        Comedy
                    </Link>
                    <Link href="/concerts" className="block active:text-primary hover:text-primary text-gray-500">
                        Concerts
                    </Link>
                    <Link href="/festivals" className="block active:text-primary hover:text-primary text-gray-500">
                        Festivals
                    </Link>
                    <Link href="/clubbing" className="block active:text-primary hover:text-primary text-gray-500">
                        Clubbing
                    </Link>
                </div>
                <div className="flex gap-2 items-center">
                    <IconButton icon={<CiSearch />} type="primary" className="text-lg" />
                    <Link href={'/login'}><Button type="primary">Login</Button></Link>
                </div>
            </div>
        </div>
    );
}