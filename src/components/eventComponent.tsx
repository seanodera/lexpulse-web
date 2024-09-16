import {Button} from "antd";
import {HeartOutlined} from "@ant-design/icons";
import {format} from "date-fns";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {EventModel} from "@/data/types";
import Link from "next/link";
import {useEffect, useState} from "react";


export default function EventComponent({event}: { event: EventModel }) {

        const [lowestPrice, setLowestPrice] = useState(0);

        useEffect(() => {
            if (event.ticketInfo && event.ticketInfo.length > 0) {
                // Create a shallow copy of the array before sorting
                const sortedTickets = [...event.ticketInfo].sort((a, b) => a.price - b.price);
                const lowest = sortedTickets[0].price;
                setLowestPrice(lowest);
            } else {
                setLowestPrice(0);
            }
        }, [event.ticketInfo]);


    return (
        <Link href={`events/${event._id}`} className={'rounded-lg bg-white bg-opacity-5 backdrop-blur-md'}>
            <div className={'relative flex justify-end'}>
                <img src={event.poster} className={'aspect-square w-full object-cover rounded-lg'} alt={event.eventName}/>
                <Button
                    className={'absolute top-0 right-0 z-10 text-primary m-3'}
                    size={'large'}
                    type={'default'}
                    icon={<HeartOutlined/>}
                    shape={'circle'}
                />
            </div>
            <h3 className={'text-xl font-medium mt-2 mb-1 capitalize'}>{event.eventName}</h3>
            <div className={'flex justify-between items-center'}>
                <div className={''}>

                    {/* Format date to "Sat, Aug 24, yyyy" */}
                    <h4 className={'text-primary font-medium my-0'}>
                        {format(new Date(event.eventDate), 'EEE, MMM dd, yyyy')}
                    </h4>
                    <span className={'flex gap-2 text-opacity-20 mt-1'}><HiOutlineLocationMarker/> <h4
                        className={'text-gray-500 text-wrap font-medium'}>{event.venue.name} - {event.venue.street},{event.venue.city}</h4></span>
                </div>
                <h4 className={'text-primary'}>{event.currency} {lowestPrice === 0? 'Free' : lowestPrice.toFixed(2)}</h4>
            </div>
        </Link>
    );
}