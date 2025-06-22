import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getforecastWeather } from "@/utils/services/weatherservice";
import { WeatherForecastResponse } from "@/utils/types/interface";
import {
  clearForecastCache,
  getForecastCache,
  setForecastCache,
} from "./cacheWeatherutils";
import { RootState } from "@/store/store";
import axios from "axios";
interface WeatherState {
  data: WeatherForecastResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk<
  WeatherForecastResponse,
  string,
  { state: RootState; rejectValue: string }
>("weather/fetchWeather", async (city: string, { rejectWithValue }) => {
  const cacheData = getForecastCache(city);
  if (cacheData) {
    return cacheData;
  }
  try {
    const data = await getforecastWeather(city);
    setForecastCache(city, data);
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

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearCache: (state) => {
      clearForecastCache();
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export const { clearCache } = weatherSlice.actions;
export default weatherSlice.reducer;
