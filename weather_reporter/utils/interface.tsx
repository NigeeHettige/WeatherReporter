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
  condition: Condition;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km:number;
  uv:number;
}

export interface WeatherResponse{
    location:Location;
    current:Current;
}
