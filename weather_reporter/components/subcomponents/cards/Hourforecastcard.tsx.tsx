import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "@/store/weatherSlice";
import { RootState, AppDispatch } from "../../../store/store";
import { DetailLoader } from "@/components/loadingComponents/DetailLoader";

function Hourforecastcard() {
  const dispatch = useDispatch<AppDispatch>();
  const weather = useSelector((state: RootState) => state.weather.data);
  const loading = useSelector((state: RootState) => state.weather.loading);

  const city = "";
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchWeather(city));
    }, 300);

    return () => clearTimeout(timer);
  }, [city, dispatch]);

  const hour = weather?.forecast.forecastday[0].hour || [];

  const getAmPm = useCallback((timeString: string) => {
    const hour = new Date(timeString).getHours();
    return hour < 12 ? "AM" : "PM";
  }, []);
  const forecastData = useMemo(() => {
    return hour?.map((hourData) => {
      const timeStr = hourData.time.split(" ")[1];
      const period = getAmPm(hourData.time);
      const timehour = `${timeStr}.${period}`;
      return {
        time: timehour,
        description: hourData.condition.text,
        temperature: `${Math.round(hourData.temp_c)}°`,
        image: `https:${hourData.condition.icon}`,
      };
    });
  }, [hour]);

  return (
    <div className="px-6 py-5">
      <div className="bg-white shadow-lg px-5 py-10 rounded-xl">
        <div className="w-full justify-start flex mb-5">
          <p className="text-2xl font-semibold">24-Hour Forecast</p>
        </div>

        {/* Horizontal Scroll Section */}
        {loading ? (
          <DetailLoader />
        ) : (
          <div className="flex overflow-x-auto gap-4 scroll-smooth pb-2">
            {forecastData.map((item, index) => (
              <div
                key={index}
                className="min-w-[120px] flex-shrink-0 bg-card_gray p-3 rounded-lg shadow flex flex-col items-center text-center"
              >
                <p className="mt-1 font-medium text-text_gray text-sm">
                  {item.time}
                </p>
                <Image
                  alt={item.description}
                  src={item.image}
                  width={40}
                  height={40}
                  className="m-2"
                  loading="lazy"
                  unoptimized={false}
                />

                <p className="text-lg mt-1 font-semibold">{item.temperature}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Hourforecastcard;
