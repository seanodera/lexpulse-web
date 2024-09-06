'use client';
import {Button} from 'antd';
import {

    HeartOutlined
} from '@ant-design/icons';

import HomeSearch from "@/components/search";
import HomeBanner from "@/components/home/banner";
import EventComponent from "@/components/eventComponent";
import {faker} from "@faker-js/faker";
import HomePopular from "@/components/home/popular";

export default function Home() {


    return (
        <div>
            <HomeBanner/>
            <HomeSearch/>
            <HomePopular/>
            <section className={'px-16 py-8 bg-primary text-white'}>
                <h1 className={'text-3xl text-center'}>Upcoming Events</h1>

            </section>
        </div>
    );
}