import React from 'react';
import {Ticket} from "@/data/types";


export default function ListTicketComponent({ticket, ticketInfo}: {
    ticket: Ticket |undefined,
    ticketInfo: { _id: string, ticketType: string, numberOfTickets: number }
}) {
    return (
        <div className={'bg-dark text-white '}>
            <div className={' flex py-2 px-4 justify-between rounded-xl'}>
                <h2 className={'text-xl mb-0'}>{ticketInfo.numberOfTickets} X {ticketInfo.ticketType}</h2>
                <h4 className={'text-lg'}>{} {(ticket ? ticket.price : 0) * ticketInfo.numberOfTickets}</h4>
            </div>
        </div>
    );
};

