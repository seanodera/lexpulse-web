import {useEffect, useState} from "react";
import {string} from "yup";
import {usePathname} from "next/navigation";
import {countries} from "country-data";
import {Select} from "@headlessui/react";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {changeRegion, fetchPopular, selectEventsCountry} from "@/data/slices/eventsSlice";


export default function CountrySelector() {
    const selectedCountry = useAppSelector(selectEventsCountry);
    const dispatch = useAppDispatch();

    return <Select
        value={countries.all.find((value) => value.name.toLowerCase() === selectedCountry.toLowerCase())?.alpha2}
        className={'border-0 bg-transparent p-0 mx-1'}
        onChange={(e) => {
            dispatch(changeRegion(countries[ e.target.value ].name));


        }}>
        <option className={'text-xl'} value={'GH'}>{countries[ 'GH' ].emoji}</option>
        <option className={'text-xl'} value={'KE'}>{countries[ 'KE' ].emoji}</option>

    </Select>;
}