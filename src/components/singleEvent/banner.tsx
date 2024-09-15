import {EventModel} from "@/data/types";
import {addHours, format} from "date-fns";
import {Tag} from "antd";
import CountDown from "@/components/singleEvent/countDown";


export default function SingleEventBanner({event}: { event: EventModel }) {

    return <div className={'bg-cover bg-no-repeat'} style={{
        backgroundImage: `url("${event.cover}")`
    }}>
        <div className={'py-8 px-16 backdrop-blur bg-dark bg-opacity-30 text-white grid grid-cols-4 gap-8'}>
            <img
                src={event.poster}
                className={'w-full aspect-square rounded-lg border-solid border-white max-w-screen-sm'}
                alt={'poster'}
            />
            <div className={'col-span-2'}>
                <h1 className={'text-3xl font-semibold capitalize'}>{event.eventName}</h1>
                <div className={'grid grid-cols-2 gap-8'}>
                    <div className={'mt-3'}>
                        <h4 className={'text-gray-300'}>Date</h4>
                        <h3 className={'font-semibold mb-1'}>{format(event.eventDate, 'EEE, dd MMM yyyy')}</h3>
                        <p>{format(event.eventDate, 'HH:mm')} - {event.eventEnd && event.eventEnd}</p>
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
                    <div>
                        <h4 className={'text-gray-300'}>Ticket Sales Closing</h4>
                        <div><CountDown date={event.eventDate}/></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}