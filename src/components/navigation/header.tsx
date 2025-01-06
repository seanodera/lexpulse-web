"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import CountrySelector from "@/components/navigation/countrySelector";
import { Avatar, Button, Drawer, Dropdown, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import ProfileDropdown from "@/components/navigation/profileDropown";
import DropdownButton from "antd/lib/dropdown/dropdown-button";
import NavLink from "./navLink";

export default function Navbar() {
  const [windowHeight, setWindowHeight] = useState(0);
  const pathName = usePathname();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };
  useEffect(() => setDrawerVisible(false), [pathName])

  useEffect(() => {
    window.addEventListener("scroll", navBarTop);
    return () => {
      window.removeEventListener("scroll", navBarTop);
    };
  }, []);
  const isHomePage = pathName === "/";
  return (
    <div
      className={`flex justify-between items-center px-4 py-2 w-full ${
        !isHomePage
          ? `bg-transparent text-dark ${windowHeight > 50 && "fixed bg-white"}`
          : `shadow-sm fixed z-30  text-white ${
              windowHeight < 50 ? "bg-transparent " : "bg-dark"
            }`
      }`}
    >
      <div className="flex items-center gap-6">
        <Link href={"/"}>
          <Avatar
            src="/logo/logo.png"
            shape="circle"
            size="large"
            className={"object-cover"}
          />
        </Link>
        <div className="max-md:hidden flex items-center gap-6">
          <NavLink to="/">Browse</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to={"/venues"}>Venues</NavLink>
        </div>
  
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3">
          <ProfileDropdown setDropdownVisible={setDropdownVisible} />
          <CountrySelector />
        </div>
        <div className="sm:hidden">
          <Button
            type={"text"}
            className={"text-white"}
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
          />
        </div>
      </div>
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="flex flex-col justify-between h-full">
        <Menu onClick={() => setDrawerVisible(false)}
          items={[
            {
              key: 0,
              label: <Link href="/events">Events</Link>,
            },
            {
              key: 1,
              label: <Link href="/venues">Venues</Link>,
            },
          ]}
        />
        <div className="space-y-4">
        <ProfileDropdown setDropdownVisible={setDropdownVisible} />
        <CountrySelector/>
        </div>
        </div>
      </Drawer>
    </div>
  );
}
