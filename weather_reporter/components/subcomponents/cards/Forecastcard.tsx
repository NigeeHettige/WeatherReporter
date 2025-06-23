import React from "react";
import Dayforecastcard from "./Dayforecastcard.tsx";
import Hourforecastcard from "./Hourforecastcard.tsx";
function Forecastcard() {
  return (
    <div className="flex flex-col gap-6">
      <Hourforecastcard />
      <Dayforecastcard />
    </div>
  );
}

export default Forecastcard;
