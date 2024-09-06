'use client'
import {useEffect, useState} from "react";
import {EventModel} from "@/data/types";
import {generateEvents} from "@/data/generator";
import EventComponent from "@/components/eventComponent";
import {Button} from "antd";


export function UpcomingComedy() {
    const [events,setEvents] = useState<EventModel[]>([]);
    useEffect(() => {
        setEvents(generateEvents(4));
    }, []);
    return <div className={'px-16 py-16'}>
        <div className={'flex justify-between items-center'}>
            <div>
                <h1 className={'font-medium mb-0'}>Catch a <span className={'text-primary'}>laugh</span> this weekend</h1>
                <p className={'text-gray-500'}>The regular comedy clubs</p>
            </div>
            <Button type={'text'}>See More</Button>
        </div>
        <div className={'grid grid-cols-4 gap-8'}>
            {events.map((value, index) => <EventComponent key={index} event={value}/>)}
        </div>
    </div>
}