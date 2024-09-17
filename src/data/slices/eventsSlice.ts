import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "@/data/store";
import {EventModel} from "@/data/types";

const baseUrl = process.env.NEXT_PUBLIC_API_HOST_URL;

interface eventsState {
    country: string;
    fetchedEvents: EventModel[];
    upcoming: EventModel[];
    popular: EventModel[];
    promoted: EventModel[];
    searchResults: EventModel[];
    recentlyViewed: EventModel[];
    category: {
        featured: EventModel[];
        grouped: {
            name: string;
            highlight: string;
            subtitle: string;
            data: EventModel[];
        }[];
    };
    focusEvent?: EventModel;
    catLoading: boolean;
    loading: boolean;
    hasError: boolean;
    errorMessage: string;
}

const initialState: eventsState = {
    country: 'Ghana',
    fetchedEvents: [],
    upcoming: [],
    popular: [],
    promoted: [],
    searchResults: [],
    recentlyViewed: [],
    category: {
        featured: [],
        grouped: [
            {
                name: "",
                highlight: "",
                subtitle: "",
                data: []
            }
        ]
    },
    focusEvent: undefined,
    catLoading: false,
    loading: false,
    hasError: false,
    errorMessage: ""
};

export const fetchUpcoming = createAsyncThunk("events/fetchUpcoming", async (_,{getState}) => {
    try {
        const {events} = getState() as {events: eventsState};
        const response = await axios.get(`${baseUrl}/api/v1/events/upcoming?country=${events.country}`);
        return response.data.data;
    } catch (err) {
        console.log(err);
        throw new Error('Error fetching upcoming events');
    }
});

export const fetchPopular = createAsyncThunk("events/popular", async (_,{getState}) => {
    try {
        const {events} = getState() as {events: eventsState};
        const response = await axios.get(`${baseUrl}/api/v1/events/popular?country=${events.country}`);
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw new Error('Error fetching popular events');
    }
});

export const fetchPromoted = createAsyncThunk("events/fetchPromoted", async (_,{getState}) => {
    try {
        const {events} = getState() as {events: eventsState};
        const response = await axios.get(`${baseUrl}/api/v1/events/featured?country=${events.country}`);
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw new Error('Error fetching promoted events');
    }
});

export const searchEvents = createAsyncThunk("events/search", async (searchTerms: string) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/events/search?term=${searchTerms}`);
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw new Error('Error searching events');
    }
});

export const fetchCategory = createAsyncThunk("events/fetchCategory", async (category: string) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/events/category?name=${category}`);
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw new Error('Error fetching events category');
    }
});

export const fetchEventById = createAsyncThunk("events/fetchById", async (id: string, {getState, dispatch}) => {
    try {
        const {events} = getState() as { events: eventsState };
        let event = events.fetchedEvents.find((value) => value._id === id);
        if (!event) {
            const res = await axios.get(`${baseUrl}/api/v1/events/${id}`);
            event = res.data.data.event;
            dispatch(addEvent(event as EventModel));
            if (!event) {
                throw Error('Event not found')
            }
        }

        const _viewed = localStorage.getItem('viewed');

        let viewed: string[] = _viewed ? JSON.parse(_viewed) : [];

        if (!viewed.includes(event._id)) {
            viewed.push(event._id);
            localStorage.setItem('viewed', JSON.stringify(viewed));
        }


        return event;
    } catch (e) {
        console.error("Error fetching event by id:", e);
        throw new Error("Event fetching failed");
    }
});

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<EventModel>) => {
            state.fetchedEvents.push(action.payload);
        },
        changeRegion: (state, action) => {
            state.country = action.payload;

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpcoming.pending, (state) => {
                state.loading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(fetchUpcoming.fulfilled, (state, action: PayloadAction<EventModel[]>) => {
                state.loading = false;
                state.upcoming = action.payload;
                state.fetchedEvents = [...state.fetchedEvents, ...action.payload];
            })
            .addCase(fetchUpcoming.rejected, (state, action) => {
                state.loading = false;
                state.hasError = true;
                state.errorMessage = action.error.message || "Failed to fetch upcoming events";
            })
            .addCase(fetchPopular.pending, (state) => {
                state.loading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(fetchPopular.fulfilled, (state, action: PayloadAction<EventModel[]>) => {
                state.loading = false;
                state.popular = action.payload;
                state.fetchedEvents = [...state.fetchedEvents, ...action.payload];
            })
            .addCase(fetchPopular.rejected, (state, action) => {
                state.loading = false;
                state.hasError = true;
                state.errorMessage = action.error.message || "Failed to fetch popular events";
            })
            .addCase(fetchPromoted.pending, (state) => {
                state.loading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(fetchPromoted.fulfilled, (state, action: PayloadAction<EventModel[]>) => {
                state.loading = false;
                state.promoted = action.payload;
                state.fetchedEvents = [...state.fetchedEvents, ...action.payload];
            })
            .addCase(fetchPromoted.rejected, (state, action) => {
                state.loading = false;
                state.hasError = true;
                state.errorMessage = action.error.message || "Failed to fetch promoted events";
            })
            .addCase(searchEvents.pending, (state) => {
                state.loading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(searchEvents.fulfilled, (state, action: PayloadAction<EventModel[]>) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchEvents.rejected, (state, action) => {
                state.loading = false;
                state.hasError = true;
                state.errorMessage = action.error.message || "Failed to search events";
            })
            .addCase(fetchCategory.pending, (state) => {
                state.catLoading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(fetchCategory.fulfilled, (state, action: PayloadAction<any>) => {
                state.catLoading = false;
                state.category = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.catLoading = false;
                state.hasError = true;
                state.errorMessage = action.error.message || "Failed to fetch events category";
            })
            .addCase(fetchEventById.pending, (state) => {
                state.loading = true;
                state.hasError = false;
                state.errorMessage = "";
            })
            .addCase(fetchEventById.fulfilled, (state, action: PayloadAction<EventModel>) => {
                state.loading = false;
                if (action.payload) {
                    state.focusEvent = action.payload;
                    if (!state.recentlyViewed.find((v) => v._id === action.payload?._id)){
                        state.recentlyViewed = [...state.recentlyViewed, action.payload];
                    }
                } else {
                    state.hasError = true;
                    state.errorMessage = "Event not found";
                }
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                state.loading = false;
                state.hasError = true;
                state.errorMessage = action.error.message || "Failed to fetch event by ID";
            });
    }
});

export const {addEvent,changeRegion} = eventsSlice.actions;

export const selectEventsCountry = (state:RootState) => state.events.country;
export const selectFetchedEvents = (state: RootState) => state.events.fetchedEvents;
export const selectUpcomingEvents = (state: RootState) => state.events.upcoming;
export const selectPopularEvents = (state: RootState) => state.events.popular;
export const selectPromotedEvents = (state: RootState) => state.events.promoted;
export const selectSearchResults = (state: RootState) => state.events.searchResults;
export const selectCategoryEvents = (state: RootState) => state.events.category;
export const selectFocusEvent = (state: RootState) => state.events.focusEvent;
export const selectEventsLoading = (state: RootState) => state.events.loading;
export const selectEventsCatLoading = (state: RootState) => state.events.catLoading;
export const selectEventsError = (state: RootState) => state.events.hasError;
export const selectEventsErrorMessage = (state: RootState) => state.events.errorMessage;

export default eventsSlice.reducer;