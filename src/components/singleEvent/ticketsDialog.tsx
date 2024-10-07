import {EventModel} from "@/data/types";
import {SetStateAction, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {RootState} from "@/data/store";
import {addToCart, removeFromCart} from "@/data/slices/cartSlice";
import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {Button} from "antd";
import {DeleteOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import Link from "next/link";


export function TicketPurchaseDialog({
                                         event,
                                         isOpen,
                                         setIsOpen,
                                     }: {
    event: EventModel;
    isOpen: boolean;
    setIsOpen: (value: SetStateAction<boolean>) => void;
}) {
    const dispatch = useAppDispatch();
    const { items, totalPrice, totalTickets } = useAppSelector((state: RootState) => state.cart);
    const [sortedTicketInfo, setSortedTicketInfo] = useState([...event.ticketInfo].sort((a, b) => a.price - b.price));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        setSortedTicketInfo([...event.ticketInfo].sort((a, b) => a.price - b.price));
    }, [event.ticketInfo]);

    const handleAddToCart = () => {
        const selectedTicket = sortedTicketInfo[currentIndex];
        dispatch(
            addToCart({
                id: selectedTicket._id,
                name: selectedTicket.ticketType,
                amount: amount,
                price: selectedTicket.price * amount,
            })
        );
        setAmount(1); // Reset amount after adding to cart
    };

    const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id));
    };
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-dark bg-opacity-60">
                <DialogPanel
                    className="max-w-3xl w-full min-h-80 border bg-white overflow-hidden grid grid-cols-5  rounded-lg">
                    <div className={'col-span-3 p-4'}>
                        <DialogTitle className="font-bold">Review Tickets</DialogTitle>
                        <table className={'w-full border-separate border-spacing-y-2'}>
                            <thead>
                            <tr>
                                <td className={'py-3 px-3 font-semibold text-gray-500'}>Ticket Options</td>
                                <td className={'py-3 px-3 font-semibold text-gray-500'}>Price</td>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedTicketInfo.map((ticket, index) => (
                                <tr className={`py-2 ${currentIndex === index ? 'bg-primary text-white' : 'bg-dark bg-opacity-85 text-white'} rounded-xl  hover:bg-white hover:text-dark transition-all ease-linear duration-150`}
                                    key={index} onClick={() => setCurrentIndex(index)}>
                                    <td className={'py-3 px-3 rounded-s-lg font-semibold'}>{ticket.ticketType}</td>
                                    <td className={'py-3 px-3 rounded-e-lg text-end'}>{event.currency} {ticket.price}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={'col-span-2 bg-dark text-white flex flex-col p-4'}>
                        <h3 className={'font-semibold'}>Cart</h3>
                        {items.length > 0 ? items.map((cartItem, index) => (
                            <div key={index}
                                 className={'flex justify-between items-center w-full border-b border-gray-500 pb-2 mb-2'}>
                                <div className={'group w-full'}>
                                    <h4>{cartItem.name}</h4>
                                    <div className={'flex justify-between w-full'}>
                                        <h4 className={'text-sm'}>Qty: {cartItem.amount}</h4>
                                        <h4 className={'text-primary'}>{event.currency} {cartItem.price.toFixed(2)}</h4>
                                    </div>
                                </div>
                                <Button onClick={() => handleRemoveFromCart(cartItem.id)} size={'small'} type={'text'} danger
                                        shape={'circle'} icon={<DeleteOutlined/>}/>
                            </div>
                        )) : (
                            <p>Your cart is empty.</p>
                        )}
                        <div className={'mt-4'}>
                            <h4>Total Tickets: {totalTickets}</h4>
                            <h4>Total Price: {event.currency} {totalPrice.toFixed(2)}</h4>
                        </div>
                    </div>
                    <div className={'col-span-3 flex justify-between items-center gap-2 p-4'}>
                        <div className={'flex gap-2 items-center mt-2'}>
                            <Button disabled={amount === 0} onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
                                    type={'primary'} ghost shape={'circle'} icon={<MinusOutlined/>}/>
                            <h1 className={'my-0 text-xl'}>{amount}</h1>
                            <Button onClick={() => setAmount((prev) => prev + 1)} type={'primary'} ghost
                                    shape={'circle'} icon={<PlusOutlined/>}/>
                        </div>
                        <Button onClick={handleAddToCart} disabled={amount === 0} type={'primary'}>Add To Cart</Button>
                    </div>
                    <div className={' col-span-2 bg-dark flex items-center justify-end gap-2 p-4'}>
                        <Button onClick={() => setIsOpen(false)} type={'primary'} danger ghost>Close</Button>
                        <Link href={'/checkout'}><Button disabled={amount === 0} type={'primary'} size={'large'}>Buy
                            Tickets</Button></Link>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}


export function TicketPurchaseDialogV2({
                                         event,
                                         isOpen,
                                         setIsOpen,
                                     }: {
    event: EventModel;
    isOpen: boolean;
    setIsOpen: (value: SetStateAction<boolean>) => void;
}) {
    const dispatch = useAppDispatch();
    const { items, totalPrice, totalTickets } = useAppSelector(
        (state: RootState) => state.cart
    );
    const [sortedTicketInfo, setSortedTicketInfo] = useState(
        [...event.ticketInfo].sort((a, b) => a.price - b.price)
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        setSortedTicketInfo(
            [...event.ticketInfo].sort((a, b) => a.price - b.price)
        );
    }, [event.ticketInfo]);

    const handleAddToCart = () => {
        const selectedTicket = sortedTicketInfo[currentIndex];
        dispatch(
            addToCart({
                id: selectedTicket._id,
                name: selectedTicket.ticketType,
                amount: amount,
                price: selectedTicket.price * amount,
            })
        );
        setAmount(1); // Reset amount after adding to cart
    };

    const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id));
    };

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-dark bg-opacity-60">
                <DialogPanel className="max-w-3xl w-full min-h-80 border bg-white overflow-hidden grid grid-cols-1 md:grid-cols-5 rounded-lg">
                    <div className="col-span-1 md:col-span-3 p-4">
                        <DialogTitle className="font-bold">Review Tickets</DialogTitle>
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                            <tr>
                                <td className="py-3 px-3 font-semibold text-gray-500">Ticket Options</td>
                                <td className="py-3 px-3 font-semibold text-gray-500">Price</td>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedTicketInfo.map((ticket, index) => (
                                <tr
                                    className={`py-2 ${
                                        currentIndex === index
                                            ? "bg-primary text-white"
                                            : "bg-dark bg-opacity-85 text-white"
                                    } rounded-xl hover:bg-white hover:text-dark transition-all ease-linear duration-150`}
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                >
                                    <td className="py-3 px-3 rounded-s-lg font-semibold">
                                        {ticket.ticketType}
                                    </td>
                                    <td className="py-3 px-3 rounded-e-lg text-end">
                                        {event.currency} {ticket.price}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-1 md:col-span-2 bg-dark text-white flex flex-col p-4">
                        <h3 className="font-semibold">Cart</h3>
                        {items.length > 0 ?
                            items.map((cartItem, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center w-full border-b border-gray-500 pb-2 mb-2"
                                >
                                    {/* Cart item content here */}
                                </div>
                            )) :
                            <div className="text-center mt-4">
                                Your cart is empty.
                            </div>
                        }
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}