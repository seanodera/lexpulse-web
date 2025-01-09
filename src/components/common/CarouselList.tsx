import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Carousel } from "antd";
import { ReactElement, useRef } from "react";


export default function CarouselList({items, itemsToShow = 4,renderer,className = 'gap-4 text-dark' }:{items: any[], itemsToShow?: number, className?: string, renderer: (item:any, index:number) => ReactElement}){
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
    return  <div>
            <Carousel
          ref={carouselRef}
          className={className}
          slidesToShow={itemsToShow}
          slidesToScroll={itemsToShow}
          autoplay={false}
          infinite
          swipe

        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`px-4 text-dark ${
              index === 0 || index % (itemsToShow + 1) === 0
                ? "pl-0 pr-8"
                : index % itemsToShow === 0 || index === items.length - 1
                ? "pr-0 pl-8"
                : ""
            }`}
            >
              {renderer(item,index)}
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
}