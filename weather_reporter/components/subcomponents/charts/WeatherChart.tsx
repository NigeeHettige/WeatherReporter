"use client";

import React, { useEffect, useRef } from "react";
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
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      // Determine if the screen is small (e.g., less than 640px)
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
          formatter: (params: any) => {
            const [max, min, wind] = params;
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
          left: isSmallScreen?"10%":"5%",
          right: "5%",
          bottom: "5%",
          top: isSmallScreen ? "40%" : "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Today", "Tomorrow", "Wed", "Thu", "Fri"],
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
            data: [29, 31, 28, 27, 26],
            lineStyle: { color: "#f87171", width: 2 },
            itemStyle: { color: "#f87171" },
            smooth: true,
          },
          {
            name: "Min Temp",
            type: "line",
            data: [25, 26, 24, 23, 22],
            lineStyle: { color: "#3b82f6", width: 2 },
            itemStyle: { color: "#3b82f6" },
            smooth: true,
          },
          {
            name: "Wind Speed",
            type: "line",
            yAxisIndex: 1,
            data: [10, 12, 15, 8, 20],
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
  }, []);

  return (
   
      <div
        ref={chartRef}
        className="w-full h-full min-h-[300px] sm:min-h-[400px]"
      />
  
  );
};

export default WeatherChart;