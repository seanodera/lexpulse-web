'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {selectFocusTicket, setFocusTicket} from "@/data/slices/ticketsSlice";
import {CombinedTicket, EventModel} from "@/data/types";
import TicketBanner from "@/components/tickets/banner";


export default function SingleTicketPage(){
    const {ticketId} = useParams();
    const ticket = useAppSelector(selectFocusTicket);
    const dispatch = useAppDispatch();
    const [event,setEvent] = useState<EventModel | undefined>();
    useEffect(() => {
        if (ticketId) {
            if (!ticket || ticket._id !== ticketId || !event) {
                dispatch(setFocusTicket(ticketId.toString())).then((action) => {
                    if (action.meta.requestStatus === 'fulfilled'){
                        if (action.payload && (action.payload as CombinedTicket).eventId) {

                            setEvent((action.payload as CombinedTicket).eventId );
                        }
                    }

                });
            }
        }
    }, [ticketId, ticket, event, dispatch]);



    if (!ticket || !event) {
        return <div>Loading...</div>;
    }
    return <div className={'pb-8'}>
        <TicketBanner event={event} ticket={ticket}/>
        <div className={'grid grid-cols-2 py-4 px-16'}>
            <div>
                <h2 className={'font-semibold'}>Event Details</h2>
                <h3 className={'font-semibold'}>Description</h3>
                <p className={'text-balance'}>{event.description}</p>
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
                        <h4 className={'text-primary'}>{(event.minAge && event.minAge >= 18) ? 'Yes' : 'No'}</h4>
                    </div>
                </div>
                <div className={'bg-white rounded-lg py-4'}>
                    <h3 className={'font-semibold mb-4'}>Venue</h3>
                    <div className={'grid grid-cols-2 gap-8'}>
                        <div>
                            <h4 className={'text-gray-500 font-medium'}>Venue Name</h4>
                            <h3 className={''}>{event.venue.name}</h3>
                        </div>

                        <div>
                            <h4 className={'text-gray-500 font-medium'}>Venue Street</h4>
                            <h3 className={''}>{event.venue.street}</h3>
                        </div>
                        <div>
                            <h4 className={'text-gray-500 font-medium'}>Venue District</h4>
                            <h3 className={''}>{event.venue.district}</h3>
                        </div>
                        <div>
                            <h4 className={'text-gray-500 font-medium'}>Venue City</h4>
                            <h3 className={''}>{event.venue.city}</h3>
                        </div>
                        <div>
                            <h4 className={'text-gray-500 font-medium'}>Venue Country</h4>
                            <h3 className={''}>{event.venue.country}</h3>
                        </div>
                        {/*{event.venue.saved && <div className={'col-span-2 grid grid-cols-2 gap-8'}>*/}

                        {/*    <div>*/}
                        {/*        <h4 className={'text-gray-500 font-medium'}>Venue Capacity</h4>*/}
                        {/*        <h3 className={'font-semibold'}>{venue.capacity} People</h3>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <h4 className={'text-gray-500 font-medium'}>Venue Followers</h4>*/}
                        {/*        <h3 className={'font-semibold'}>{venue.followers}</h3>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <h4 className={'text-gray-500 font-medium'}>Venue Email</h4>*/}
                        {/*        <h3 className={'font-semibold'}>{venue.email}</h3>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <h4 className={'text-gray-500 font-medium'}>Venue Phone</h4>*/}
                        {/*        <h3 className={'font-semibold'}>{venue.phone}</h3>*/}
                        {/*    </div>*/}
                        {/*    <div className={'col-span-2'}>*/}
                        {/*        <h4 className={'text-gray-500 font-medium'}>Venue Links</h4>*/}
                        {/*        <div className={'flex gap-2 items-center'}>*/}
                        {/*            <Button href={`https://lexpulse-web.vercel.app/venue/${venue.id}`} type={'link'}*/}
                        {/*                    className={'text-primary'}>Venue Page</Button>*/}
                        {/*            {venue.links.map(link => <Button href={link.url} type={'link'}*/}
                        {/*                                             className={'text-dark'}>{link.name}</Button>)}*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>}*/}
                    </div>
                </div>
            </div>
            <div>
                <h2 className={'font-semibold'}>Your Tickets</h2>
                {ticket.ticketInfo.map((info, index) => {
                    const ticketInfo = event.ticketInfo.find((value) => value.ticketType === info.ticketType)

                    return <div key={index} className={'bg-dark text-white rounded-lg'}>
                        <div className={' flex py-2 px-4 justify-between rounded-xl'}>
                            <h2 className={'text-xl mb-0'}>{info.numberOfTickets} X {info.ticketType}</h2>
                            <h4 className={'text-lg mb-0'}>{event.currency} {(ticketInfo ? ticketInfo.price : 0) * info.numberOfTickets}</h4>
                        </div>
                    </div>
                })}
                {/*<h3>Cart Summary</h3>*/}
                <div className={'grid grid-cols-2 mt-4'}>
                    <h2>Total</h2>
                    <h2 className={'text-end font-semibold'}>{event.currency} {ticket.totalPrice}</h2>
                    <h2>Amount Paid</h2>
                    <h2 className={'text-end text-primary font-semibold'}>{event.currency} {ticket.amountPaid}</h2>
                </div>

            </div>
        </div>
    </div>
}