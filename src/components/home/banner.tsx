import {Button, Carousel} from "antd";


export default function HomeBanner() {

    return <Carousel className={'text-white'} arrows autoplay>
        <CarouselItem image={'/banner.jpg'} title={'Event Name 1'} to={''} cover={'/banner.jpg'} description={'this one Thing isn’t that bad but '}/>
        <CarouselItem image={'/banner2.jpg'} title={'Event Name 2'} to={''} cover={'/banner2.jpg'} description={'this one Thing isn’t that bad but '}/>
    </Carousel>
}

export function CarouselItem({image,cover, title,description, to}: {image:string, title: string, to: string, cover:string, description:string}) {

    return <div>
        <div
            className={'w-full aspect-[16/8] bg-cover'}
            style={{
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url("${cover}")`,
            }}
        >
            <div className={'w-full h-full bg-dark text-white bg-opacity-70 flex justify-center items-center'}>
                <div className={'max-w-screen-md gap-8 grid grid-cols-2 w-full text-center'}>
                    <img src={image} className={'w-full aspect-square rounded-lg border-solid border-white'} alt={'poster'}/>
                    <div className={'flex flex-col justify-center items-start'}>
                        <h2 className={'text-2xl font-semibold'}>{title}</h2>
                        <p className={'text-gray-200 line-clamp-3'}>{description}</p>
                        <Button type={'primary'} size={'large'}>View</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}