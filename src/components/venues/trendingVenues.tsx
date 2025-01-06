"use client";
import { Venue } from "@/data/types";
import { Button, Carousel, Typography } from "antd";
import VenueItem from "./venueItem";
import { useAppSelector } from "@/hooks/hooks";
import { ArrowLeftOutlined, ArrowRightOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";

const { Title, Text } = Typography;

export default function TrendingVenues() {
    const carouselRef = useRef<any| null>(null);
  
  const venues: Venue[] = useAppSelector((state) => state.venue.trendingVenues);
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
      <div className={"flex justify-between items-center mb-2"}>
        <div>
          <Title level={3} className={"text-current mb-0"}>
            Trending Venues
          </Title>
          <Text className={"text-current"}>
            Discover the popular venues in your city
          </Text>
        </div>
        <Button type={"primary"} ghost>
          View All
        </Button>
      </div>
      <Carousel
      ref={carouselRef}
        className={"gap-4"}
        slidesToShow={4}
        slidesToScroll={4}
        autoplay={false}
        infinite
        swipe
        >
            
        {venues.map((venue, index) => (
          <div
            key={index}
            className={`px-4 text-dark ${index === 0 ? "pl-0" : `${index % 4 === 0 || index === venues.length - 1  ? "pr-0" : ""}`} `}
          >
            <VenueItem venue={venue} />
          </div>
        ))}
      </Carousel>
      <div className="flex justify-end items-center gap-4">
        <Button shape="circle" icon={<LeftOutlined/>} onClick={handlePrev} />
        <Button shape="circle" icon={<RightOutlined/>} onClick={handleNext} />
      </div>
    </div>
  );
}
