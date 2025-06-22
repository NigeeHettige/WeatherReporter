import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getcurrentWeather } from "@/utils/services/weatherservice";
import { WeatherResponse } from "@/utils/types/interface";
import {
  getWeatherCache,
  setWeatherCache,
  clearWeatherCache,
} from "./cacheWeatherutils";
import { RootState } from "@/store/store";
import axios from "axios";
interface WeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  resetSearch: boolean;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  resetSearch: false,
};

export const fetchCurrentWeather = createAsyncThunk<
  WeatherResponse,
  string,
  { state: RootState; rejectValue: string }
>("weather/fetchCurrentWeather", async (city: string, { rejectWithValue }) => {
  const cacheData = getWeatherCache(city);
  if (cacheData) {
    return cacheData;
  }
  try {
    const data = await getcurrentWeather(city);
    setWeatherCache(city, data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          return rejectWithValue(`"${city}" is not a valid city name`);
        case 401:
          return rejectWithValue("Authentication failed");
        case 404:
          return rejectWithValue(`Weather data not found for "${city}"`);
        case 429:
          return rejectWithValue("Too many requests - please try again later");
        case 500:
          return rejectWithValue("Weather service is currently unavailable");
        default:
          return rejectWithValue(
            error.response?.data?.message || "Failed to get weather data"
          );
      }
    }
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
});

const currentWeatherSlice = createSlice({
  name: "currentweather",
  initialState,
  reducers: {
    clearCache: (state) => {
      clearWeatherCache();
      state.data = null;
    },
    triggerResetSearch: (state) => {
      state.resetSearch = true;
    },
    clearResetSearch: (state) => {
      state.resetSearch = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});
export const { clearCache, triggerResetSearch, clearResetSearch } =
  currentWeatherSlice.actions;
export default currentWeatherSlice.reducer;
