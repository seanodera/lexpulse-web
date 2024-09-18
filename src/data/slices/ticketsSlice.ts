import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { common } from "@/data/utils";
import { RootState } from "@/data/store";
import {CombinedTicket} from "@/data/types";
import {state} from "sucrase/dist/types/parser/traverser/base";
import {string} from "yup";

interface TicketsState {
    tickets: CombinedTicket[],
    focusTicket: CombinedTicket | undefined,
    ticketsLoading: boolean,
    ticketsError: string | undefined,

}

const initialState: TicketsState = {
    tickets: [],
    focusTicket: undefined,
    ticketsLoading: false,
    ticketsError: undefined,
}

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { getState, rejectWithValue }) => {
    try {
        const { auth } = getState() as RootState;
        const token = auth.token;
        const response = await axios.get(`${common.baseUrl}/api/v1/tickets/user/${auth.user.id}/CONFIRMED`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const response2 = await axios.get(`${common.baseUrl}/api/v1/tickets/user/${auth.user.id}/booked`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        if (response.status === 200 && response2.status === 200) {
            return [...response.data.data, ...response2.data.data];
        }

        return rejectWithValue('Failed to fetch tickets');
    } catch (e: any) {
        console.error('Error fetching tickets error', e);
        return rejectWithValue(e.response?.data?.message || e.message);
    }
});

export const setFocusTicket = createAsyncThunk('tickets/focus', async (id:string, {getState,rejectWithValue}) => {
    const state = getState() as  RootState;
    const token = state.auth.token;
    let focusTicket = state.tickets.tickets.find(ticket => ticket._id === id);
    if (!focusTicket) {
        const response = await axios.get(`${common.baseUrl}/api/v1/tickets/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            focusTicket = response.data.data;
        } else {
            console.error('Error fetching focus ticket', response.data.message);
            return rejectWithValue(response.data.message);
        }
    }
    return focusTicket;
})

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.tickets = action.payload;
                state.ticketsLoading = false;
            })
            .addCase(fetchTickets.pending, (state) => {
                state.ticketsLoading = true;
                state.ticketsError = undefined;
            })
            .addCase(fetchTickets.rejected, (state, action: PayloadAction<any>) => {
                state.ticketsLoading = false;
                state.ticketsError = action.payload as string;
            })
            .addCase(setFocusTicket.pending, (state) => {
                state.ticketsLoading;
            }).addCase(setFocusTicket.fulfilled,(state,action) => {
                state.ticketsLoading = false;
                state.focusTicket = action.payload;
        }).addCase(setFocusTicket.rejected, (state,action) => {
            state.ticketsLoading = false;
            state.ticketsError = action.payload as string;
        })
    },
});

export const selectFocusTicket =(state: RootState) => state.tickets.focusTicket;
export const selectTickets = (state: RootState) => state.tickets.tickets;

export default ticketsSlice.reducer;