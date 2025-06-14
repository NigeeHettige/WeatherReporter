import { LucideIcon } from "lucide-react";

export interface CustomIconProps{
     icon: LucideIcon;
}

export interface WeatherCardProps{
    subtitle:string;
    content:string;
    title:string;
    icon:LucideIcon
}