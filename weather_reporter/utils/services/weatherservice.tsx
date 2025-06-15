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
    if (axios.isAxiosError(error)) {
      console.error("Weather API error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Failed to fetch weather data");
  }
};

//Get forecast data
export const getforecastWeather = async (city: string) => {
  const current_url = `${config.urls.GET_FORECAST_WEATHER_URL_RELATIVE}?q=${city}`;

  try {
    const response = await axios.get(current_url);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Weather API error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Failed to fetch forecast weather data");
  }
};
