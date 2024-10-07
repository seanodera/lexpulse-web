import { useAppSelector } from "@/hooks/hooks";
import { selectUpcomingEvents } from "@/data/slices/eventsSlice";
import EventComponent from "@/components/eventComponent";
import { Button } from "antd";

export default function HomeUpcoming() {
    const events = useAppSelector(selectUpcomingEvents);
    return (
        <section className={'px-4 md:px-16 py-8 bg-upcoming-gradient'}>
            <div className={'flex flex-col md:flex-row justify-between items-center'}>
                <h1 className={'text-xl md:text-3xl text-center mb-4 md:mb-0'}>Upcoming <span className={'text-primary'}>Events</span></h1>
                <Button type={'primary'} ghost>See More</Button>
            </div>
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4 md:gap-8'}>
                {events.map((value, index) => (
                    <EventComponent key={index} event={value} className={`${index === 4 && 'text-white'}`} />
                ))}
            </div>
        </section>
    );
}