import React from "react";
import Sunny from "../../../public/weather_images/sunny.png";
import Image from "next/image";
import WeatherChart from "../charts/WeatherChart";
function Hourforecastcard() {
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
    <div className="px-6 py-5">
      <div className="bg-white shadow-lg px-5 py-10 rounded-xl">
        <div className="w-full justify-start flex mb-5">
          <p className="text-2xl font-medium">24-Hour Forecast</p>
        </div>

        {/* Horizontal Scroll Section */}
        <div className="flex overflow-x-auto gap-4 scroll-smooth pb-2">
          {forecastData.map((item, index) => (
            <div
              key={index}
              className="min-w-[120px] flex-shrink-0 bg-card_gray p-3 rounded-lg shadow flex flex-col items-center text-center"
            ><p className="mt-1 font-medium text-text_gray text-sm">00.00 AM</p>
              <Image
                alt={item.description}
                src={item.image}
                width={40}
                height={40}
              />
              
        
              <p className="text-lg mt-1 font-semibold">{item.temperature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hourforecastcard;
