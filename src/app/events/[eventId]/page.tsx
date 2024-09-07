'use client'
import {useEffect, useState} from "react";
import {EventModel} from "@/data/types";
import {generateEvents} from "@/data/generator";
import {addHours, format} from "date-fns";
import {Button, Tag} from "antd";
import {ExclamationOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {TicketPurchase} from "@/components/singleEvent/tickets";
import EventComponent from "@/components/eventComponent";


export default function EventPage() {
    const [event, setEvent] = useState<EventModel>();
    const [events, setEvents] = useState<EventModel[]>([]);

    useEffect(() => {
        setEvent(generateEvents(1)[ 0 ]);
        setEvents(generateEvents(5));
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
                    <div className={'col-span-2'}>
                        <h1 className={'text-3xl font-semibold capitalize'}>{event.name}</h1>
                        <div className={'grid grid-cols-2'}>
                            <div className={'mt-3'}>
                                <h4 className={'text-gray-300'}>Date</h4>
                                <h3 className={'font-semibold mb-1'}>{format(event.date, 'EEE, dd MMM yyyy')}</h3>
                                <p>{format(event.date, 'HH:mm')} - {format(addHours(event.date, 5), 'HH:mm')}</p>
                            </div>

                            <div className={'mt-3'}>
                                <h4 className={'text-gray-300'}>Venue</h4>
                                <h3 className={'font-semibold mb-1'}>{event.venue.name} </h3>
                                <p>{event.venue.street}, {event.location}</p>
                            </div>

                            <div>
                                <h4 className={'text-gray-300'}>Genre</h4>
                                <div className={'flex flex-wrap gap-1'}>
                                    <Tag color={'processing'}>Rock</Tag>
                                    <Tag color={'processing'}>hip-hop</Tag>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className={'py-8 px-16'}>
                <div className={'grid grid-cols-2 gap-8'}>
                    <div>

                        <h3 className={'font-semibold'}>Description</h3>
                        <p className={'text-lg'}>{event.description}</p>

                        <div className={'grid grid-cols-2 gap-8'}>
                            <div>
                                <h4 className={'text-gray-500'}>minimum Age</h4>
                                <h4>18+</h4>
                            </div>
                            <div>
                                <h4 className={'text-gray-500'}>Dress Code</h4>
                                <h4>All white</h4>
                            </div>
                            <div>
                                <h4 className={'text-gray-500'}>Last Entry</h4>
                                <h4>08:00</h4>
                            </div>
                            <div>
                                <h4 className={'text-gray-500'}>ID required</h4>
                                <h4>Yes</h4>
                            </div>
                            <div className={'col-span-2'}>
                                <h3 className={'text-gray-500'}>Additional Information</h3>
                                <p>More Information</p>
                            </div>
                        </div>
                        <div className={'mt-3'}>
                            <h2 className={'font-medium'}>Line up</h2>
                            <div className={'flex gap-1'}>
                                <div>
                                    <img src={event.poster} className={'rounded-full aspect-square h-20'}/>
                                    <h4 className={'font-semibold mt-1'}>Artist Name</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <TicketPurchase event={event}/>
                    </div>
                </div>
            </section>

            <section className={'bg-dark text-white px-16 py-16'}>
                <div>
                    <h1 className={'text-primary text-3xl'}>More like {event.name}</h1>
                    <div className={'grid grid-cols-4 gap-8'}>
                        {events.slice(0,4).map((event,index) => <EventComponent key={index} event={event}/>)}
                    </div>
                </div>
            </section>
        </div>
    );
}