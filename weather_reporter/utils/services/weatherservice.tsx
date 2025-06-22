import axios, { AxiosResponse } from "axios";
import config from "../config";
import { WeatherResponse } from "../types/interface";

//Get current weather
export const getcurrentWeather = async (
  city: string
): Promise<WeatherResponse> => {
  const current_url = `${config.urls.GET_CURRENT_WEATHER_URL_RELATIVE}?q=${city}`;

  try {
    const response = await axios.get<WeatherResponse>(current_url);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

//Get forecast data
export const getforecastWeather = async (city: string) => {
  const current_url = `${config.urls.GET_FORECAST_WEATHER_URL_RELATIVE}?q=${city}`;

  try {
    const response = await axios.get(current_url);
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};
