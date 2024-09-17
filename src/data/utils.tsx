import axios from "axios";
import { countries } from "country-data";

// export async function createFile({url, name = 'image'}: { url: string, name?: string }) {
//     let response = await fetch(url);
//     let data = await response.blob();
//     let metadata = {
//         type: 'image/jpeg'
//     };
//
//     return new File([data], `${name}.jpg`, metadata);
// }



export const common = {
    baseUrl: process.env.NEXT_PUBLIC_API_HOST_URL,
}

export function getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getAbbreviation = (num: number): string => {
    if (num === 1 || num === 21 || num === 31) {
        return num.toString() + 'st';
    } else {
        return num.toString() + 'th';
    }
}

export const monthString = (num: number): string => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[num];
}

export const monthStringShort = (num: number): string => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[num];
}

export const monthInt = (month: string): number => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let finalIndex = 0;
    for (let index = 0; index < months.length; index++) {
        if (months[index].toLocaleLowerCase() === month.toLocaleLowerCase()) {
            finalIndex = index;
            break;
        }
    }
    return finalIndex;
}

export const dayStringShort = (num: number): string => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[num];
}

interface DateReaderOptions {
    date: string | Date;
    month?: boolean;
    years?: boolean;
    weekDay?: boolean;
}

export const dateReader = ({ date, month = true, years = true, weekDay = false }: DateReaderOptions): string => {
    const _date = new Date(date);
    let dateString = '';

    if (weekDay) {
        dateString = dateString.concat(dayStringShort(_date.getDay()), ' ');
    }

    dateString = dateString.concat(_date.getDate().toString(), ' ');

    if (month) {
        dateString = dateString.concat(monthStringShort(_date.getMonth()), ' ');
    }

    if (years) {
        dateString = dateString.concat(_date.getFullYear().toString());
    }

    return dateString;
}

export async function getCountry() {
    try {
        // Fetch the client's IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        // Fetch the country using the IP address
        const countryResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        const countryData = await countryResponse.json();
        const countryCode = countryData.country;

        // Get country information from country-data package
        const country = countries[ countryCode ];
        // setUserProperties(analytics, {country: country})
        return {
            name: country.name,
            emoji: country.emoji,
            currency: country.currencies[ 0 ]
        };
    } catch (error) {
        console.error("Error fetching country data: ", error);
        throw error
        return undefined;
    }
}

export function serviceCountries(): string[] {
    const list = ['KE', 'GH', 'UK', 'CY'];
    return list.map((e) => countries[e].name);
}

export async function createFile({url, name = 'image'}: { url: string, name?: string }) {
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = {
        type: 'image/jpeg'
    };
    // ... do something with the file or return it
    return new File([data], `${name}.jpg`, metadata);
}

