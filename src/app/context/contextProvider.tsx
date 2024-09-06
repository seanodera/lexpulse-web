'use client'
import React from "react";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import {usePathname} from "next/navigation";




export default function ContextProvider({children}:{children: React.ReactNode}){
const pathname = usePathname();

    return <div>
        {pathname !== '/login' &&<Header/>}
        <div className={`${pathname !== '/' && pathname !== '/login' && 'pt-[4.5rem]'}`}>
            {children}
        </div>
        {pathname !== '/login' && <Footer/>}
    </div>
}