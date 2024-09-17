'use client';
import { Field, Fieldset, Input, Label, Legend, Select } from "@headlessui/react";
import { countries } from "country-data";
import { useAppSelector } from "@/hooks/hooks";
import { selectCurrentUser } from "@/data/slices/authSlice";
import { useEffect, useState } from "react";
import { getCountry } from "@/data/utils";

export default function ContactForm() {
    const userDetails = useAppSelector(selectCurrentUser)
    const [country, setCountry] = useState('')

    useEffect(() => {
        async function fetchCountry() {
            const countryNet = await getCountry();
            if (countryNet) {
                setCountry(countryNet.name)
            }
        }
        fetchCountry()
    }, []);

    return (
        <Fieldset className="space-y-4">
            <Legend className="text-lg font-bold">User Details</Legend>
            <div className="grid grid-cols-2 gap-8">
                <Field>
                    <Label className="block font-semibold">First Name</Label>
                    <Input className="block border border-gray-500 rounded-lg py-2 px-3 w-full"
                           value={userDetails?.firstName || ''}
                           readOnly
                    />
                </Field>
                <Field>
                    <Label className="block font-semibold">Last Name</Label>
                    <Input className="block border border-gray-500 rounded-lg py-2 px-3 w-full"
                           value={userDetails?.lastName || ''}
                           readOnly
                    />
                </Field>
            </div>
            <Field className="md:w-1/2 md:pe-4">
                <Label className="block font-semibold">Email</Label>
                <Input className="block border border-gray-500 rounded-lg py-2 px-3 w-full"
                       value={userDetails?.email || ''}
                       readOnly
                />
                <small className="font-light">Confirmation goes to this email</small>
            </Field>
            <Field className="md:w-1/2 md:pe-4">
                <Label className="block font-semibold">Country</Label>
                <Select value={country} disabled className="block border border-gray-500 rounded-lg py-2 px-3 w-full">
                    {countries.all.map((country, index) => (
                        <option key={index} value={country.name}>{country.name}</option>
                    ))}
                </Select>
            </Field>
            <Field className="md:w-1/2 md:pe-4">
                <Label className="block font-semibold">Phone Number</Label>
                <Input className="block border border-gray-500 rounded-lg py-2 px-3 w-full"
                       value={userDetails?.phone || ''}
                       readOnly
                />
            </Field>
        </Fieldset>
    );
}