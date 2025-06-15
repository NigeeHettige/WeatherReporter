"use client";
import React from "react";
import Topheader from "./subcomponents/header/Topheader";
import Gridmatrics from "./Gridmatrics";
import DetailCard from "./subcomponents/cards/DetailCard";
import Forecastcard from "./subcomponents/cards/Forecastcard";
import { Provider } from "react-redux";
import { store } from "@/store/store";

function Mainpage() {
  return (
    <div className="flex flex-col ">
      <Provider store={store}>
        <Topheader />
        <div className="px-3 mt-10 ">
          <DetailCard />
          <Gridmatrics />
          <Forecastcard />
        </div>
      </Provider>
    </div>
  );
}

export default Mainpage;
