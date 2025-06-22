import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import weatherReducer from "../store/weatherSlice";
import currentWeatherReducer from "../store/currentWeatherslice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    currentweather: currentWeatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
