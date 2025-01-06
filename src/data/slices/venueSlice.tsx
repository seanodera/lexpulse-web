import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Venue } from "../types";
import generateVenue from "../generator";

interface VenueSliceState {
    fetchedVenues: Venue[];
    trendingVenues: Venue[];
    currentVenue: Venue | undefined;
    loading: boolean;
    hasError: boolean;
    errorMessage: string;
}

const initialState: VenueSliceState = {
    fetchedVenues: [],
    trendingVenues: [],
    currentVenue: undefined,
    loading: false,
    hasError: false,
    errorMessage: '',
};

const fetchVenuesAsync = createAsyncThunk('venue/fetchVenues', async () => {
    const venues = Array.from({ length: 30 }, () => generateVenue());
    return venues;
});

const fetchVenue = createAsyncThunk('venue/fetchVenue', async (id: string) => {
    return generateVenue();
});

const setCurrentVenue = createAsyncThunk('venue/setCurrentVenue', async (id: string, { rejectWithValue, getState, dispatch }) => {
    const state = getState() as { venue: VenueSliceState };
    const venue = state.venue.fetchedVenues.find(venue => venue._id === id);
    if (!venue) {
        const res = await dispatch(fetchVenue(id));
        if (res.meta.requestStatus === 'fulfilled') {
            return res.payload as Venue;
        }
        return rejectWithValue('Venue not found');
    } else {
        return venue;
    }
});

const venueSlice = createSlice({
    name: 'venue',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchVenuesAsync.pending, (state) => {
            state.loading = true;
            state.hasError = false;
            state.errorMessage = '';
        });
        builder.addCase(fetchVenuesAsync.fulfilled, (state, action) => {
            state.fetchedVenues = action.payload;
            state.trendingVenues = action.payload.slice(0, 10);
            state.loading = false;
        });
        builder.addCase(fetchVenuesAsync.rejected, (state, action) => {
            state.loading = false;
            state.hasError = true;
            state.errorMessage = action.error.message || 'Failed to fetch venues';
        });
        builder.addCase(fetchVenue.pending, (state) => {
            state.loading = true;
            state.hasError = false;
            state.errorMessage = '';
        });
        builder.addCase(fetchVenue.fulfilled, (state, action) => {
            state.currentVenue = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchVenue.rejected, (state, action) => {
            state.loading = false;
            state.hasError = true;
            state.errorMessage = action.error.message || 'Failed to fetch venue';
        });
        builder.addCase(setCurrentVenue.pending, (state) => {
            state.loading = true;
            state.hasError = false;
            state.errorMessage = '';
        });
        builder.addCase(setCurrentVenue.fulfilled, (state, action) => {
            state.currentVenue = action.payload;
            state.loading = false;
        });
        builder.addCase(setCurrentVenue.rejected, (state, action) => {
            state.loading = false;
            state.hasError = true;
            state.errorMessage = action.payload as string || 'Failed to set current venue';
        });
    }
});

export default venueSlice.reducer;
export { fetchVenuesAsync, fetchVenue, setCurrentVenue };