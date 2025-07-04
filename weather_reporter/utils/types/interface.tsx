import { LucideIcon } from "lucide-react";

export interface CustomIconProps {
  icon: LucideIcon;
}

export interface WeatherCardProps {
  subtitle: string;
  content: string;
  title: string;
  icon: LucideIcon;
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}
interface Current {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  humidity: number;
  condition: Condition;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  uv: number;
  is_day: number;
}

export interface WeatherResponse {
  location: Location;
  current: Current;
}

interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition;
  uv: number;
}
interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
}
export interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm?: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c?: number;
  windchill_f?: number;
  heatindex_c?: number;
  heatindex_f?: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

interface ForecastDay {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
  hour: Hour[];
}

interface Forecast {
  forecastday: ForecastDay[];
}
export interface WeatherForecastResponse {
  location: Location;
  current: Current;
  forecast: Forecast;
}

export interface ForecastDayContent {
  date: string;
  minTemp: number;
  maxTemp: number;
  maxWind: number;
}

export interface AxisTooltipParam {
  axisValue: string;
  data: number;
  seriesName: string;
}


export interface WeatherApiError {
  message: string;
  status?: number;
  data?: unknown;
  isAxiosError: boolean;
}


interface MatchedSubstring{
   length: number;
  offset: number;
}

interface Term {
  offset: number;
  value: string;
}

interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
}

export interface PlacePrediction {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
}