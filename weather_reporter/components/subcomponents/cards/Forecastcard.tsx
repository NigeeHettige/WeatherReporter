import React from "react";
import Sunny from "../../../public/weather_images/sunny.png";
import Image from "next/image";
import WeatherChart from "../charts/WeatherChart";
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
    <div className="px-6 py-5">
      <div className="bg-white shadow-lg px-5 py-10 rounded-xl ">
        <div className=" w-full justify-center flex mb-5">
          <p className="text-2xl font-semibold mb-5">5 day forecast</p>
        </div>
        <div className=" grid md:grid-cols-5 gap-3">
          {forecastData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between flex-row md:flex-col items-center"
            >
              <div className="flex items-center gap-2">
                <Image
                  alt={item.description}
                  src={item.image}
                  width={40}
                  height={40}
                />
                <div className="flex flex-col">
                  <p>{item.day}</p>
                  <p className="text-text_gray">{item.description}</p>
                </div>
              </div>
              <div>
                <p className="text-xl">{item.temperature}</p>
              </div>
            </div>
          ))}
        </div>
       <WeatherChart/>
      </div>
    </div>
  );
}

export default Forecastcard;
