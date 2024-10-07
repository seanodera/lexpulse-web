'use client'
import { useEffect } from "react";
import { EventType } from "@/data/types";
import { TicketPurchase } from "@/components/singleEvent/tickets";
import EventComponent from "@/components/eventComponent";
import SingleEventBanner from "@/components/singleEvent/banner";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useParams } from "next/navigation";
import { fetchEventById, selectFocusEvent, selectUpcomingEvents } from "@/data/slices/eventsSlice";

export default function EventPage() {
    const { eventId } = useParams();
    const dispatch = useAppDispatch();
    const event = useAppSelector(selectFocusEvent);
    const events = useAppSelector(selectUpcomingEvents);

    useEffect(() => {
        if (eventId) {
            if (!event || event._id !== eventId) {
                console.log(eventId);
                dispatch(fetchEventById(eventId.toString()));
            }
        }
    }, [dispatch, event, eventId]);

    if (!event) {
        return <div></div>;
    }
    console.log(event);
    return (
        <div>
            <SingleEventBanner event={event} />
            <section className={`py-8 px-4 md:px-16 ${event.category === EventType.Clubbing ? 'bg-dark text-white' : ''}`}>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-8'}>
                    <div>
                        <h3 className={'font-semibold'}>Description</h3>
                        <p className={'text-lg'}>{event.description}</p>

                        <div className={'grid grid-cols-2 gap-8'}>
                            <div>
                                <h4 className={'text-gray-500'}>Minimum Age</h4>
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
                                <h4 className={'text-gray-500'}>ID Required</h4>
                                <h4 className={'text-primary'}>{(event.minAge && event.minAge >= 18) ? 'Yes' : 'No'}</h4>
                            </div>
                        </div>
                        <div className={'mt-3'}>
                            <h2 className={'font-medium'}>Line Up</h2>
                            <div className={'flex gap-1'}>
                                <div>
                                    <img src={event.poster} className={'rounded-full aspect-square h-20'} alt="Artist" />
                                    <h4 className={'font-semibold mt-1'}>Artist Name</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <TicketPurchase event={event} />
                    </div>
                </div>
            </section>

            <section className={'bg-dark text-white px-4 md:px-16 py-8 md:py-16'}>
                <div>
                    <h1 className={'text-primary text-2xl md:text-3xl'}>More like {event.eventName}</h1>
                    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 gap-4 md:gap-8'}>
                        {events.slice(0, 4).map((event, index) => <EventComponent key={index} event={event} />)}
                    </div>
                </div>
            </section>
        </div>
    );
}