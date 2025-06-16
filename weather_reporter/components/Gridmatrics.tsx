import React from "react";
import { Compass, CloudRain, Eye } from "lucide-react";
import Weathercard from "./subcomponents/cards/Weathercard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "@/store/currentWeatherslice";
import { RootState, AppDispatch } from "../store/store";

function Gridmatrics() {
  const dispatch = useDispatch<AppDispatch>();
  const currentweather = useSelector(
    (state: RootState) => state.currentweather.data
  );
  const loading = useSelector(
    (state: RootState) => state.currentweather.loading
  );
  const error = useSelector((state: RootState) => state.currentweather.error);

  const city = "";
  useEffect(() => {
    dispatch(fetchCurrentWeather(city));
  }, [city, dispatch]);

  const wind = currentweather?.current.wind_dir || "";
  const cloud = currentweather?.current.cloud || "0";
  const visibility = currentweather?.current.vis_km || "";

 

  const weatherCards = [
    {
      subtitle: "Wind Direction",
      content: "Current wind direction",
      title: wind,
      icon: Compass,
    },
    {
      subtitle: "Cloud Cover",
      content: "Percentage of sky covered by clouds",
      title: `${cloud}%`,
      icon: CloudRain,
    },
    {
      subtitle: "Visibility",
      content: "Distance visible to the human eye",
      title: `${visibility}km`,
      icon: Eye,
    },
  ];
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-5">
      {weatherCards.map((card, index) => (
        <Weathercard
          key={index}
          subtitle={card.subtitle}
          content={card.content}
          title={card.title}
          icon={card.icon}
        />
      ))}
    </div>
  );
}

export default Gridmatrics;
