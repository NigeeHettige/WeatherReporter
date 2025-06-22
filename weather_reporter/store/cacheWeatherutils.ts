import {
  WeatherResponse,
  WeatherForecastResponse,
} from "@/utils/types/interface";

const CACHE_EXPIRATION_MS = 10 * 60 * 1000;
const MAX_CACHE_SIZE = 100;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const weatherCache: { [key: string]: CacheEntry<WeatherResponse> } = {};
const forecastCache: { [key: string]: CacheEntry<WeatherForecastResponse> } =
  {};

//Weather cache
export function setWeatherCache(city: string, data: WeatherResponse): void {
  if (Object.keys(weatherCache).length >= MAX_CACHE_SIZE) {
    const oldestKey = Object.keys(weatherCache)[0];
    delete weatherCache[oldestKey];
  }
  weatherCache[city] = {
    timestamp: Date.now(),
    data,
  };
}

export function getWeatherCache(city: string): WeatherResponse | null {
  const item = weatherCache[city];
  if (!item) {
    return null;
  }
  if (Date.now() - item.timestamp < CACHE_EXPIRATION_MS) {
    return item.data;
  }

  delete weatherCache[city];
  return null;
}

export function clearWeatherCache(): void {
  Object.keys(weatherCache).forEach((key) => delete weatherCache[key]);
}

//Forecast Weather cache

export function setForecastCache(
  city: string,
  data: WeatherForecastResponse
): void {
  if (Object.keys(forecastCache).length >= MAX_CACHE_SIZE) {
    const oldestKey = Object.keys(forecastCache)[0];
    delete forecastCache[oldestKey];
  }
  forecastCache[city] = {
    timestamp: Date.now(),
    data,
  };
}

export function getForecastCache(city: string): WeatherForecastResponse | null {
  const item = forecastCache[city];
  if (!item) return null;
  if (Date.now() - item.timestamp < CACHE_EXPIRATION_MS) {
    return item.data;
  }
  delete forecastCache[city];
  return null;
}

export function clearForecastCache(): void {
  Object.keys(forecastCache).forEach((key) => delete forecastCache[key]);
}
