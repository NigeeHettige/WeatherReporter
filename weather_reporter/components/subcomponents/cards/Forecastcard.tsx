import React from "react";
import Hourforecastcard from "./Hourforecastcard.tsx";
import Dayforecastcard from "./Dayforecastcard.tsx";

const Forecastcard = React.memo(() => {
  return (
    <div className="flex flex-col gap-6">
      <Hourforecastcard />
      <Dayforecastcard />
    </div>
  );
});

export default Forecastcard;
