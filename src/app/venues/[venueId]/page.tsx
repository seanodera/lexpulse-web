"use client";
import CarouselList from "@/components/common/CarouselList";
import EventComponent from "@/components/eventComponent";
import ReservationComponent from "@/components/venues/reservationComponent";
import VenueBanner from "@/components/venues/venueBanner";
import { setCurrentVenue } from "@/data/slices/venueSlice";
import { EventModel, RecurringEvent } from "@/data/types";
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
import { ReactElement, useEffect, useRef, useState } from "react";

const { Title, Text, Paragraph } = Typography;

export default function VenuePage() {
  const { venueId } = useParams();
  const dispatch = useAppDispatch();
  const venue = useAppSelector((state) => state.venue.currentVenue);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

          {venue?.recurringEvents && venue.recurringEvents.length !== 0 && (
            <div>
              <Title level={3}> Daily Activities</Title>
              <CarouselList
                items={[...venue.recurringEvents].sort(
                  (a, b) => a.dayOfWeek - b.dayOfWeek
                )}
                itemsToShow={3}
                renderer={(event: RecurringEvent, index) => (
                  <div>
                    <img
                      src={event.poster}
                      className="aspect-square w-full rounded-lg"
                      alt="No Image"
                    />
                    <Title className="text-current leading-none mt-1" level={5}>
                      {event.name}
                    </Title>
                    <Text className="text-current gap-2 items-center font-medium">
                      Every{" "}
                      <Button type={"primary"} ghost size={"small"}>
                        {daysOfWeek[event.dayOfWeek]}
                      </Button>
                    </Text>
                    <Paragraph ellipsis={{ rows: 2 }}>
                      {event.description}
                    </Paragraph>
                  </div>
                )}
              />
            </div>
          )}
        </div>
        <div>
          {venue ? <ReservationComponent venue={venue} /> : <Skeleton />}
        </div>
      </div>
      {venue && venue.events ? (
        <div className="px-4 md:px-16 pb-8 ">
          <Title level={3}>Venues Events</Title>
          <CarouselList
            items={venue.events}
            renderer={(item: EventModel, index: number) => (
              <EventComponent event={item} />
            )}
          />
        </div>
      ) : (
        <Skeleton.Node />
      )}
    </div>
  );
}
