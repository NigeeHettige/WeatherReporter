import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../store/weatherSlice";
import currentWestherReducer from "../store/currentWeatherslice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    currentweather: currentWestherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
