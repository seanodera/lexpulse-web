import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import store, {RootState} from "@/data/store";
import {EventModel} from "@/data/types";
import axios, {Axios} from "axios";
import {state} from "sucrase/dist/types/parser/traverser/base";
import {event} from "next/dist/build/output/log";
const baseUrl = process.env.NEXT_PUBLIC_API_HOST_URL;


interface eventsState {
    fetchedEvents: EventModel[],
    upcoming: EventModel[],
    popular: EventModel[],
    promoted: any[],
    searchResults: EventModel[],
    category: {
        featured: EventModel[],
        grouped: [
            {
                name: string,
                highlight: string,
                subtitle: string,
                data: EventModel[]
            }
        ]
    },
    focusEvent?: EventModel,
    catLoading: boolean,
    loading: boolean,
    hasError: boolean,
    errorMessage: string,
}

const initialState:eventsState = {
    fetchedEvents:[],
    upcoming: [],
    popular: [],
    promoted: [],
    searchResults: [],
    category: {
        featured: [],
        grouped: [
            {
                name: '',
                highlight: '',
                subtitle: '',
                data: []
            }
        ]
    },
    focusEvent: undefined,
    catLoading: false,
    loading: false,
    hasError: false,
    errorMessage: '',
};


export const fetchUpcoming = createAsyncThunk('events/fetchUpcoming', async () => {
try {
    console.log(baseUrl)
    const response = await axios.get(`${baseUrl}/api/v1/events/upcoming?country=Ghana`)
    console.log(response)
    return response.data.data;
} catch (err){
    console.log(err)
}
})
export const fetchPopular = createAsyncThunk('events/popular', async () => {

})

export const fetchPromoted = createAsyncThunk('events/fetchPromoted', async () => {

})

export const searchEvents = createAsyncThunk('events/search', async (searchTerms: string) => {

})

export const fetchCategory = createAsyncThunk('events/fetchCategory', async (category: string) => {

    const data = {
        featured: [],
        grouped: [
            {
                name: '',
                highlight: '',
                subtitle: '',
                data: []
            }
        ]
    }
})
export const fetchEventById = createAsyncThunk('events/fetchById', async (id: string, { getState, dispatch }) => {
    try {
        const { events } = getState() as { events: eventsState };
        console.log(events.fetchedEvents)
        let event = events.fetchedEvents.find((value) => value._id === id);

        if (!event) {
            const res = await axios.get(`${baseUrl}/api/v1/events/${id}`);
            event = res.data.data.event;
            dispatch(addEvent(event as EventModel));
        }

        return event;
    } catch (e) {
        console.error('Error fetching event by id:', e);
        throw new Error('Event fetching failed');
    }
});

const EventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<EventModel>) => {
            state.fetchedEvents = [...state.fetchedEvents, action.payload];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUpcoming.pending, (state) => {
                state.loading = true;
                state.hasError = false;
                state.errorMessage = '';
            })
            .addCase(fetchUpcoming.fulfilled, (state, action: PayloadAction<EventModel[]>) => {
                state.loading = false;
                state.upcoming = action.payload;
                console.log(action.payload)
                state.fetchedEvents = [...state.fetchedEvents, ...action.payload]; // Avoid nested array
            })
            .addCase(fetchUpcoming.rejected, (state,action) => {
                state.loading = false;
                state.hasError = true;
                state.errorMessage = 'Error getting upcoming events';
            })
            .addCase(fetchEventById.pending, (state,action) => {
                state.catLoading = true;
                state.hasError = false;
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.catLoading = false;
                state.focusEvent = action.payload;
                console.log(action.payload)
            })
            .addCase(fetchEventById.rejected, (state) => {
                state.catLoading = false;
                state.hasError = true;
                state.errorMessage = 'Event does not exist';
            });
    }
});



export const selectFocusEvent = (state: RootState) => state.events.focusEvent;
export const selectUpcomingEvents = (state: RootState) => state.events.upcoming;
export const {addEvent} = EventsSlice.actions;
export default EventsSlice.reducer