import React from "react";
import Sunny from "../../../public/weather_images/sunny.png";
import Image from "next/image";
import WeatherChart from "../charts/WeatherChart";

function Dayforecastcard() {
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
      day: "Thursday",
      description: "Rainy",
      temperature: "27° / 23°",
      image: Sunny,
    },
    {
      day: "Friday",
      description: "Stormy",
      temperature: "26° / 22°",
      image: Sunny,
    },
  ];

  return (
    <div className="px-6 py-5">
      <div className="bg-white shadow-lg px-6 py-8 rounded-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-temp_gray">
            5-Day Forecast
          </h2>
        </div>

        <div className="space-y-4">
          {forecastData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-wcard_gray px-4 py-3 rounded-xl hover:bg-card_gray transition duration-200"
            >
              <div className="flex items-center gap-4">
                <Image
                  alt={item.description}
                  src={item.image}
                  width={40}
                  height={40}
                />
                <div className="flex flex-col">
                  <p className="text-text-black font-medium">{item.day}</p>
                  <p className="text-sm text-day_gray">{item.description}</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-temp_gray">
                {item.temperature}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-medium text-trend_gray mb-4 text-center">
            Temperature Trends
          </h3>
          <div className="flex justify-center">
            <WeatherChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dayforecastcard;
