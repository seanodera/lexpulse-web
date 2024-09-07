'use client'
import {useEffect, useState} from "react";
import {EventModel} from "@/data/types";
import {generateEvents} from "@/data/generator";
import {addHours, format} from "date-fns";


export default function EventPage() {
    const [event, setEvent] = useState<EventModel>();

    useEffect(() => {
        setEvent(generateEvents(1)[0]);
    }, [])

    if (!event) {
        return <div></div>
    }

    return (
        <div>
            <div className={'bg-cover bg-no-repeat'} style={{
                backgroundImage: `url("${event.cover}")`
            }}>
                <div className={'py-8 px-16 backdrop-blur bg-dark bg-opacity-30 text-white grid grid-cols-4 gap-8'}>
                    <img
                        src={event.poster}
                        className={'w-full aspect-square rounded-lg border-solid border-white max-w-screen-sm'}
                        alt={'poster'}
                    />
                    <div className={'py-8'}>
                        <h1 className={'text-3xl font-semibold capitalize'}>{event.name}</h1>
                        <div className={'mt-3'}>
                            <h4 className={'text-gray-300'}>Date</h4>
                            <h3 className={'font-semibold mb-1'}>{format(event.date, 'EEE, dd MMM yyyy')}</h3>
                            <p>{format(event.date, 'HH:mm')} - {format(addHours(event.date, 5), 'HH:mm')}</p>
                        </div>
                        <div className={'mt-3'}>
                            <h4 className={'text-gray-300'}>Venue</h4>
                            <h3 className={'font-semibold mb-1'}>{event.venue.name}</h3>
                            <p>{event.venue.street}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}