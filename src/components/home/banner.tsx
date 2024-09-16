'use client'
import {Button, Carousel} from "antd";
import {useAppSelector} from "@/hooks/hooks";
import {selectPromotedEvents} from "@/data/slices/eventsSlice";
import Link from "next/link";


export default function HomeBanner() {
    const events = useAppSelector(selectPromotedEvents)
    console.log(events)
    return <Carousel className={'text-white'} arrows autoplay>
        {events.map(event => <CarouselItem key={event._id} to={`events/${event._id}`} title={event.eventName}
                                           image={event.poster} cover={event.cover} description={event.description}/>)}
    </Carousel>
}

export function CarouselItem({image, cover, title, description, to}: {
    image: string,
    title: string,
    to: string,
    cover: string,
    description: string
}) {

    return <div>
        <div
            className={'w-full aspect-[16/8] bg-cover'}
            style={{
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url("${cover}")`,
            }}
        >
            <div className={'w-full h-full bg-dark text-white bg-opacity-70 flex justify-center items-center'}>
                <div className={'max-w-screen-md gap-8 grid grid-cols-2 w-full text-center'}>
                    <img src={image} className={'w-full aspect-square rounded-lg border-solid border-white'}
                         alt={'poster'}/>
                    <div className={'flex flex-col justify-center items-start'}>
                        <h2 className={'text-2xl font-semibold'}>{title}</h2>
                        <p className={'text-gray-200 line-clamp-3 text-balance'}>{description}</p>
                        <Link href={to}><Button type={'primary'} size={'large'}>View</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}