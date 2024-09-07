
'use client'
import {useEffect, useState} from "react";
import {EventModel} from "@/data/types";
import {generateEvents} from "@/data/generator";
import EventComponent from "@/components/eventComponent";
import {Button} from "antd";


export function FeaturedConcerts() {
    const [events, setEvents] = useState<EventModel[]>([]);

    useEffect(() => {
        setEvents(generateEvents(3));
    }, []);

    return (
        <div className={'px-16 py-16'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'font-medium mb-0'}>Featured <span className={'text-primary'}>Concerts</span></h1>
                    <p className={'text-gray-500'}>Experience the best live performances</p>
                </div>
                <Button type={'text'}>See All</Button>
            </div>
            <div className={'grid grid-cols-3 gap-8'}>
                {events.map((value, index) => <EventComponent key={index} event={value}/>)}
            </div>
        </div>
    );
}

export function UpcomingConcerts() {
    const [events, setEvents] = useState<EventModel[]>([]);

    useEffect(() => {
        setEvents(generateEvents(4));
    }, []);

    return (
        <div className={'px-16 py-16'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'font-medium mb-0'}>Upcoming <span className={'text-primary'}>Concerts</span></h1>
                    <p className={'text-gray-500'}>Get ready for the next big show</p>
                </div>
                <Button type={'text'}>See More Concerts</Button>
            </div>
            <div className={'grid grid-cols-4 gap-8'}>
                {events.map((value, index) => <EventComponent key={index} event={value}/>)}
            </div>
        </div>
    );
}

