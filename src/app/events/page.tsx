'use client'
import {Button} from "antd";
import EventComponent from "@/components/eventComponent";
import {faker} from "@faker-js/faker";
import {useEffect, useState} from "react";
import {EventModel} from "@/data/types";
import {generateEvents} from "@/data/generator";


export default function EventsPage() {
    const [events, setEvents] = useState<EventModel[]>([]);

    // Fetch event data when the component mounts
    useEffect(() => {
        setEvents(generateEvents(6)); // Generate 2 sample events
    }, []);

    return <div className={'px-16'}>
        <h1>All Events</h1>
        <div className={'grid grid-cols-5'}>
            <div>
                <div className={'flex justify-between items-center'}>
                    <h2>Filters</h2>
                    <Button type={'text'} className={'text-gray-500'}>Clear All</Button>
                </div>
            </div>
            <div className={'col-span-4 grid grid-cols-4 gap-8'}>
                {events.map((value, index) => <EventComponent key={index} event={value}/>)}
            </div>
        </div>
    </div>
}