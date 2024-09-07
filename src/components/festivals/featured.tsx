'use client'
import {useEffect, useState} from "react";
import {EventModel} from "@/data/types";
import {generateEvents} from "@/data/generator";
import EventComponent from "@/components/eventComponent";
import {Button} from "antd";


export function FestivalLineup() {
    const [events, setEvents] = useState<EventModel[]>([]);

    useEffect(() => {
        setEvents(generateEvents(3));
    }, []);

    return (
        <div className={'px-16 py-16'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'font-medium mb-0'}>Music <span className={'text-primary'}>Festival Lineup</span></h1>
                    <p className={'text-gray-500'}>The biggest acts in one place</p>
                </div>
                <Button type={'text'}>See Full Lineup</Button>
            </div>
            <div className={'grid grid-cols-3 gap-8'}>
                {events.map((value, index) => <EventComponent key={index} event={value}/>)}
            </div>
        </div>
    );
}

export function FestivalAfterParties() {
    const [events, setEvents] = useState<EventModel[]>([]);

    useEffect(() => {
        setEvents(generateEvents(4));
    }, []);

    return (
        <div className={'px-16 py-16'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'font-medium mb-0'}>Festival <span className={'text-primary'}>After-Parties</span></h1>
                    <p className={'text-gray-500'}>Keep the party going after the festival</p>
                </div>
                <Button type={'text'}>Explore After-Parties</Button>
            </div>
            <div className={'grid grid-cols-4 gap-8'}>
                {events.map((value, index) => <EventComponent key={index} event={value}/>)}
            </div>
        </div>
    );
}