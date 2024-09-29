'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import ProfileDropdown from "@/components/navigation/profileDropown";
import CountrySelector from "@/components/navigation/countrySelector";

export default function Header() {
    const [windowHeight, setWindowHeight] = useState(0);
    const pathName = usePathname();

    const navBarTop = () => {
        if (window !== undefined) {
            let height = window.scrollY;
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
        <div className={`fixed w-full z-30  ${isHomePage && windowHeight < 20? 'bg-transparent': 'bg-dark shadow-sm' }`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/">
                    <img src="/logo/logo.svg" alt="Logo" className="aspect-square h-8" />
                </Link>
                <div className="flex gap-4">
                    <Link href="/events" className="block active:text-primary hover:text-primary text-gray-500">
                        Events
                    </Link>
                    {/*<Link href="/comedy" className="block active:text-primary hover:text-primary text-gray-500">*/}
                    {/*    Comedy*/}
                    {/*</Link>*/}
                    {/*<Link href="/concerts" className="block active:text-primary hover:text-primary text-gray-500">*/}
                    {/*    Concerts*/}
                    {/*</Link>*/}
                    {/*<Link href="/festivals" className="block active:text-primary hover:text-primary text-gray-500">*/}
                    {/*    Festivals*/}
                    {/*</Link>*/}
                    {/*<Link href="/clubbing" className="block active:text-primary hover:text-primary text-gray-500">*/}
                    {/*    Clubbing*/}
                    {/*</Link>*/}
                </div>
                <div className={'flex items-center gap-3'}>
                    <ProfileDropdown/>
                    <CountrySelector/>
                </div>
            </div>
        </div>
    );
}




