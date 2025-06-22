import React, { Suspense, useMemo } from "react";
import Customicon from "../icons/Customicon";
import Image from "next/image";

import { Droplets } from "lucide-react";
import { Wind } from "lucide-react";
import { Sun } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "@/store/currentWeatherslice";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchWeather } from "@/store/weatherSlice";
import DefaultImage from "../../../public/weather_images/default.png";
import { DetailLoader } from "@/components/loadingComponents/DetailLoader";
import { triggerResetSearch } from "@/store/currentWeatherslice";

const RefreshCcw = React.lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.RefreshCcw }))
);

function DetailCard() {
  const dispatch = useDispatch<AppDispatch>();
  const currentweather = useSelector(
    (state: RootState) => state.currentweather.data
  );
  const { loading: loadingCurrent } = useSelector(
    (state: RootState) => state.currentweather
  );
  const { loading: loadingWeather } = useSelector(
    (state: RootState) => state.weather
  );

  const city = "";
  useEffect(() => {
    dispatch(fetchCurrentWeather(city));
    dispatch(fetchWeather(city));
  }, [city, dispatch]);

  const text = currentweather?.current.condition.text || "Weather condition";
  const url_image = currentweather?.current.condition.icon
    ? `https:${currentweather.current.condition.icon}`
    : DefaultImage;
  const place = currentweather?.location.name;
  const country = currentweather?.location.country;
  const updated_time = currentweather?.current.last_updated;
  const period = currentweather?.current.is_day == 0 ? "PM" : "AM";
  const up_time = `${updated_time} ${period}`;
  const temperature = Math.round(currentweather?.current.temp_c || 0);
  const feel_temperature = Math.round(currentweather?.current.feelslike_c || 0);
  const weatherStats = useMemo(
    () => [
      {
        icon: Droplets,
        label: "Humidity",
        value: currentweather?.current.humidity || "--",
      },
      {
        icon: Wind,
        label: "Wind",
        value: `${currentweather?.current.wind_kph || 0} km/h`,
      },
      {
        icon: Sun,
        label: "UV Index",
        value: currentweather?.current.uv || "--",
      },
    ],
    [currentweather]
  );

  const handleRefresh = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch(triggerResetSearch());
        dispatch(fetchCurrentWeather(city));
        dispatch(fetchWeather(city));
      }, 300); // 300ms debounce
    };
  }, [dispatch, city]);

  return (
    <div className="px-6 py-5">
      <div className="bg-white shadow-sm w-full rounded-xl transform transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
        {loadingCurrent ? (
          <DetailLoader />
        ) : (
          <div className="flex flex-col px-5 py-5 ">
            <div className="flex md:justify-between flex-col md:flex-row md:gap-2 gap-1">
              <div className="flex flex-col">
                <div className="flex gap-3 items-center">
                  <div className="flex flex-col">
                    <p className="text-3xl font-bold">{place}</p>
                    <p className="text-sm font-extralight">{up_time}</p>
                  </div>
                  <button className="bg-light_blue rounded-full px-2 py-0.5 text-blue md:text-sm text-xm">
                    {country}
                  </button>
                  {loadingWeather ? (
                    <DetailLoader />
                  ) : (
                    <Suspense>
                      <RefreshCcw
                        onClick={handleRefresh}
                        className="cursor-pointer hover:animate-spin"
                      />
                    </Suspense>
                  )}
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Image
                  alt={text}
                  src={url_image}
                  width={40}
                  height={40}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/default-weather-icon.png";
                  }}
                />
                <p className="text-lg">{text}</p>
              </div>
            </div>
            <div className="flex md:justify-between flex-col md:flex-row  mt-5 gap-2 items-center">
              <div className="flex gap-3">
                <p className="text-7xl font-bold">{temperature}°C</p>
                <div className="flex flex-col gap-1">
                  <p className="text-text_gray text-sm font-extralight">
                    Feels like
                  </p>
                  <p>{feel_temperature}°C</p>
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
        )}
      </div>
    </div>
  );
}

export default DetailCard;
