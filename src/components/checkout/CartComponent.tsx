import { Button } from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { formatDate } from "date-fns";
import { EventModel } from "@/data/types";  // Import your EventModel

export function CartComponent({ event }: { event: EventModel }) {
    return (
        <div>
            <div className={'flex justify-between items-center mt-4'}>
                <h1 className={'font-medium my-0'}>Cart</h1>
                <Button type={'primary'} ghost>Change</Button>
            </div>
            <div className={'bg-dark text-white rounded-lg '}>
                <div className={'px-4 pt-4'}>
                    <h3 className={'font-semibold text-gray-500'}>{formatDate(event.eventDate, 'EEE, dd MMM yyyy')}</h3>
                    <h2 className={'font-semibold'}>{event.eventName}</h2>
                    <p className={'flex items-center gap-1'}><HiOutlineLocationMarker
                        className={'text-primary'}/> {event.venue.name}</p>
                </div>
                <div className={''}>
                    <div className={'flex justify-between bg-white bg-opacity-15 rounded-lg py-3 px-4'}>
                        <h4 className={'my-0'}>5 X VIP Ticket</h4>
                        <h4 className={'font-medium my-0'}>GHS 0</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}