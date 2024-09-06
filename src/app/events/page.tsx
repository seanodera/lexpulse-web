import {Button} from "antd";
import EventComponent from "@/components/eventComponent";
import {faker} from "@faker-js/faker";


export default function EventsPage() {

    return <div className={'px-16'}>
        <h1>All Events</h1>
        <div className={'grid grid-cols-5'}>
            <div>
                <div className={'flex justify-between items-center'}>
                    <h2>Filters</h2>
                    <Button type={'text'} className={'text-gray-500'}>Clear All</Button>
                </div>
            </div>
            <div className={'col-span-4 grid grid-cols-4'}>
                <EventComponent event={{
                    price: 30,
                    date: new Date(),
                    name: faker.word.noun(),
                    cover: faker.image.urlLoremFlickr({category: 'concert'}),
                    poster: faker.image.urlLoremFlickr({category: 'poster'}),
                    location: faker.location.street(),
                }}/>
            </div>
        </div>
    </div>
}