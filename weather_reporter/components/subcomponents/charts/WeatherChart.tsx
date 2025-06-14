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

// Register only the required components
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

      const option: EChartsOption = {
      
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Min", "Max"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
       
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Today", "Tommorow", "Wed", "Thu", "Fri"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "max",
            type: "line",
            data: [28, 29, 29, 30, 31],
          },
          {
            name: "min",
            type: "line",
            data: [25, 26, 26, 25, 28],
          },
        ],
      };

      myChart.setOption(option);

      // Resize chart on window resize
      const handleResize = () => {
        myChart.resize();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        myChart.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default WeatherChart;
