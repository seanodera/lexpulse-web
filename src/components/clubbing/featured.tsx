

'use client';
import { useEffect, useState } from "react";
import { EventModel } from "@/data/types";
// import { generateEvents } from "@/data/generator";
import { Button } from "antd";
import EventComponent from "@/components/eventComponent";

export function LateNightClubbing() {
    const [events, setEvents] = useState<EventModel[]>([]);

    // useEffect(() => {
    //     setEvents(generateEvents(5));
    // }, []);

    return (
        <div className={'px-16 py-16'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'font-medium mb-0'}>Experience the <span className={'text-primary'}>Best Late-Night Clubs</span></h1>
                    <p className={'text-gray-500'}>Dance the night away at the most happening spots in town!</p>
                </div>
                <Button type={'text'}>Explore All Events</Button>
            </div>
            <div className={'grid grid-cols-5 gap-8'}>
                {events.map((value, index) => <EventComponent key={index} event={value}/>)}
            </div>
        </div>
    );
}


export function PartyAllNight() {
    const [events, setEvents] = useState<EventModel[]>([]);

    // useEffect(() => {
    //     setEvents(generateEvents(5));
    // }, []);

    return (
        <div className={'px-16 py-16'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'font-medium mb-0'}>Get Ready to <span className={'text-primary'}>Party All Night</span></h1>
                    <p className={'text-gray-500'}>Unforgettable parties await this weekend!</p>
                </div>
                <Button type={'text'}>Explore All Events</Button>
            </div>
            <div className={'grid grid-cols-5 gap-8'}>
                {events.map((value, index) => <EventComponent key={index} event={value}/>)}
            </div>
        </div>
    );
}