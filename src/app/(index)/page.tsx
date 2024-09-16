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
import HomeUpcoming from "@/components/home/upcoming";

export default function Home() {


    return (
        <div>
            <HomeBanner/>
            <HomeSearch/>
            <HomePopular/>
           <HomeUpcoming/>
        </div>
    );
}