import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/data/store";
import {
    fetchExchangeRates,
    initiatePurchase,
    addToCart,
    removeFromCart,
    selectExchangeRates
} from "@/data/slices/cartSlice";
import {Button, Modal, Select} from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { format } from "date-fns";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {selectFocusEvent} from "@/data/slices/eventsSlice";
import {useRouter} from "next/navigation";
import {event} from "next/dist/build/output/log";




export function CartComponent() {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cart);
    const event = useAppSelector(selectFocusEvent)
    const { items, totalPrice, totalTickets, loading, error } = cart;
    const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id));
    };
    const router = useRouter();
    const exchangeRates = useAppSelector(selectExchangeRates);


    if (!event){
        return <div>No event</div>
    }

    function convertPrice(amount: number) {
        if (event && event.currency !== exchangeRates.currency){
            console.log(exchangeRates)
        const convertedPrice = amount * 1.035 / exchangeRates.rates[event.currency] ;
        return `${convertedPrice.toFixed(2)}`;
        } else return amount;
    }
    const handleInitiatePurchase = async () => {
        try {
            const authorizationUrl = await dispatch(initiatePurchase()).unwrap();
            console.log(authorizationUrl);
            router.push(authorizationUrl);
        } catch (err) {
            console.error("Failed to initiate purchase:", err);
        }
    };
    return (
        <div>

            <div className="flex justify-between items-center mt-4">
                <h1 className="font-medium my-0">Cart</h1>

            </div>
            <div className="bg-dark text-white rounded-lg px-4">
                <div className=" pt-4">
                    <h3 className="font-semibold text-gray-500">{format(event.eventDate, 'EEE, dd MMM yyyy')}</h3>
                    <h2 className="font-semibold">{event.eventName}</h2>
                    <p className="flex items-center gap-1">
                        <HiOutlineLocationMarker className="text-primary"/> {event.venue.name}
                    </p>
                </div>
                <table className="w-full border-separate border-spacing-y-3">
                    <thead>
                    <tr>
                        <td className={'font-medium text-gray-500'}>QTY</td>
                        <td className="font-medium text-gray-500">Ticket</td>
                        <td className="font-medium text-gray-500">Price</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody className="bg-dark space-y-2">
                    {items.map((ticket, index) => (
                        <tr
                            className={`py-2 bg-white bg-opacity-10 text-white
                            hover:bg-white hover:text-dark transition-all ease-linear duration-150`}
                            key={index}
                        >
                            <td className={'py-3 px-3 rounded-s-lg font-semibold'}>{ticket.amount}</td>
                            <td className="py-3 px-3 font-semibold">{ticket.name}</td>
                            <td className="py-3 px-3  text-end">{event.currency} {ticket.price}</td>
                            <td className="py-3 px-3 rounded-e-lg"><Button type="link" danger onClick={() => handleRemoveFromCart(ticket.id)}>Remove</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <div className="flex justify-between bg-white bg-opacity-15  py-3 px-4 mt-4 rounded-lg">
                        <h4 className="my-0">Total:</h4>
                        <h4 className="font-medium my-0">{totalTickets} tickets</h4>
                        <h4 className="font-medium my-0">{event.currency} {totalPrice}</h4>
                    </div>

                    {/*<div className={'p-4'}>*/}
                    {/*    <h3 className={'font-medium text-lg text-gray-200'}>Payment Amount</h3>*/}
                    {/*    <h4 className={'font-semibold text-lg'}>{event.currency} {totalPrice}</h4>*/}
                    {/*</div>*/}

                </div>
                <div className="px-4 py-4">
                    <Button type="primary" size={"large"} loading={loading} onClick={() => handleInitiatePurchase()}>Confirm
                        Purchase</Button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
}
