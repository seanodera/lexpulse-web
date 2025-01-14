'use client'
import React, {useEffect, useState} from "react";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import {usePathname} from "next/navigation";
import {
    changeRegion,
    fetchPopular,
    fetchPromoted,
    fetchUpcoming,
    selectEventsCountry,
    selectEventsLoading
} from "@/data/slices/eventsSlice";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {checkUser, initializeAppAsync, selectCurrentUser} from "@/data/slices/authSlice";
import {fetchExchangeRates} from "@/data/slices/cartSlice";
import {fetchTickets} from "@/data/slices/ticketsSlice";
import LoadingScreen from "@/components/LoadingScreen";
import {getCountry} from "@/data/utils";
import { fetchVenuesAsync } from "@/data/slices/venueSlice";


export default function ContextProvider({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const country = useAppSelector(selectEventsCountry);
    const user = useAppSelector(selectCurrentUser);
    const loading = useAppSelector(selectEventsLoading);
    const [countryLoading,setCountryLoading] = useState<boolean>(true);
    const appLoading = useAppSelector(state => state.auth.appLoading)
    useEffect(() => {
        setCountryLoading(true);
        getCountry().then((value) => {
            if (value){
                dispatch(changeRegion(value.name))
                setCountryLoading(false);
            }
        })
    }, []);

    useEffect(() => {
        dispatch(initializeAppAsync());

        console.log('Fetching')
    }, [country, dispatch]);



    useEffect(() => {
        if (user) {
            dispatch(fetchTickets());
        }
    }, [dispatch, user]);

    if (loading || countryLoading|| appLoading) {
        return <LoadingScreen/>;
    }
    return <div>
        {pathname !== '/login' && <Header/>}
        <div
        // className={`${pathname !== '/' && pathname !== '/login' && 'pt-[4.5rem]'}`}
        >
            {children}
        </div>
        {pathname !== '/login' && <Footer/>}
    </div>
}
