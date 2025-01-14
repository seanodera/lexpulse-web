'use client'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {CartItem, PawaPayCountryData} from '@/data/types';
import { common, getCountry } from "@/data/utils";
import axios from "axios";
import { RootState } from "@/data/store";
import {countries} from "country-data";

const host = process.env.NEXT_PUBLIC_HOST;

interface CartState {
    items: CartItem[];
    totalPrice: number;
    totalTickets: number;
    loading: boolean;
    error: string | null;
    exchangeRates: any;
    configs: PawaPayCountryData[];
    paymentMethod: any;
    paymentCurrency: string;
    paymentRate: number;
    grandTotal: number;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
    totalTickets: 0,
    loading: false,
    error: null,
    exchangeRates: undefined,
    configs: [],
    paymentMethod: 'new',
    paymentCurrency: 'GHS',
    paymentRate: 1,
    grandTotal: 0,

};

export const fetchExchangeRates = createAsyncThunk(
    'cart/fetchExchangeRates',
    async (_, {getState}) => {
        try {
            // const country = await getCountry();
            const state = getState() as RootState
            let fromCurrency = countries.all.find((country) => country.name.toLowerCase() === state.events.country.toLowerCase())?.currencies[0] ?? 'KES';
            const ghsRatesUrl = `https://open.er-api.com/v6/latest/${fromCurrency}`;

            const response = await fetch(ghsRatesUrl);
            const data = await response.json();

                return { rates: data.rates, currency: data.base_code };

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
        paymentMethod: cart.paymentMethod,
        ticketInfo: items.map(value => ({
            ticketType: value.name,
            numberOfTickets: value.amount,
        })),
        callback_url: `${host}/complete`,
        fees: 0.05 * totalPrice
    };
    console.log(body, cart,auth);

    try {

        const response = await axios.post(`${common.baseUrl}/api/v1/transactions/initiate`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Transaction Hold Initiated:', response.data);

        return response.data.data.authorizationUrl;
    } catch (error: any) {
        console.error('Error Initiating Transaction Hold:', error.response ? error.response.data : error.message);
        throw new Error('Failed to initiate transaction');
    }
});

// /api/v1/payouts/configs
export const fetchPawaPayConfigs = createAsyncThunk(
    'confirmBooking/fetchPawaPayConfigs', async (_, {rejectWithValue}) => {
        try {
            const res = await axios.get(`${common.baseUrl}/api/v1/payouts/configs`)
            return res.data.data;
        } catch (e) {
            return rejectWithValue('Error fetching payment configs')
        }
    }
)

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
            state.grandTotal = state.totalPrice * 1.05;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const itemToRemove = state.items.find(item => item.id === action.payload);
            if (itemToRemove) {
                state.totalPrice -= itemToRemove.price;
                state.items = state.items.filter(item => item.id !== action.payload);
                state.totalTickets -= itemToRemove.amount;
            }
            state.grandTotal = state.totalPrice * 1.05;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalTickets = 0;
            state.grandTotal = 0;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setPaymentMethod: (state,action: PayloadAction<string>) => {
            state.paymentMethod = action.payload;
        },
        setPaymentCurrency: (state, action: PayloadAction<{ currency: string; eventCurrency: string }>) => {
            const { currency, eventCurrency } = action.payload;

            state.paymentCurrency = currency;

            if (
                state.exchangeRates &&
                state.exchangeRates.rates &&
                state.exchangeRates.rates[eventCurrency] &&
                state.exchangeRates.rates[currency]
            ) {

                const conversionRate =
                    state.exchangeRates.rates[currency] / state.exchangeRates.rates[eventCurrency];
                state.paymentRate = conversionRate === 1? conversionRate :  conversionRate * 1.02;
            } else {

                state.paymentRate = 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchangeRates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExchangeRates.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                state.exchangeRates = action.payload;
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
            })
            .addCase(fetchPawaPayConfigs.pending, (state) => {
                // state.loading = true;
                state.error = null;
            })
            .addCase(fetchPawaPayConfigs.fulfilled, (state, action) => {
                state.loading = false;
                state.configs = action.payload;
            })
            .addCase(fetchPawaPayConfigs.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload as string || 'Error fetching PawaPay payment configs';
            });
    },
});


export const selectExchangeRates = (state:RootState) => state.cart.exchangeRates;
export const { addToCart, removeFromCart, clearCart, setLoading, setError,setPaymentCurrency,setPaymentMethod } = cartSlice.actions;
export default cartSlice.reducer;
