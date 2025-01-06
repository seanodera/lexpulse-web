"use client";
import EventComponent from "@/components/eventComponent";
import VenueBanner from "@/components/venues/venueBanner";
import { setCurrentVenue } from "@/data/slices/venueSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  ContainerOutlined,
  FileTextOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Carousel,
  DatePicker,
  Select,
  Skeleton,
  Typography,
} from "antd";
import { countries } from "country-data";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

const { Title, Text, Paragraph } = Typography;

export default function VenuePage() {
  const { venueId } = useParams();
  const dispatch = useAppDispatch();
  const venue = useAppSelector((state) => state.venue.currentVenue);

  useEffect(() => {
    if (venueId && (!venue || venue._id !== venueId)) {
      dispatch(setCurrentVenue(venueId.toString()));
    }
  }, [venueId, venue, dispatch]);
  const carouselRef = useRef<any | null>(null);
  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };
  return (
    <div>
      <VenueBanner venue={venue} />
      <div className="grid grid-cols-3 px-4 md:px-16 py-8 gap-8">
        <div className="col-span-2 space-y-8">
          {venue ? (
            <div>
              <Title level={3} className="text-current m-0 font-medium">
                {venue.name}
              </Title>
              <Text className="text-current font-semibold m-0 leading-none">
                {venue.district}, {venue.city} {venue.country}
              </Text>
              <Title
                level={5}
                className="text-current font-light m-0 leading-none"
              >
                {venue.type}
              </Title>
            </div>
          ) : (
            <Skeleton active />
          )}

          {venue ? (
            <Card
              title={
                <Title level={3}>
                  <FileTextOutlined /> Description
                </Title>
              }
              classNames={{
                header: "border-0",
              }}
            >
              <Paragraph>{venue.description}</Paragraph>
            </Card>
          ) : (
            <Skeleton active />
          )}
        </div>
        <div>
          <div className="bg-dark rounded-xl p-4">
            <div>
              <div className="flex items-center justify-between gap-4">
                <Title level={4} className="text-white m-0 mb-1">
                  Reserve
                </Title>
                <DatePicker placeholder="Reservation Date" />
              </div>
              <table className="text-white w-full mt-4">
                <thead>
                  <tr>
                    <td>
                      <Title level={5} className="text-current leading-none font-medium">
                        Table
                      </Title>
                    </td>
                    <td>
                      <Title level={5} className="text-current leading-none font-medium">
                        Guests
                      </Title>
                    </td>
                    <td className="text-end">
                      <Title
                        level={5}
                        className="text-current leading-none font-medium text-end"
                      >
                        Minimum Spend
                      </Title>
                    </td>
                  </tr>
                </thead>
                <tbody className="bg-dark">
        {venue?.tables?.map((table, index) => (
          <tr key={index} className={`py-4 rounded-lg ${index === 0 ? 'bg-primary' : ''}`}>
            <td className="py-2 px-4 rounded-s-lg">{table.name}</td>
            <td className="py-2 px-4">4</td>
            <td className="py-2 px-4 text-end rounded-e-lg">
              {countries.all.find(
                (c) => c.name.toLocaleLowerCase() === venue.country.toLocaleLowerCase()
              )?.currencies[0]} {table.minimumSpend}
            </td>
          </tr>
        ))}
      </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-16 pb-8 ">
        <Title level={3}>Venues Events</Title>
        <Carousel
          ref={carouselRef}
          className={"gap-4 text-dark"}
          slidesToShow={4}
          slidesToScroll={4}
          autoplay={false}
          infinite
          swipe
        >
          {venue?.events?.map((event, index) => (
            <div
              key={index}
              className={`px-4 text-dark ${
                index === 0
                  ? "pl-0"
                  : `${
                      index % 4 === 0 || index === venue.events!.length - 1
                        ? "pr-0"
                        : ""
                    }`
              } `}
            >
              <EventComponent event={event} />
            </div>
          ))}
        </Carousel>
        <div className="flex justify-end items-center gap-4">
          <Button shape="circle" icon={<LeftOutlined />} onClick={handlePrev} />
          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
