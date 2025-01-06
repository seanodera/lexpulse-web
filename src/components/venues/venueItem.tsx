import { Venue } from "@/data/types";
import {Image, Typography } from "antd";
import Link from "next/link";



const {Title, Text} = Typography;
export default function VenueItem({venue}: {venue: Venue}) {
    return <Link href={'/venues/' + venue._id} className={'block text-current'}>
        <Image src={venue.poster} alt={venue.name} className="rounded-lg object-cover aspect-video w-full"/>
        <Text className={'text-current font-light mb-0 leading-none'}>{venue.type}</Text>
        <Title level={5} className={'text-current leading-none mt-1 mb-0'}>{venue.name}</Title>
        <Text className={'text-current'}>{venue.city}, {venue.country}</Text>
    </Link>
}