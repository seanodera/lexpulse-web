'use client'
import {Button, Calendar, Select, DatePicker, InputNumber, Slider, message} from "antd";
import EventComponent from "@/components/eventComponent";
import {useEffect, useState} from "react";
import {EventModel, EventTypeList, Ticket, VenueTypeList} from "@/data/types";
import {generateEvents} from "@/data/generator";
import {isAfter, isBefore, parseISO} from 'date-fns';
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {searchEvents, selectEventsLoading, selectFetchedEvents} from "@/data/slices/eventsSlice";

const {Option} = Select;
const {RangePicker} = DatePicker;

export default function EventsPage() {
    const dispatch = useAppDispatch();
    const events  = useAppSelector(selectFetchedEvents);
    const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
    const [selectedVenueTypes, setSelectedVenueTypes] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedDressCodes, setSelectedDressCodes] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<any | null>(null);
    const [minAge, setMinAge] = useState<number | null>(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 100]);

    // Fetch event data when the component mounts
    useEffect(() => {
        setDisplayEvents(events);
        clearFilters()
    }, []);


    const allTicketPrices: number[] = events
        .flatMap(event => event.ticketInfo)
        .map(ticket => ticket.price);

    const minPrice = Math.min(...allTicketPrices);
    const maxPrice = Math.max(...allTicketPrices);
    console.log(events, minPrice, maxPrice);
    const handleEventTypeChange = (value: string[]) => {
        setSelectedEventTypes(value);
    };

    const handleVenueTypeChange = (value: string[]) => {
        setSelectedVenueTypes(value);
    };

    const handleCountryChange = (value: string[]) => {
        setSelectedCountries(value);
    };

    const handleCityChange = (value: string[]) => {
        setSelectedCities(value);
    };

    const handleDistrictChange = (value: string[]) => {
        setSelectedDistricts(value);
    };

    const handleDressCodeChange = (value: string[]) => {
        setSelectedDressCodes(value);
    };

    const handleDateChange = (dates: any | null) => {
        setSelectedDates(dates);
    };

    const handleMinAgeChange = (value: number | null) => {
        setMinAge(value);
    };

    const handlePriceRangeChange = (value: number[]) => {
        setSelectedPriceRange([value[0],value[1]]);
    };

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

const [displayEvents, setDisplayEvents] = useState<EventModel[]>([]);
const [hasRun,setHasRun] = useState<boolean>(false);
const isLoading = useAppSelector(selectEventsLoading)
    useEffect(() => {
        const filteredEvents = events.filter(event => {
            const inSelectedEventTypes = !selectedEventTypes.length || selectedEventTypes.includes(event.category);
            const inSelectedVenueTypes = !selectedVenueTypes.length || selectedVenueTypes.includes(event.venue.name);
            const inSelectedCountries = !selectedCountries.length || selectedCountries.includes(event.venue.country);
            const inSelectedCities = !selectedCities.length || selectedCities.includes(event.venue.city);
            const inSelectedDistricts = !selectedDistricts.length || selectedDistricts.includes(event.venue.district);
            const inSelectedDressCodes = event.dress? !selectedDressCodes.length || selectedDressCodes.includes(event.dress) : false;
            const aboveMinAge = minAge === null || (event.minAge !== undefined && event.minAge >= minAge);
            const inSelectedDates = !selectedDates || (isAfter(event.eventDate, new Date(selectedDates[ 0 ])) && isBefore(event.eventDate, new Date(selectedDates[ 1 ])));
            const inPriceRange = event.ticketInfo .some(
                ticket => ticket.price >= selectedPriceRange[0] && ticket.price <= selectedPriceRange[1]
            );
            return inSelectedEventTypes && inSelectedVenueTypes && inSelectedCountries && inSelectedCities && inSelectedDistricts && inSelectedDressCodes && aboveMinAge && inSelectedDates && inPriceRange;
        });
        setDisplayEvents(filteredEvents);
        if (!isLoading) {
            if (filteredEvents.length === 0 && events.length !== 0) {


                    dispatch(searchEvents({
                        eventTypes: selectedEventTypes,
                        venueTypes: selectedVenueTypes,
                        countries: selectedCountries,
                        cities: selectedCities,
                        districts: selectedDistricts,
                        dressCodes: selectedDressCodes,
                        dateRange: selectedDates ? [new Date(selectedDates[0]), new Date(selectedDates[1])] : null,
                        minAge: minAge,
                        priceRange: selectedPriceRange
                    }))


        } else if (events.length === 0){
               if (!hasRun){
                   dispatch(searchEvents({

                   }))
                   setHasRun(true)

               }

            }
        }
    }, [dispatch, events, minAge, selectedCities, selectedCountries, selectedDates, selectedDistricts, selectedDressCodes, selectedEventTypes, selectedPriceRange, selectedVenueTypes]);
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
                        style={{width: '100%'}}
                        onChange={handleDateChange}
                        value={selectedDates}
                    />
                </div>
                <div >
                    <h3>Event Type</h3>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Select event type(s)"
                        onChange={handleEventTypeChange}
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
                        onChange={handleVenueTypeChange}
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
                        onChange={handleCountryChange}
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
                        onChange={handleCityChange}
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
                        onChange={handleDistrictChange}
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
                        onChange={handleDressCodeChange}
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
                        onChange={handleMinAgeChange}
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