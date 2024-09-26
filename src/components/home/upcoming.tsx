import {useAppSelector} from "@/hooks/hooks";
import {selectUpcomingEvents} from "@/data/slices/eventsSlice";
import EventComponent from "@/components/eventComponent";
import {Button} from "antd";


export default function HomeUpcoming() {
    const events = useAppSelector(selectUpcomingEvents);
    return <section className={'px-16 py-8 bg-upcoming-gradient'}>
        <div className={'flex justify-between'}>
            <h1 className={'text-3xl text-center'}>Upcoming <span className={'text-primary'}>Events</span></h1>
            <Button type={'primary'} ghost>See More</Button>
        </div>
        <div className={'grid grid-cols-4 mt-4 gap-8'}>
            {events.map((value, index) => <EventComponent key={index} event={value} className={`${index === 4 && 'text-white'}`} />)}
        </div>

    </section>
}