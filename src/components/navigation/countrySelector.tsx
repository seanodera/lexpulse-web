import {countries} from "country-data";
import {Select} from "antd";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {changeRegion, selectEventsCountry} from "@/data/slices/eventsSlice";

const { Option } = Select;

export default function CountrySelector() {
    const selectedCountry = useAppSelector(selectEventsCountry);
    const dispatch = useAppDispatch();

    const handleChange = (value: string) => {
        dispatch(changeRegion(countries[value].name));
    };

    // Get the initially selected country
    const initialCountry = countries.all.find((value) => value.name.toLowerCase() === selectedCountry.toLowerCase())?.alpha2;

    return (
        <Select
            defaultValue={initialCountry}
            className='border-0 bg-transparent p-0 mx-1 text-white max-md:w-full'
            onChange={handleChange}
        >
            <Option value='GH'>
                {countries['GH'].emoji} {countries['GH'].name}
            </Option>
            <Option value='KE'>
                {countries['KE'].emoji} {countries['KE'].name}
            </Option>
        </Select>
    );
}