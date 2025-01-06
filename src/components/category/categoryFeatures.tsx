import {useEffect, useState} from "react";
import {EventModel} from "@/data/types";
// import {generateEvents} from "@/data/generator";
import {Button} from "antd";
import EventComponent from "@/components/eventComponent";


export default function CategoryFeatures() {
    const [events, setEvents] = useState<EventModel[]>([]);

    // useEffect(() => {
    //     setEvents(generateEvents(5));
    // }, []);

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