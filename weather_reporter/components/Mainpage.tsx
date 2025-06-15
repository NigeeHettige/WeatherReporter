"use client"
import React from "react";
import Topheader from "./subcomponents/header/Topheader";
import Gridmatrics from "./Gridmatrics";
import DetailCard from "./subcomponents/cards/DetailCard";
import Forecastcard from "./subcomponents/cards/Forecastcard";

function Mainpage() {
  return (
    <div className="flex flex-col ">
      <Topheader />
      <div className="px-3 mt-10 ">
        <DetailCard />
        <Gridmatrics />
        <Forecastcard />
      </div>
    </div>
  );
}

export default Mainpage;
