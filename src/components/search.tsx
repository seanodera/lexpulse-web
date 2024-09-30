'use client';
import {BsMusicNote} from 'react-icons/bs';
import {Button, DatePicker, Select} from "antd";
import dayjs from "dayjs";
import {HiOutlineLocationMarker} from "react-icons/hi";
import {EventTypeList} from "@/data/types";
import {searchEvents} from '@/data/slices/eventsSlice';
import {useState} from "react";
import {useAppDispatch} from "@/hooks/hooks";
import {router} from "next/client";
import {useRouter} from "next/navigation";
import {countries} from "country-data";
import {addDays, formatDate} from "date-fns";

const {Option} = Select;

export default function HomeSearch() {
    const genres = EventTypeList;
    const locations = ['Kenya', 'Ghana'];

    const dispatch = useAppDispatch();

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const router = useRouter();
    const handleSearch = () => {
        const date = selectedDate.toDate();
        const searchParams = {
            eventTypes: [selectedGenre],
            countries: [selectedCountry],
            dateRange: [date, addDays(date, 1)],
            minAge: 0,
        };

        dispatch(searchEvents(searchParams)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                router.push(`/events?countries=${searchParams.countries.join(',')}&eventTypes=${searchParams.eventTypes.join(',')}&dateRange=${searchParams.dateRange.map((d) => formatDate(d, 'yyyy-MMM-dd')).join(',')}&minAge=0`);
            }
        });
    };

    return (
        <div className={'bg-dark'}>
            <div className="flex justify-center  text-primary bg-cross-grid-light">
                <div className={'bg-gradient-to-r flex justify-center from-transparent to-dark w-full py-24'}>
                    <div
                        className="bg-white bg-opacity-5  shadow-md rounded-lg backdrop-blur-md w-full max-w-screen-sm"
                        style={{backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}
                    >
                        <div className={'text-primary w-full max-w-screen-sm h-full p-8'}>
                            <h3 className="text-white text-center text-xl mb-4">Search For Events</h3>
                            <div className="grid grid-cols-2 gap-4">

                                {/* Genre Selector */}
                                <Select
                                    suffixIcon={<BsMusicNote className="text-primary"/>}
                                    size={'large'}
                                    className={'transparent-select  shadow-none border border-solid bg-opacity-20 border-gray-500 active:border-primary text-white rounded-lg placeholder-gray-200  hover:border-primary'}
                                    variant={'outlined'}
                                    style={{background: 'transparent'}}
                                    placeholder={<span className={'text-gray-300'}> Genre</span>}
                                    dropdownStyle={{background: 'Background', color: 'black'}}
                                    onChange={(value) => setSelectedGenre(value)}
                                >
                                    {genres.map((genre) => (
                                        <Option key={genre} value={genre}>
                                            {genre}
                                        </Option>
                                    ))}
                                </Select>

                                {/* Location Selector */}
                                <Select
                                    suffixIcon={<HiOutlineLocationMarker className="text-primary "/>}
                                    placeholder={<span className={'text-gray-300'}>Location</span>}
                                    size={'large'}
                                    variant={'outlined'}
                                    className={'transparent-select shadow-none border border-solid bg-opacity-20 border-gray-500 active:border-primary text-white rounded-lg placeholder-gray-200  hover:border-primary'}
                                    dropdownStyle={{background: 'white', color: 'black'}}
                                    onChange={(value) => setSelectedCountry(value)}
                                >
                                    {locations.map((location) => (
                                        <Option key={location} value={location}>
                                            {location}
                                        </Option>
                                    ))}
                                </Select>

                                {/* Date Picker */}
                                <DatePicker
                                    variant={'outlined'}
                                    format={'ddd MMM DD, YYYY'}
                                    defaultValue={selectedDate}
                                    size={'large'}
                                    className={'bg-transparent shadow-none border border-solid bg-opacity-20 border-gray-500 active:border-primary text-white rounded-lg'}
                                    onChange={(dates) => setSelectedDate(dates)}
                                />
                                <Button className={"mt-4"} type={'primary'} size={'large'}
                                        onClick={handleSearch}>Search</Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}