'use client'
import { StarFilled, UserOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import { Avatar, Button, Typography } from "antd";

const {Title, Paragraph, Text} = Typography
export default function VenuesBanner() {

  const venue = {
    name: "The Grand Hall",
    street: "123 Event Street",
    city: "Nairobi",
    district: "Westlands",
    country: "Kenya",
    links: [
      {
        name: "Website",
        url: "https://www.thegrandhall.com",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/thegrandhall",
      },
    ],
    followers: 1500,
    images: [
      "https://images.unsplash.com/photo-1612838320302-4",
      "https://images.unsplash.com/photo-1612838320302-5",
    ],
    poster: '/banner2.jpg',
    capacity: 500,
    type: "Conference Center",
    yearEvents: 20,
    description:
      "The Grand Hall is a premier event venue located in the heart of Nairobi, Kenya. We host a variety of events including conferences, weddings, and concerts.",
    phone: "+254 123 456 7890",
    email: "info@thegrandhall.com",
    createdAt: new Date(),
    userId: "60d0fe4f5311236168a109ca", // Example ObjectId
    tables: [
      "60d0fe4f5311236168a109cb", // Example ObjectId
      "60d0fe4f5311236168a109cc", // Example ObjectId
    ],
    recurringEvents: [
      "60d0fe4f5311236168a109cd", // Example ObjectId
      "60d0fe4f5311236168a109ce", // Example ObjectId
    ],
  };
  
  return (
    <div className={" w-full aspect-20/7"}>
      <div
        className={"w-full h-full flex items-end py-8 px-4 md:px-16 bg-cover bg-center"}
        style={{ backgroundImage: `url("${venue.poster}")` }}
      >
        <div className="w-full flex justify-between items-end text-white">
          <div className={'max-w-md bg-dark bg-opacity-50 rounded-lg p-4'}>
           <div className="flex justify-between items-center">
           <div>
           <Title level={5} className={'text-white font-light mb-4 leading-none'}>{venue.type}</Title>
            <Title level={4} className={'text-white m-0 leading-none'}>{venue.name}</Title>
            <Text className={'text-white font-semibold'}>{venue.district}, {venue.city} {venue.country}</Text>
            </div>
            <div className="flex items-center">
                <Avatar size={'small'} icon={<UserOutlined />} className="bg-transparent text-primary" />
                <Text className={'text-white m-0 leading-none'}>{venue.followers} Followers</Text>
            </div>
           </div>
            <Paragraph className={'text-white mt-4'}>{venue.description}</Paragraph>
            <Button type={'primary'}>View</Button>
          </div>
          <div>
            <Avatar size="large" src={'/logo/logo.svg'} shape={'square'} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
