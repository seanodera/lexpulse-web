'use client'
import {useEffect, useState} from "react";
import {EventModel} from "@/data/types";
import {generateEvents} from "@/data/generator";
import EventComponent from "@/components/eventComponent";
import {Button} from "antd";


export function FeaturedComedy() {
    const [events, setEvents] = useState<EventModel[]>([]);

    useEffect(() => {
        setEvents(generateEvents(4));
    }, []);

    return (
        <div className={'px-16 py-16'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'font-medium mb-0'}>Featured <span className={'text-primary'}>Comedy Events</span></h1>
                    <p className={'text-gray-500'}>Don&apos;t miss out on these top performances</p>
                </div>
                <Button type={'text'}>See All</Button>
            </div>
            <div className={'grid grid-cols-4 gap-8'}>
                {events.map((value, index) => <EventComponent key={index} event={value}/>)}
            </div>
        </div>
    );
}



export function WeekendLaughs() {
    const [events, setEvents] = useState<EventModel[]>([]);

    useEffect(() => {
        setEvents(generateEvents(5));
    }, []);

    return (
        <div className={'px-16 py-16'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'font-medium mb-0'}>Get Ready for a <span className={'text-primary'}>Weekend of Laughter</span></h1>
                    <p className={'text-gray-500'}>Your weekend just got funnier!</p>
                </div>
                <Button type={'text'}>Explore All Events</Button>
            </div>
            <div className={'grid grid-cols-5 gap-8'}>
                {events.map((value, index) => <EventComponent key={index} event={value}/>)}
            </div>
        </div>
    );
}


export function ComedyClubs() {
    const [events, setEvents] = useState<EventModel[]>([]);

    useEffect(() => {
        setEvents(generateEvents(3)); // Generate 3 comedy club events
    }, []);

    return (
        <div className={'px-16 py-16'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'font-medium mb-0'}>Comedy <span className={'text-primary'}>Clubs</span></h1>
                    <p className={'text-gray-500'}>Laugh out loud at your favorite comedy spots</p>
                </div>
                <Button type={'text'}>See More Clubs</Button>
            </div>
            <div className={'grid grid-cols-3 gap-8'}>
                {events.map((value, index) => <EventComponent key={index} event={value}/>)}
            </div>
        </div>
    );
}