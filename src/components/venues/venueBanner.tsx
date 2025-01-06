import { Venue } from "@/data/types";
import { Carousel, Image, Skeleton } from "antd";

export default function VenueBanner({ venue }: { venue: Venue | undefined }) {
  return (
    <div className={"w-full"}>
      {venue ? (
        <Carousel className={"w-full"} arrows>
          {[venue.poster, ...venue.images].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={venue.name}
              className={"object-cover aspect-[20/7] w-full"}
            />
          ))}
        </Carousel>
      ) : (
        <Skeleton active className={"w-full h-full"} />
      )}
    </div>
  );
}
