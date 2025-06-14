import React from "react";
import WeatherChart from "./subcomponents/charts/WeatherChart";
function WeatherMatrics() {
  return (
    <div className="px-6 py-5">
        <div className="bg-white  shadow-md rounded-xl">
      <WeatherChart />
    </div>
    </div>
    
  );
}

export default WeatherMatrics;
