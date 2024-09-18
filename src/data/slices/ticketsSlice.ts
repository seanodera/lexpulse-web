import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { common } from "@/data/utils";
import { RootState } from "@/data/store";
import {CombinedTicket} from "@/data/types";

interface TicketsState {
    tickets: CombinedTicket[],
    ticketsLoading: boolean,
    ticketsError: string | undefined,
}

const initialState: TicketsState = {
    tickets: [],
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
        console.log(response);
        if (response.status === 200) {
            return response.data.data;
        }

        return rejectWithValue('Failed to fetch tickets');
    } catch (e: any) {
        console.error('Error fetching tickets error', e);
        return rejectWithValue(e.response?.data?.message || e.message);
    }
});

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
            });
    },
});

export const selectTickets = (state: RootState) => state.tickets.tickets;

export default ticketsSlice.reducer;