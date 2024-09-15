'use client'
import {useEffect, useState} from "react";
import {EventModel, EventType} from "@/data/types";
import {generateEvents} from "@/data/generator";
import {TicketPurchase} from "@/components/singleEvent/tickets";
import EventComponent from "@/components/eventComponent";
import SingleEventBanner from "@/components/singleEvent/banner";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {useParams} from "next/navigation";
import {fetchEventById, selectFocusEvent, selectUpcomingEvents} from "@/data/slices/eventsSlice";


export default function EventPage() {
    const { eventId } = useParams();
    const dispatch = useAppDispatch();
    const event = useAppSelector(selectFocusEvent) ;
    const events = useAppSelector(selectUpcomingEvents);
    useEffect(() => {
        if (eventId ){
            if (!event || event._id !== eventId){
                console.log(eventId)
                dispatch(fetchEventById(eventId.toString()));
            }
        }
    }, [dispatch, event, eventId]);

    if (!event) {
        return <div></div>
    }
    console.log(event);
    return (
        <div>
            <SingleEventBanner event={event}/>
            <section className={`py-8 px-16 ${event.category === EventType.Clubbing ? 'bg-dark text-white' : ''}`}>
                <div className={'grid grid-cols-2 gap-8'}>
                    <div>

                        <h3 className={'font-semibold'}>Description</h3>
                        <p className={'text-lg'}>{event.description}</p>

                        <div className={'grid grid-cols-2 gap-8'}>
                            <div>
                                <h4 className={'text-gray-500'}>minimum Age</h4>
                                <h4>{event.minAge}+</h4>
                            </div>
                            <div>
                                <h4 className={'text-gray-500'}>Dress Code</h4>
                                <h4>{event.dress}</h4>
                            </div>
                            <div>
                                <h4 className={'text-gray-500'}>Last Entry</h4>
                                <h4>{event.lastEntry}</h4>
                            </div>
                            <div>
                                <h4 className={'text-gray-500'}>ID required</h4>
                                <h4>{(event.minAge && event.minAge >= 18)? 'Yes' : 'No'}</h4>
                            </div>
                            {/*<div className={'col-span-2'}>*/}
                            {/*    <h3 className={'text-gray-500'}>Additional Information</h3>*/}
                            {/*    <p>More Information</p>*/}
                            {/*</div>*/}
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
                    <h1 className={'text-primary text-3xl'}>More like {event.eventName}</h1>
                    <div className={'grid grid-cols-4 gap-8'}>
                        {events.slice(0, 4).map((event, index) => <EventComponent key={index} event={event}/>)}
                    </div>
                </div>
            </section>
        </div>
    );
}