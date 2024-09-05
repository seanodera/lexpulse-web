'use client';
import {Button} from 'antd';
import {

    HeartOutlined
} from '@ant-design/icons';

import HomeSearch from "@/components/search";
import HomeBanner from "@/components/home/banner";

export default function Home() {


    return (
        <div>
            <HomeBanner/>
            <HomeSearch/>
            <section className={'px-16 py-8'}>
                <h1 className={'text-3xl font-medium'}>What is <span className={'text-primary'}>popular</span> right now</h1>
                <div className={'grid grid-cols-4 mt-4 gap-8'}>
                    <div className={'rounded-lg bg-white bg-opacity-20 backdrop-blur-md '}>
                        <div className={'relative flex justify-end'}>
                            <img src={'/banner.jpg'} className={'aspect-square w-full object-cover rounded-lg'}/>
                            <Button className={'absolute top-0 right-0 z-10 text-primary  m-3'} size={'large'} type={'default'} icon={<HeartOutlined/>}  shape={'circle'}/>
                        </div>
                        <div className={'px-2'}>
                            <h3 className={'text-xl'}>Event Name</h3>
                            <h4 className={'text-primary'}>Saturday 28th August</h4>
                            <h4>Wembley Arena</h4>
                        </div>
                    </div>
                </div>
            </section>
            <section className={'px-16 py-8 bg-primary text-white'}>
                <h1 className={'text-3xl text-center'}>Upcoming Events</h1>

            </section>
        </div>
    );
}