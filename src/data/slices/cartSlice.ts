'use client'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/data/types';
import { common, getCountry } from "@/data/utils";
import axios from "axios";
import { RootState } from "@/data/store";

const host = process.env.NEXT_PUBLIC_HOST;

interface CartState {
    items: CartItem[];
    totalPrice: number;
    totalTickets: number;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
    totalTickets: 0,
    loading: false,
    error: null,
};

export const fetchExchangeRates = createAsyncThunk(
    'confirmBooking/fetchExchangeRates',
    async (_) => {
        try {
            const country = await getCountry();
            let fromCurrency = country?.currency || 'GHS';
            const ghsRatesUrl = 'https://open.er-api.com/v6/latest/GHS';

            const response = await fetch(ghsRatesUrl);
            const data = await response.json();

            if (fromCurrency === 'GHS') {
                return { rates: data.rates, currency: data.base_code };
            } else {
                const conversionRate = data.rates[fromCurrency];
                const convertedRates = Object.fromEntries(
                    Object.entries(data.rates).map(([key, value ]) => [key, value as number / conversionRate])
                );
                return { rates: convertedRates, currency: 'GHS' };
            }
        } catch (error: any) {
            console.error('Error fetching exchange rates:', error);
            throw new Error('Failed to fetch exchange rates');
        }
    }
);

export const initiatePurchase = createAsyncThunk('cart/initPurchase', async (_, { getState }) => {
    const { cart, events, auth } = getState() as RootState;
    const { items, totalPrice} = cart;

    if (!events.focusEvent) {
        throw new Error('Internal Error occurred');
    }



    const token = auth.token; // Replace with your actual token

    const body = {
        email: auth.user.email,
        amount: totalPrice,
        eventId: events.focusEvent._id,
        attendeeId: auth.user.id,
        paymentMethod: 'credit_card',
        ticketInfo: items.map(value => ({
            ticketType: value.name,
            numberOfTickets: value.amount,
        })),
        callback_url: `${host}/complete`
    };
    console.log(body, cart,auth);

    try {
        const response = await axios.post(`${common.baseUrl}/api/v1/transactions/initiate`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Transaction Hold Initiated:', response.data);

        return response.data.data.data.authorization_url;
    } catch (error: any) {
        console.error('Error Initiating Transaction Hold:', error.response ? error.response.data : error.message);
        throw new Error('Failed to initiate transaction');
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.amount += action.payload.amount;
                existingItem.price += action.payload.price;
            } else {
                state.items.push(action.payload);
            }
            state.totalPrice += action.payload.price;
            state.totalTickets += action.payload.amount;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const itemToRemove = state.items.find(item => item.id === action.payload);
            if (itemToRemove) {
                state.totalPrice -= itemToRemove.price;
                state.items = state.items.filter(item => item.id !== action.payload);
                state.totalTickets -= itemToRemove.amount;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalTickets = 0;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchangeRates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExchangeRates.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                // handle the fetched exchange rates if needed
            })
            .addCase(fetchExchangeRates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch exchange rates';
            })
            .addCase(initiatePurchase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initiatePurchase.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                // handle the purchase initiation result
            })
            .addCase(initiatePurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to initiate purchase';
            });
    },
});

export const { addToCart, removeFromCart, clearCart, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;