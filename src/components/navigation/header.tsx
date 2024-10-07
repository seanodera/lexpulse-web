'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import CountrySelector from "@/components/navigation/countrySelector";
import { Button, Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import ProfileDropdown from "@/components/navigation/profileDropown";
import DropdownButton from "antd/lib/dropdown/dropdown-button";

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

    const menu = (
        <Menu >
            <Menu.Item key="0">
                <Link href="/events">Events</Link>
            </Menu.Item>
            {/* Uncomment the links below when needed */}
            {/* <Menu.Item key="1">
                <Link href="/comedy">Comedy</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link href="/concerts">Concerts</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link href="/festivals">Festivals</Link>
            </Menu.Item>
            <Menu.Item key="4">
                <Link href="/clubbing">Clubbing</Link>
            </Menu.Item> */}
            <Menu.Item key="5">
                <ProfileDropdown />
            </Menu.Item>
            <Menu.Item key="6">
                <CountrySelector />
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={`fixed w-full z-30 ${isHomePage && windowHeight < 20 ? 'bg-transparent' : 'bg-dark shadow-sm'}`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="block">
                    <img src="/logo/logo.svg" alt="Logo" className="aspect-square h-8" />
                </Link>
                <div className="hidden sm:flex gap-4 justify-center text-center">
                    <Link href="/events" className="block active:text-primary hover:text-primary text-gray-500">
                        Events
                    </Link>
                    {/* Uncomment the links below when needed */}
                    {/* <Link href="/comedy" className="block active:text-primary hover:text-primary text-gray-500">
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
                    </Link> */}
                </div>
                <div className="hidden sm:flex items-center gap-3">
                    <ProfileDropdown />
                    <CountrySelector />
                </div>
                <div className="sm:hidden">

                    <Dropdown className={'bg-dark'} menu={{
                        items: [
                            {
                                key: 0,
                                label: <Link href="/events" className="block text-white active:text-primary hover:text-primary">
                                    Events
                                </Link>
                            },
                            {
                                key: 5,
                                label: <ProfileDropdown/>
                            }, {
                                key: 6,
                                label: <CountrySelector/>
                            }
                        ], className:'bg-dark text-white rounded-lg'
                    }}  trigger={['click']} overlayClassName={'bg-dark'}>
                        <Button type={'text'} className={'text-white'} icon={<MenuOutlined />} />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}