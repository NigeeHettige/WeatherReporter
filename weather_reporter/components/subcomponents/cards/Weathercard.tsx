import React from "react";
import Customicon from "../icons/Customicon";
import { WeatherCardProps } from "@/utils/interface";

function Weathercard({subtitle,content,title,icon}:WeatherCardProps) {
  return (
    <div className="bg-white shadow-sm w-full  rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ">
      <div className="flex flex-col gap-3 ml-5 px-3 py-5">
        <div className="flex gap-4">
          <Customicon icon={icon }/>
          <div className="flex flex-col">
            <p className="text-xl font-semibold">{subtitle}</p>
            <p className="text-lg font-normal text-text_gray">
              {content}
            </p>
          </div>
        </div>
        <p className="text-2xl font-bold ">{title}</p>
      </div>
    </div>
  );
}

export default Weathercard;
