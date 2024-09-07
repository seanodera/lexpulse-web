'use client'
import {Button} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {EventModel} from "@/data/types";
import {useState} from "react";


export function TicketPurchase({event}: {event: EventModel}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [amount, setAmount] = useState(1);
    return <div>
        <h3 className={'text-primary font-semibold'}>Tickets</h3>
        <table className={'w-full'}>
            <thead>
            <tr>
                <td className={'py-3 px-3 font-semibold text-gray-500'}>Ticket Including lexpulse fees</td>
                <td className={'py-3 px-3 font-semibold text-gray-500'}>Price</td>
            </tr>
            </thead>
            <tbody className={'bg-dark'}>{event.tickets.map((ticket, index) => (
                <tr className={`py-2 ${currentIndex === index? 'bg-primary text-white': 'bg-white bg-opacity-10 text-white' }  hover:bg-white hover:text-dark transition-all ease-linear duration-150`}
                    key={index} onClick={() => setCurrentIndex(index)}>
                    <td className={'py-3 px-3 font-semibold'}>{ticket.name}</td>
                    <td className={'py-3 px-3 text-end'}>GHS {ticket.price}</td>
                </tr>
            ))}</tbody>
        </table>
        <div className={'flex justify-between mt-2'}>
            <div className={'flex gap-2 items-center mt-2'}>
                <Button disabled={amount === 0} onClick={() => setAmount((prev) => prev - 1)} type={'primary'} size={'large'} ghost shape={'circle'}
                        icon={<MinusOutlined/>}/>
                <h1 className={'my-0 text-3xl'}>{amount}</h1>
                <Button onClick={() => setAmount((prev) => prev + 1)} type={'primary'} size={'large'} ghost shape={'circle'}
                        icon={<PlusOutlined/>}/>
            </div>
            <div>
                <Button disabled={amount === 0} type={'primary'} size={'large'}>Buy Tickets</Button>
            </div>
        </div>
    </div>
}