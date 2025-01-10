import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import Router from "next/router";
import { createFile, getCountry } from "@/data/utils";
import { RootState } from "@/data/store"; // Router for navigation in Next.js
import { fetchVenuesAsync } from "./venueSlice";
import { fetchExchangeRates } from "./cartSlice";
import { fetchPopular, fetchPromoted, fetchUpcoming } from "./eventsSlice";
const baseUrl = process.env.NEXT_PUBLIC_API_HOST_URL;

const common = { baseUrl };

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  appLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  appLoading: false,
};

// Utility functions for managing cookies
const setAuthCookies = (token: string, user: any) => {
  // Store cookies that expire in 7 days
  setCookie(null, "token", token, { maxAge: 7 * 24 * 60 * 60, path: "/" });
  setCookie(null, "user", JSON.stringify(user), {
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
};

const clearAuthCookies = () => {
  destroyCookie(null, "token");
  destroyCookie(null, "user");
};

// Thunk for signing in
export const signInHost = createAsyncThunk<
  any,
  { email: string; password: string }
>("auth/signIn", async ({ email, password }, { rejectWithValue }) => {
  try {
    const raw = JSON.stringify({ email, password });
    const config = { headers: { "Content-Type": "application/json" } };

    const res = await axios.post(`${common.baseUrl}/api/v1/auth`, raw, config);

    if (res.status === 200) {
      const { token, user } = res.data;
      setAuthCookies(token, user); // Store in cookies
      return { success: true, status: res.status, data: { token, user } };
    } else {
      return rejectWithValue({
        success: false,
        status: res.status,
        message: res.data.msg,
      });
    }
  } catch (e: any) {
    return rejectWithValue({
      success: false,
      status: e.response?.status,
      message: e.response?.data?.msg,
    });
  }
});

// Thunk for signing up
export const signUpHost = createAsyncThunk<
  any,
  { firstName: string; lastName: string; email: string; password: string }
>(
  "auth/signUp",
  async (
    { firstName, lastName, email, password },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const country = await getCountry();

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("username", `${firstName}.${lastName}`);
      formData.append("email", email);
      formData.append("country", country?.name || "");
      formData.append("gender", "Unset");
      formData.append("password", password);
      formData.append("userType", "user");
      // formData.append('image', image, 'profile.jpg');

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const res = await axios.post(
        `${common.baseUrl}/api/v1/users`,
        formData,
        config
      );

      if (res.status === 200) {
        // Auto sign-in after sign-up
        const signInRes = await dispatch(
          signInHost({ email, password })
        ).unwrap();
        return signInRes;
      } else {
        return rejectWithValue({
          success: false,
          status: res.status,
          message: res.data.msg,
        });
      }
    } catch (e: any) {
      return rejectWithValue({
        success: false,
        status: e.response?.status,
        message: e.response?.data?.msg,
      });
    }
  }
);

// Thunk for getting the user data
export const fetchUser = createAsyncThunk<any, string>(
  "auth/fetchUser",
  async (id, { rejectWithValue }) => {
    try {
      const cookies = parseCookies(); // Read the cookies
      const token = cookies.token;
      if (!token) {
        await Router.push("/login");
        return rejectWithValue("Unauthorized");
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const res = await axios.get(
        `${common.baseUrl}/api/v1/users/${id}`,
        config
      );
      if (res.status === 200) {
        return res.data.data.user;
      } else {
        return rejectWithValue(res.data.msg);
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        clearAuthCookies();
        await Router.push("/login"); // Next.js navigation
      }
      return rejectWithValue(error.response?.data?.msg);
    }
  }
);

export const initializeAppAsync = createAsyncThunk(
  "auth/initialize",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(checkUser());
      await dispatch(fetchUpcoming()).unwrap();
      await dispatch(fetchPopular()).unwrap();
      await dispatch(fetchPromoted()).unwrap();
      await dispatch(fetchExchangeRates()).unwrap();
      await dispatch(fetchVenuesAsync()).unwrap();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      clearAuthCookies();
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      Router.push("/login");
    },
    checkUser(state) {
      const cookies = parseCookies(); // Read the cookies
      if (cookies.user && cookies.token) {
        state.user = JSON.parse(cookies.user);
        state.token = cookies.token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signInHost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInHost.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
      })
      .addCase(signInHost.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Sign Up
      .addCase(signUpHost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpHost.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
      })
      .addCase(signUpHost.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(initializeAppAsync.pending, (state) => {
        state.appLoading = true;
        state.error = null;
      })
      .addCase(initializeAppAsync.fulfilled, (state) => {
        state.appLoading = false;
      })
      .addCase(
        initializeAppAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.appLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const { logout, checkUser } = authSlice.actions;

export default authSlice.reducer;
