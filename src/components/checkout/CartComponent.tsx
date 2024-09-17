import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/data/store";
import { fetchExchangeRates, initiatePurchase,addToCart, removeFromCart } from "@/data/slices/cartSlice";
import { Button } from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { format } from "date-fns";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {selectFocusEvent} from "@/data/slices/eventsSlice";
import {useRouter} from "next/navigation";



export function CartComponent() {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cart);
    const event = useAppSelector(selectFocusEvent)
    const { items, totalPrice, totalTickets, loading, error } = cart;

    useEffect(() => {
        dispatch(fetchExchangeRates());
    }, [dispatch]);

    const handleAddToCart = () => {
        // Add an example item to the cart
        dispatch(addToCart({
            id: 'ticket-123',
            name: 'VIP Ticket',
            price: 100,
            amount: 1,
        }));
    };

    const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id));
    };
    const router = useRouter();
    const handleInitiatePurchase = async () => {
        try {
            const authorizationUrl = await dispatch(initiatePurchase()).unwrap();
            // Perform the redirect on the client
            router.push(authorizationUrl);
        } catch (err) {
            console.error("Failed to initiate purchase:", err);
        }
    };
    if (!event){
        return <div>No event</div>
    }
    return (
        <div>
            <div className="flex justify-between items-center mt-4">
                <h1 className="font-medium my-0">Cart</h1>
                <Button type="primary" ghost onClick={handleAddToCart}>Add Item</Button>
            </div>
            <div className="bg-dark text-white rounded-lg ">
                <div className="px-4 pt-4">
                    <h3 className="font-semibold text-gray-500">{format(event.eventDate, 'EEE, dd MMM yyyy')}</h3>
                    <h2 className="font-semibold">{event.eventName}</h2>
                    <p className="flex items-center gap-1">
                        <HiOutlineLocationMarker className="text-primary" /> {event.venue.name}
                    </p>
                </div>
                <div>
                    {items.map(item => (
                        <div key={item.id} className="flex justify-between bg-white bg-opacity-15 rounded-lg py-3 px-4">
                            <h4 className="my-0">{item.amount} X {item.name}</h4>
                            <h4 className="font-medium my-0">GHS {item.price}</h4>
                            <Button type="link" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
                        </div>
                    ))}
                    <div className="flex justify-between bg-white bg-opacity-15 rounded-lg py-3 px-4 mt-4">
                        <h4 className="my-0">Total:</h4>
                        <h4 className="font-medium my-0">{totalTickets} tickets</h4>
                        <h4 className="font-medium my-0">GHS {totalPrice}</h4>
                    </div>
                </div>
                <div className="px-4 py-4">
                    <Button type="primary" loading={loading} onClick={handleInitiatePurchase}>Confirm Purchase</Button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
}