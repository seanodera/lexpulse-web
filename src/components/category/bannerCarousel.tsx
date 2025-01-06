'use client'
import {Button, Carousel} from "antd";
import {useEffect, useState} from "react";
import {EventModel} from "@/data/types";

import {HeartOutlined} from "@ant-design/icons";
// import {generateEvents} from "@/data/generator";
import Link from "next/link";
import Image from "next/image";
import {extractImageColors, getColorPalette, Palette} from "@/data/palette";


export default function BannerCarousel() {
    const [events, setEvents] = useState<EventModel[]>([]);


    // useEffect(() => {
    //     setEvents(generateEvents(2));
    // }, []);

    return <Carousel autoplay arrows>
        {events.map((event, index) => (
            <CarouselItem2
                key={index}
                image={event.poster}
                title={event.eventName}
                to={'/comedy'}
                cover={event.cover}
                description={event.description}
            />
        ))}
    </Carousel>
}



export function CarouselItem2({image, cover, title, description, to}: {
    image: string,
    title: string,
    to: string,
    cover: string,
    description: string
}) {
    const [colors, setColors] = useState<Palette | null>(null);

    // Extract the color palette from the image
    useEffect(() => {
        extractImageColors(image).then((colorData) => {
            const palette = getColorPalette(colorData);
            setColors(palette);
        });
    }, [image]);

    return (
        <div>
            <div
                className={'w-full aspect-[16/5] bg-cover'}
                style={{
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundImage: `url("${cover}")`,
                }}
            >
                <div
                    className={`w-full h-full flex justify-center items-center`}
                    style={{
                        backgroundColor: colors?.darkMuted?.hex || colors?.lightMuted?.hex || 'rgba(0, 0, 0, 0.7)', // Use background color from the palette or default to dark
                    }}
                >
                    <div className={'max-w-screen-md gap-8 grid grid-cols-2 w-full text-center'}>
                        <img
                            src={image}
                            className={'w-full aspect-square rounded-lg border-solid border-white max-w-screen-sm'}
                            alt={'poster'}
                        />
                        <div className={'flex flex-col justify-center items-start text-start'}>
                            <h2
                                className={`text-2xl font-semibold mb-1 capitalize`}
                                style={{
                                    color: (colors?.vibrant?.hex === (colors?.darkMuted?.hex || colors?.lightMuted?.hex)) ? (colors?.lightMuted?.hex === (colors?.darkMuted?.hex || colors?.lightMuted?.hex)) ? '#FFFFFF' : colors?.lightMuted?.hex : colors?.vibrant?.hex || '#FFFFFF', // Use vibrant color for the title or default to white
                                }}
                            >
                                {title}
                            </h2>
                            <p
                                className={`line-clamp-3 mt-0`}
                                style={{
                                    color: (colors?.darkMuted?.hex === (colors?.darkMuted?.hex || colors?.lightMuted?.hex))? '#FFFFFF' : '#000000', // Use lightMuted color for the description or default to white
                                }}
                            >
                                {description}
                            </p>
                            <div className={'flex gap-2'}>
                               <Link href={to}> <Button
                                   type={'primary'}
                                   color={(colors?.vibrant?.hex === (colors?.darkMuted?.hex || colors?.lightMuted?.hex)) ? (colors?.lightMuted?.hex === (colors?.darkMuted?.hex || colors?.lightMuted?.hex)) ? '#FFFFFF' : colors?.lightMuted?.hex : colors?.vibrant?.hex || '#FFFFFF'}
                                   size={'large'}
                                   style={{
                                       backgroundColor: (colors?.vibrant?.hex === (colors?.darkMuted?.hex || colors?.lightMuted?.hex)) ? (colors?.lightMuted?.hex === (colors?.darkMuted?.hex || colors?.lightMuted?.hex)) ? '#FFFFFF' : colors?.lightMuted?.hex : colors?.vibrant?.hex || '#FFFFFF',
                                   }}
                               >
                                   View
                               </Button></Link>
                                <Button type={'primary'} ghost size={'large'} icon={<HeartOutlined/>} style={{
                                    borderColor: (colors?.vibrant?.hex === (colors?.darkMuted?.hex || colors?.lightMuted?.hex)) ? (colors?.lightMuted?.hex === (colors?.darkMuted?.hex || colors?.lightMuted?.hex)) ? '#FFFFFF' : colors?.lightMuted?.hex : colors?.vibrant?.hex || '#FFFFFF',
                                    color: (colors?.vibrant?.hex === (colors?.darkMuted?.hex || colors?.lightMuted?.hex)) ? (colors?.lightMuted?.hex === (colors?.darkMuted?.hex || colors?.lightMuted?.hex)) ? '#FFFFFF' : colors?.lightMuted?.hex : colors?.vibrant?.hex || '#FFFFFF',
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}