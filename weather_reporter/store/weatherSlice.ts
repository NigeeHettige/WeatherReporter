import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getforecastWeather } from "@/utils/services/weatherservice";
import { WeatherForecastResponse } from "@/utils/types/interface";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await getforecastWeather(city);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch weather data");
    }
  }
);

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

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
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
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
