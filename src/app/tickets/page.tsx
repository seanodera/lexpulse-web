'use client'
import {useEffect, useState} from "react";
import {useAppSelector} from "@/hooks/hooks";
import {selectTickets} from "@/data/slices/ticketsSlice";
import {Button} from "antd";
import {formatDate} from "date-fns";
import {CombinedTicket} from "@/data/types";
import TicketComponent from "@/components/ticketComponent";

export default function TicketsPage() {
    const tickets = useAppSelector(selectTickets);
    const [upcomingTickets, setUpcomingTickets] = useState(tickets);
    const [pastTickets, setPastTickets] = useState(tickets);

    useEffect(() => {
        const currentDate = new Date();

        const sortedUpcomingTickets = tickets.filter(ticket => new Date(ticket.eventId.eventDate) > currentDate);
        const sortedPastTickets = tickets.filter(ticket => new Date(ticket.eventId.eventDate) <= currentDate);

        setUpcomingTickets(sortedUpcomingTickets);
        setPastTickets(sortedPastTickets);
    }, [tickets]);

    return (
        <div>
            <h1 className="font-semibold py-4 px-16">Your Tickets</h1>
            <div className="bg-gradient-radial from-primary to-dark">
                <div className="bg-dark bg-opacity-80 backdrop-blur-md px-16 py-8 text-white border-solid border-s-0 border-e-0 border-t-2 border-b-2 border-primary">
                    <div className={'flex justify-between items-center mb-2 '}>
                        <h2 className={'font-semibold'}>Upcoming Tickets</h2>
                        <Button ghost>See All</Button>
                    </div>
                    <div className="grid grid-cols-5 gap-8">
                        {upcomingTickets.map((ticket, index) => (
                           <TicketComponent key={index} ticket={ticket}/>
                        ))}
                    </div>
                </div>
            </div>
            <div className={'py-8'}>
                <h2 className={'font-semibold px-16'}>Past Tickets</h2>
                <div>

                    {pastTickets.map((ticket, index) => (
                        <TicketComponent key={index} ticket={ticket}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
