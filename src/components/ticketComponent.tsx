import {CombinedTicket} from "@/data/types";
import {formatDate} from "date-fns";

export default function TicketComponent({ ticket }: { ticket: CombinedTicket }) {
    return (
        <div className={''}>
            <img
                src={ticket.eventId.poster}
                alt={ticket.eventId.eventName}
                className="w-full aspect-square object-cover rounded-xl border-solid border-white border-2"
            />
            <div className={'my-2'}>
                <h3 className={'font-medium mb-1'}>{ticket.eventId.eventName}</h3>
                <h4 className={'font-medium text-primary'}>
                    {formatDate(new Date(ticket.eventId.eventDate), 'EEE dd MMM yyyy, HH:mm')}
                </h4>
            </div>
            <div className={'grid grid-cols-2 py-4'}>
                <div>
                    <h3>
                        {ticket.ticketInfo.reduce((acc, current) => acc + current.numberOfTickets, 0)} Tickets
                    </h3>
                </div>
                <div className={'text-end'}>
                    <h3>
                        {ticket.eventId.currency} {ticket.totalPrice}
                    </h3>
                </div>
            </div>
        </div>
    );
}