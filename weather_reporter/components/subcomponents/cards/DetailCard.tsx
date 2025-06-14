import React from "react";
import Customicon from "../icons/Customicon";
import Sunny from "../../../public/weather_images/sunny.png";
import Image from "next/image";
import { RefreshCcw } from "lucide-react";
import { Droplets } from "lucide-react";
import { Wind } from "lucide-react";
import { Sun } from "lucide-react";
function DetailCard() {
  const weatherStats = [
    {
      icon: Droplets,
      label: "Humidity",
      value: "79%",
    },
    {
      icon: Wind,
      label: "Wind",
      value: "13 km/h",
    },
    {
      icon: Sun,
      label: "UV Index",
      value: "6",
    },
  ];

  return (
    <div className="px-6 py-5">
      <div className="bg-white shadow-sm w-full rounded-xl transform transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
        <div className="flex flex-col px-5 py-5 ">
          <div className="flex md:justify-between flex-col md:flex-row md:gap-2 gap-1">
            <div className="flex flex-col">
              <div className="flex gap-3 items-center">
                <div className="flex flex-col">
                  <p className="text-3xl font-bold">Colombo</p>
                  <p className="text-sm font-extralight">
                    6/14/2025, 7:13:44 PM
                  </p>
                </div>
                <button className="bg-light_blue rounded-full px-2 py-0.5 text-blue md:text-sm text-xm">
                  Sri Lanka
                </button>
                <RefreshCcw />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Image alt="sunny" src={Sunny} />
              <p className="text-lg">Partly cloudy</p>
            </div>
          </div>
          <div className="flex md:justify-between flex-col md:flex-row  mt-5 gap-2 items-center">
            <div className="flex gap-3">
              <p className="text-7xl font-bold">30°C</p>
              <div className="flex flex-col gap-1">
                <p className="text-text_gray text-sm font-extralight">
                  Feels like
                </p>
                <p>34°C</p>
              </div>
            </div>
            <div className="flex gap-4">
              {weatherStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <Customicon icon={stat.icon} />
                  <p className="text-text_gray text-base">{stat.label}</p>
                  <p className="font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
