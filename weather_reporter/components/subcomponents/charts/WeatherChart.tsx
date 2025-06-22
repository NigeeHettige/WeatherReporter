import React, { useEffect, useRef, useMemo } from "react";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { EChartsOption } from "echarts";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "@/store/weatherSlice";
import { RootState, AppDispatch } from "../../../store/store";
import { ForecastDayContent } from "@/utils/types/interface";
import { format, parseISO } from "date-fns";
import { AxisTooltipParam } from "@/utils/types/interface";
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  LineChart,
  CanvasRenderer,
]);

const WeatherChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weather = useSelector((state: RootState) => state.weather.data);


  const city = "";
  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [city, dispatch]);

  const day = weather?.forecast.forecastday || [];
  const forecastData: ForecastDayContent[] = day.map((dayData) => ({
    date: format(parseISO(dayData.date), "EEEE"),
    minTemp: Math.round(dayData.day.mintemp_c),
    maxTemp: Math.round(dayData.day.maxtemp_c),
    maxWind: Math.round(dayData.day.maxwind_kph),
  }));

  const dayNames = forecastData.map((day) => day.date);
  const mintemp = forecastData.map((day) => day.minTemp);
  const maxtemp = forecastData.map((day) => day.maxTemp);
  const maxWind = forecastData.map((day) => day.maxWind);
  const shortDayNames = dayNames.map((name) => name.substring(0, 3));

  const chartDeps = useMemo(
    () => ({
      labels: shortDayNames,
      max: maxtemp,
      min: mintemp,
      wind: maxWind,
    }),
    [shortDayNames, maxtemp, mintemp, maxWind]
  );

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && shortDayNames.length > 0) {
      const myChart = echarts.init(chartRef.current);
      const isSmallScreen = window.innerWidth < 640;

      const option: EChartsOption = {
        title: {
          text: "Temperature & Wind Speed Trends",
          left: "center",
          textStyle: {
            color: "#374151",
            fontSize: 16,
            fontWeight: "bold",
          },
          top: isSmallScreen ? 5 : 0,
        },
        tooltip: {
          trigger: "axis",
          formatter: (params: unknown) => {
            const [max, min, wind] = params as AxisTooltipParam[];
            return `
              <div style="padding: 8px;">
                <strong>${max.axisValue}</strong><br/>
                Max Temp: ${max.data}°C<br/>
                Min Temp: ${min.data}°C<br/>
                Wind Speed: ${wind.data} km/h
              </div>
            `;
          },
        },
        legend: {
          data: ["Max Temp", "Min Temp", "Wind Speed"],
          top: isSmallScreen ? 30 : 30,
          textStyle: {
            color: "#374151",
            fontSize: 12,
          },
        },
        grid: {
          left: isSmallScreen ? "10%" : "5%",
          right: "5%",
          bottom: "5%",
          top: isSmallScreen ? "40%" : "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: shortDayNames,
          axisLabel: {
            color: "#374151",
            fontSize: 12,
            rotate: isSmallScreen ? 45 : 0,
          },
          axisLine: {
            lineStyle: { color: "#d1d5db" },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "Temperature (°C)",
            axisLabel: {
              color: "#374151",
              fontSize: 12,
            },
            splitLine: {
              lineStyle: { color: "#e5e7eb" },
            },
          },
          {
            type: "value",
            name: "Wind Speed (km/h)",
            position: "right",
            axisLabel: {
              color: "#374151",
              fontSize: 12,
            },
            splitLine: { show: false },
          },
        ],
        series: [
          {
            name: "Max Temp",
            type: "line",
            data: maxtemp,
            lineStyle: { color: "#f87171", width: 2 },
            itemStyle: { color: "#f87171" },
            smooth: true,
          },
          {
            name: "Min Temp",
            type: "line",
            data: mintemp,
            lineStyle: { color: "#3b82f6", width: 2 },
            itemStyle: { color: "#3b82f6" },
            smooth: true,
          },
          {
            name: "Wind Speed",
            type: "line",
            yAxisIndex: 1,
            data: maxWind,
            lineStyle: { color: "#10b981", width: 2 },
            itemStyle: { color: "#10b981" },
            smooth: true,
          },
        ],
      };

      myChart.setOption(option);

      const handleResize = () => {
        myChart.resize();
        const isSmall = window.innerWidth < 640;
        const updatedOption: EChartsOption = {
          title: { top: isSmall ? 20 : 0 },
          legend: { top: isSmall ? 50 : 30 },
          grid: { top: isSmall ? "30%" : "15%" },
        };
        myChart.setOption(updatedOption);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        myChart.dispose();
      };
    }
  }, [chartDeps]);

  return (
    <div
      ref={chartRef}
      className="w-full h-full min-h-[300px] sm:min-h-[400px]"
    />
  );
};

export default WeatherChart;
