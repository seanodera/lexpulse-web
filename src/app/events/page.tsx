'use client'
import { Button, Calendar, Select, DatePicker, InputNumber, Slider, message } from "antd";
import EventComponent from "@/components/eventComponent";
import { Suspense, useEffect, useState, useMemo } from "react";
import { EventModel, EventTypeList, VenueTypeList } from "@/data/types";
import {endOfDay, isAfter, isBefore, parseISO, startOfDay,} from 'date-fns';
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { searchEvents, selectEventsLoading, selectFetchedEvents } from "@/data/slices/eventsSlice";
import { useSearchParams } from "next/navigation";
import dayjs, {Dayjs} from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function EventsPageWrapper() {
    return (
        <Suspense fallback={null}>
            <EventsPage />
        </Suspense>
    );
}

function EventsPage() {
    const dispatch = useAppDispatch();
    const events = useAppSelector(selectFetchedEvents);
    const isLoading = useAppSelector(selectEventsLoading);
    const searchParams = useSearchParams();

    const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>(searchParams.get('eventTypes')?.split(',') || []);
    const [selectedVenueTypes, setSelectedVenueTypes] = useState<string[]>(searchParams.get('venueTypes')?.split(',') || []);
    const [selectedCountries, setSelectedCountries] = useState<string[]>(searchParams.get('countries')?.split(',') || []);
    const [selectedCities, setSelectedCities] = useState<string[]>(searchParams.get('cities')?.split(',') || []);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>(searchParams.get('districts')?.split(',') || []);
    const [selectedDressCodes, setSelectedDressCodes] = useState<string[]>(searchParams.get('dressCodes')?.split(',') || []);
    const [selectedDates, setSelectedDates] = useState<Date[] | null>(searchParams.get('dateRange') ? (searchParams.get('dateRange') as string).split(',').map((date) => {
        console.log(new Date(date));
        return new Date(date);
    }) : null);
    const [minAge, setMinAge] = useState<number | null>(searchParams.get('minAge') ? parseInt(searchParams.get('minAge') as string, 0) : null);
    const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>(
        searchParams.get('priceRange') ? searchParams.get('priceRange')!.split(',').map(Number) as [number, number] : [0, 100]
    );
    const [displayEvents, setDisplayEvents] = useState<EventModel[]>([]);
    const [hasRun, setHasRun] = useState<boolean>(false);
    const [localLoading,setLocalLoading] = useState<boolean>(false);

    const allTicketPrices: number[] = useMemo(
        () => events.flatMap(event => event.ticketInfo).map(ticket => ticket.price),
        [events]
    );

    const minPrice = useMemo(() => Math.min(...allTicketPrices), [allTicketPrices]);
    const maxPrice = useMemo(() => Math.max(...allTicketPrices), [allTicketPrices]);
    console.log((searchParams.get('dateRange') as string).split(',').map((date) => new Date(date)));
    useEffect(() => {
        if (!events.length && !hasRun) {
            dispatch(searchEvents({}));
            setHasRun(true);
            console.log('Running from events');
        }
    }, [dispatch, events.length, hasRun]);

    useEffect(() => {
        const filteredEvents = events.filter(event => {
            const inSelectedEventTypes = !selectedEventTypes.length || selectedEventTypes.includes(event.category);
            const inSelectedVenueTypes = !selectedVenueTypes.length || selectedVenueTypes.includes(event.venue.name);
            const inSelectedCountries = !selectedCountries.length || selectedCountries.includes(event.venue.country);
            const inSelectedCities = !selectedCities.length || selectedCities.includes(event.venue.city);
            const inSelectedDistricts = !selectedDistricts.length || selectedDistricts.includes(event.venue.district);
            const inSelectedDressCodes = event.dress ? !selectedDressCodes.length || selectedDressCodes.includes(event.dress) : true;
            const aboveMinAge = minAge === null || (event.minAge !== undefined && event.minAge >= minAge);
            const inSelectedDates = !selectedDates || (
                isAfter(event.eventDate, startOfDay(new Date(selectedDates[0]))) &&
                isBefore(event.eventDate, endOfDay(new Date(selectedDates[1])))
            );
            const inPriceRange = event.ticketInfo.some(ticket => ticket.price >= selectedPriceRange[0] && ticket.price <= selectedPriceRange[1]);

            return inSelectedEventTypes &&
                inSelectedVenueTypes &&
                inSelectedCountries &&
                inSelectedCities &&
                inSelectedDistricts &&
                inSelectedDressCodes &&
                aboveMinAge &&
                inSelectedDates &&
                inPriceRange;
        });

        setDisplayEvents(filteredEvents);

    }, [events, minAge, selectedCities, selectedCountries, selectedDates, selectedDistricts, selectedDressCodes, selectedEventTypes, selectedPriceRange, selectedVenueTypes]);


    useEffect(() => {

        if (hasRun &&!localLoading && !isLoading && displayEvents.length === 0) {
            console.log('Running from 2nd events', isLoading,localLoading, displayEvents.length, events.length);
            setLocalLoading(true)
            dispatch(searchEvents({
                eventTypes: selectedEventTypes,
                venueTypes: selectedVenueTypes,
                countries: selectedCountries,
                cities: selectedCities,
                districts: selectedDistricts,
                dressCodes: selectedDressCodes,
                dateRange: selectedDates ? [new Date(selectedDates[0]), new Date(selectedDates[1])] : null,
                minAge: minAge || 0,
                priceRange: selectedPriceRange
            })).then((result) => {
                if (result.meta.requestStatus === 'fulfilled'){
                    setLocalLoading(false);
                }
            });
        }
    }, [dispatch, displayEvents.length, events.length, hasRun, isLoading, localLoading, minAge, selectedCities, selectedCountries, selectedDates, selectedDistricts, selectedDressCodes, selectedEventTypes, selectedPriceRange, selectedVenueTypes]);

    const clearFilters = () => {
        setSelectedEventTypes([]);
        setSelectedVenueTypes([]);
        setSelectedCountries([]);
        setSelectedCities([]);
        setSelectedDistricts([]);
        setSelectedDressCodes([]);
        setSelectedDates(null);
        setMinAge(null);
        setSelectedPriceRange([minPrice, maxPrice]);
    };
    const handlePriceRangeChange = (value: number[]) => {
        setSelectedPriceRange([value[0],value[1]]);
    };

    return <div className='px-16 py-8'>
        <h1>All Events</h1>
        <div className='grid grid-cols-5 gap-8'>
            <div className={'space-y-4'}>
                <div className='flex justify-between items-center'>
                    <h2>Filters</h2>
                    <Button type='text' className='text-gray-500' onClick={clearFilters}>Clear All</Button>
                </div>
                <div >
                    <h3>Date Range</h3>
                    <RangePicker
                        value={selectedDates ? [dayjs(selectedDates[0]), dayjs(selectedDates[1])] : null}
                        onChange={(dates: any, dateStrings: [string, string]) => setSelectedDates(dates ? [dates[0].toDate(), dates[1].toDate()] : null)}
                    />
                </div>
                <div >
                    <h3>Event Type</h3>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Select event type(s)"
                        onChange={setSelectedEventTypes}
                        value={selectedEventTypes}
                    >
                        {EventTypeList.map(type => (
                            <Option key={type} value={type}>{type}</Option>
                        ))}
                    </Select>
                </div>
                <div >
                    <h3>Venue Type</h3>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Select venue type(s)"
                        onChange={setSelectedEventTypes}
                        value={selectedVenueTypes}
                    >
                        {VenueTypeList.map(type => (
                            <Option key={type} value={type}>{type}</Option>
                        ))}
                    </Select>
                </div>
                <div >
                    <h3>Country</h3>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Select country(s)"
                        onChange={setSelectedCountries}
                        value={selectedCountries}
                    >
                        {Array.from(new Set(events.map(event => event.venue.country))).map(country => (
                            <Option key={country} value={country}>{country}</Option>
                        ))}
                    </Select>
                </div>
                <div >
                    <h3>City</h3>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Select city(s)"
                        onChange={setSelectedCities}
                        value={selectedCities}
                    >
                        {Array.from(new Set(events.map(event => event.venue.city))).map(city => (
                            <Option key={city} value={city}>{city}</Option>
                        ))}
                    </Select>
                </div>
                <div >
                    <h3>District</h3>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Select district(s)"
                        onChange={setSelectedDistricts}
                        value={selectedDistricts}
                    >
                        {Array.from(new Set(events.map(event => event.venue.district))).map(district => (
                            <Option key={district} value={district}>{district}</Option>
                        ))}
                    </Select>
                </div>
                <div >
                    <h3>Dress Code</h3>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Select dress code(s)"
                        onChange={setSelectedDressCodes}
                        value={selectedDressCodes}
                    >
                        {Array.from(new Set(events.map(event => event.dress))).map(dressCode => (
                            <Option key={dressCode} value={dressCode}>{dressCode}</Option>
                        ))}
                    </Select>
                </div>
                <div >
                    <h3>Minimum Age</h3>
                    <InputNumber
                        style={{width: '100%'}}
                        min={0}
                        placeholder="Enter minimum age"
                        onChange={setMinAge}
                        value={minAge}
                    />
                </div>
                <div >
                    <h3>Price Range</h3>
                    <Slider
                        range
                        min={minPrice}
                        max={maxPrice}
                        step={10}
                        defaultValue={[minPrice, maxPrice]}
                        onChange={handlePriceRangeChange}
                        value={selectedPriceRange}
                    />
                </div>

            </div>
            <div className='col-span-4 grid grid-cols-4 gap-8'>
                {displayEvents.map((value, index) => <EventComponent key={index} event={value}/>)}
            </div>
        </div>
    </div>
}