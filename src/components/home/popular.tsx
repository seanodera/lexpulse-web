'use client'
import EventComponent from "@/components/eventComponent";
import { useAppSelector } from "@/hooks/hooks";
import { selectUpcomingEvents } from "@/data/slices/eventsSlice";

export default function HomePopular() {
    const events = useAppSelector(selectUpcomingEvents);

    return (
        <div className={'bg-gradient-radial from-primary-200 to-transparent'}>
            <section className={'px-4 md:px-16 py-8'}>
                <h1 className={'text-xl md:text-2xl font-medium'}>What is <span className={'text-primary'}>popular</span> right now</h1>
                <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-4 md:gap-8'}>
                    {events.map((value, index) => <EventComponent key={index} event={value} />)}
                </div>
            </section>
        </div>
    );
}