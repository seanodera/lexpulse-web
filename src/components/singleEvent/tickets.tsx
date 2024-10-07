'use client'
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { EventModel } from "@/data/types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/data/store";
import { addToCart, clearCart } from "@/data/slices/cartSlice";
import { useRouter } from "next/navigation";
import { TicketPurchaseDialog } from "@/components/singleEvent/ticketsDialog";

export function TicketPurchase({ event }: { event: EventModel }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [amount, setAmount] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [sortedTicketInfo, setSortedTicketInfo] = useState([...event.ticketInfo].sort((a, b) => a.price - b.price));
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { items, totalPrice } = useAppSelector((state: RootState) => state.cart);

    useEffect(() => {
        setSortedTicketInfo([...event.ticketInfo].sort((a, b) => a.price - b.price));
    }, [event.ticketInfo]);

    const handleAddToCart = () => {
        dispatch(clearCart());
        const selectedTicket = sortedTicketInfo[currentIndex];
        dispatch(addToCart({
            id: selectedTicket._id,
            name: selectedTicket.ticketType,
            amount: amount,
            price: selectedTicket.price * amount,
        }));
        router.push('/checkout');
    };

    return (
        <div className="flex flex-col">
            <h3 className="text-primary font-semibold">Tickets</h3>
            <table className="w-full">
                <thead>
                <tr>
                    <td className="font-medium text-gray-500">Ticket Including lexpulse fees</td>
                    <td className="font-medium text-gray-500">Price</td>
                </tr>
                </thead>
                <tbody className="bg-dark space-y-2">
                {sortedTicketInfo.map((ticket, index) => (
                    <tr
                        className={`py-2 ${currentIndex === index ? 'bg-primary text-white' : 'bg-white bg-opacity-10 text-white'} 
                            hover:bg-white hover:text-dark transition-all ease-linear duration-150`}
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                    >
                        <td className="py-3 px-3 rounded-s-lg font-semibold">{ticket.ticketType}</td>
                        <td className="py-3 px-3 rounded-e-lg text-end">{event.currency} {ticket.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {event.ticketInfo.length > 1 && (
                <Button type="text" onClick={() => setIsOpen(true)} size="small" className="text-sm text-gray-500 mt-2 ms-auto">
                    Buying different ticket types?
                </Button>
            )}
            <div className="flex flex-col md:flex-row justify-between mt-4">
                <div className="flex gap-2 items-center mt-2">
                    <Button disabled={amount === 0} onClick={() => setAmount((prev) => prev - 1)} type="primary" size="large" ghost shape="circle" icon={<MinusOutlined />} />
                    <h1 className="my-0 text-3xl">{amount}</h1>
                    <Button onClick={() => setAmount((prev) => prev + 1)} type="primary" size="large" ghost shape="circle" icon={<PlusOutlined />} />
                </div>
                <div className="flex justify-end items-center gap-2 mt-4 md:mt-0">
                    <h2 className="my-0">{event.currency} {(sortedTicketInfo[currentIndex].price * amount).toFixed(2)}</h2>
                    <Button disabled={amount === 0} type="primary" size="large" onClick={handleAddToCart}>
                        Buy
                    </Button>
                </div>
            </div>
            <TicketPurchaseDialog event={event} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    );
}