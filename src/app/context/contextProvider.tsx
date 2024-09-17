'use client'
import React, {useEffect} from "react";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import {usePathname} from "next/navigation";
import {fetchPopular, fetchPromoted, fetchUpcoming, selectEventsCountry} from "@/data/slices/eventsSlice";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {checkUser} from "@/data/slices/authSlice";
import {fetchExchangeRates} from "@/data/slices/cartSlice";


export default function ContextProvider({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const country = useAppSelector(selectEventsCountry)
    useEffect(() => {
        dispatch(fetchUpcoming());
        dispatch(fetchPopular());
        dispatch(fetchPromoted());
        dispatch(checkUser());
        dispatch(fetchExchangeRates());
        console.log('Fetching')
    }, [country]);
    return <div>
        {pathname !== '/login' && <Header/>}
        <div className={`${pathname !== '/' && pathname !== '/login' && 'pt-[4.5rem]'}`}>
            {children}
        </div>
        {pathname !== '/login' && <Footer/>}
    </div>
}