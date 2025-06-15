import React from "react";
import Sunny from "../../../public/weather_images/sunny.png";
import Image from "next/image";
import WeatherChart from "../charts/WeatherChart";
import Dayforecastcard from "./Dayforecastcard.tsx";
import Hourforecastcard from "./Hourforecastcard.tsx";
function Forecastcard() {
  const forecastData = [
    {
      day: "Today",
      description: "Cloudy",
      temperature: "29° / 25°",
      image: Sunny,
    },
    {
      day: "Tomorrow",
      description: "Sunny",
      temperature: "31° / 26°",
      image: Sunny,
    },
    {
      day: "Wednesday",
      description: "Rainy",
      temperature: "28° / 24°",
      image: Sunny,
    },
    {
      day: "Wednesday",
      description: "Rainy",
      temperature: "28° / 24°",
      image: Sunny,
    },
    {
      day: "Wednesday",
      description: "Rainy",
      temperature: "28° / 24°",
      image: Sunny,
    },
  ];

  return (
   
    <div className="flex flex-col gap-6">
      <Hourforecastcard />
      <Dayforecastcard />
    </div>
  );


  
}

export default Forecastcard;
