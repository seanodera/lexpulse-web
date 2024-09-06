'use client';
import {Listbox} from '@headlessui/react';
import {BsMusicNote} from 'react-icons/bs';
import {CalendarOutlined, DownOutlined} from '@ant-design/icons';
import {FilledButton} from "@/components/buttons";
import {Button, DatePicker} from "antd";
import dayjs from "dayjs";
import {HiOutlineLocationMarker} from "react-icons/hi";

export default function HomeSearch() {
    const genres = ['Rock', 'Jazz', 'Hip-Hop'];
    const locations = [''];

    return (
        <div className={'bg-dark'}>
            <div className="flex justify-center  text-primary bg-cross-grid-light">
                <div className={'bg-gradient-to-r flex justify-center from-transparent to-dark w-full py-24'}>
                    <div
                        className="bg-white bg-opacity-5  shadow-md rounded-lg backdrop-blur-md w-full max-w-screen-sm"
                        style={{backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}
                    >
                        <div
                            className={'text-primary w-full max-w-screen-sm h-full p-8'}>
                            <h3 className="text-white text-center text-xl mb-4">Search For Events</h3>
                            <div className="grid grid-cols-2 gap-4">

                                {/* Genre Selector */}
                                <div className="relative">
                                    <Listbox>
                                        <Listbox.Button
                                            className="w-full flex justify-between items-center px-2 py-3 bg-transparent shadow-none border border-solid bg-opacity-20 border-gray-500 active:border-primary text-white rounded-lg">
                <span className="m-0 text-lg flex items-center">
                  <BsMusicNote className="text-primary mr-2"/> Genre
                </span>
                                            <DownOutlined/>
                                        </Listbox.Button>
                                        <Listbox.Options
                                            className="absolute w-full bg-white text-black mt-1 rounded z-10">
                                            {genres.map((genre) => (
                                                <Listbox.Option key={genre} value={genre}
                                                                className="p-2 cursor-pointer hover:bg-gray-200">
                                                    {genre}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Listbox>
                                </div>

                                {/* Location Selector */}
                                <div className="relative">
                                    <Listbox>
                                        <Listbox.Button
                                            className="w-full flex justify-between items-center px-2 py-3 bg-transparent shadow-none border border-solid bg-opacity-20 border-gray-500 active:border-primary text-white rounded-lg">
                <span className="m-0 text-lg flex items-center">
                  <HiOutlineLocationMarker className="text-primary mr-2"/> Location
                </span>
                                            <DownOutlined/>
                                        </Listbox.Button>
                                        <Listbox.Options
                                            className="absolute w-full bg-white text-black mt-1 rounded z-10">
                                            {locations.map((location) => (
                                                <Listbox.Option key={location} value={location}
                                                                className="p-2 cursor-pointer hover:bg-gray-200">
                                                    {location}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Listbox>
                                </div>

                                {/* Dates Selector */}
                                <DatePicker variant={'outlined'}
                                            suffixIcon={<CalendarOutlined className={'text-white'}/>}
                                            format={'ddd MMM DD, YYYY'} size={'large'}
                                            defaultValue={dayjs()}
                                            className={'px-2 py-3 bg-transparent shadow-none border border-solid bg-opacity-20 border-gray-500 active:border-primary text-white rounded-lg placeholder-gray-200  hover:border-primary'}/>

                                {/* Search Button */}
                                <Button className={'px-2 py-3'} type={'primary'} size={'large'}>Search</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}