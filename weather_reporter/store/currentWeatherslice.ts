import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getcurrentWeather,
  getforecastWeather,
} from "@/utils/services/weatherservice";
import { WeatherResponse } from "@/utils/types/interface";

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather",
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await getcurrentWeather(city);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch weather data");
    }
  }
);

interface WeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const currentWeatherSlice = createSlice({
  name: "currentweather",
  initialState,
  reducers: {},
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
        state.error = action.payload as string;
      });
  },
});

export default currentWeatherSlice.reducer;
