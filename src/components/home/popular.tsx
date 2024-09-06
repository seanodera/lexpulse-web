import EventComponent from "@/components/eventComponent";
import {faker} from "@faker-js/faker";
import {useEffect, useState} from "react";
import {EventModel} from "@/data/types";
import {generateEvents} from "@/data/generator";


export default function HomePopular() {
    const [events,setEvents] = useState<EventModel[]>([]);
    useEffect(() => {
        setEvents(generateEvents(4));
    }, []);
    return <div className={'bg-gradient-radial from-primary-200 to-transparent'}>
        <section className={'px-16 py-8 '}>
            <h1 className={'text-2xl font-medium'}>What is <span className={'text-primary'}>popular</span> right
                now</h1>
            <div className={'grid grid-cols-4 mt-8 gap-8'}>
                {events.map((value, index) => <EventComponent key={index} event={value} />)}
            </div>
        </section>
    </div>
}