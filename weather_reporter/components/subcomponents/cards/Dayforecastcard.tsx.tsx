import React, { Suspense, useMemo } from "react";
import Image from "next/image";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "@/store/weatherSlice";
import { RootState, AppDispatch } from "../../../store/store";
import { format, parseISO } from "date-fns";
import { Loader } from "@/components/loadingComponents/Loader";

const WeatherChart = React.lazy(() => import("../charts/WeatherChart"));

function Dayforecastcard() {
  const dispatch = useDispatch<AppDispatch>();
  const weather = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);

  const city = "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchWeather(city));
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [city, dispatch]);

  const day = weather?.forecast.forecastday || [];

  const forecastData = useMemo(() => {
    return day.map((dayData) => ({
      day: format(parseISO(dayData.date), "EEEE"),
      description: dayData.day.condition.text,
      temperature: `${Math.round(dayData.day.mintemp_c)}°/${Math.round(
        dayData.day.maxtemp_c
      )}°`,
      image: `https:${dayData.day.condition.icon}`,
    }));
  }, [day]);

  return (
    <div className="px-6 py-5">
      <div className="bg-white shadow-lg px-6 py-8 rounded-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-temp_gray">
            5-Day Forecast
          </h2>
        </div>

        {loading ? (
          <Loader />
        ) : (
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
                    loading="lazy"
                    unoptimized={false}
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
        )}

        <div className="mt-10">
          <h3 className="text-lg font-medium text-trend_gray mb-4 text-center">
            Temperature Trends
          </h3>
          <div className="flex justify-center">
            <Suspense>
              <WeatherChart />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dayforecastcard;
