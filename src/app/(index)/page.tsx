'use client';
import {Button} from 'antd';
import {

    HeartOutlined
} from '@ant-design/icons';

import HomeSearch from "@/components/search";
import HomeBanner from "@/components/home/banner";
import EventComponent from "@/components/eventComponent";
import {faker} from "@faker-js/faker";

export default function Home() {


    return (
        <div>
            <HomeBanner/>
            <HomeSearch/>
            <div className={'bg-gradient-radial from-primary-200 to-transparent'}>
                <section className={'px-16 py-8 '}>
                    <h1 className={'text-2xl font-medium'}>What is <span className={'text-primary'}>popular</span> right
                        now</h1>
                    <div className={'grid grid-cols-4 mt-8 gap-8'}>
                        <EventComponent event={{
                            price: faker.number.int(200),
                            date: new Date(),
                            name: faker.word.noun(),
                            cover: faker.image.urlLoremFlickr({category: 'concert'}),
                            poster: faker.image.urlLoremFlickr({category: 'poster'}),
                            location: faker.location.street(),
                        }}/>
                        <EventComponent event={{
                            price: faker.number.int(200),
                            date: new Date(),
                            name: faker.word.noun(),
                            cover: faker.image.urlLoremFlickr({category: 'concert'}),
                            poster: faker.image.urlLoremFlickr({category: 'poster'}),
                            location: faker.location.street(),
                        }}/>
                        <EventComponent event={{
                            price: faker.number.int(200),
                            date: new Date(),
                            name: faker.word.noun(),
                            cover: faker.image.urlLoremFlickr({category: 'concert'}),
                            poster: faker.image.urlLoremFlickr({category: 'poster'}),
                            location: faker.location.street(),
                        }}/>
                        <EventComponent event={{
                            price: faker.number.int(200),
                            date: new Date(),
                            name: faker.word.noun(),
                            cover: faker.image.urlLoremFlickr({category: 'concert'}),
                            poster: faker.image.urlLoremFlickr({category: 'poster'}),
                            location: faker.location.street(),
                        }}/>
                    </div>
                </section>
            </div>
            <section className={'px-16 py-8 bg-primary text-white'}>
                <h1 className={'text-3xl text-center'}>Upcoming Events</h1>

            </section>
        </div>
    );
}