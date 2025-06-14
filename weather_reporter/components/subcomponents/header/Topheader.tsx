import React from "react";
import Searchbar from "../custom/SearchBar";
function Topheader() {
  return (
    <div className="gradient-bg h-1/2 px-8 py-8 items-center w-screen ">
      <div className="flex flex-col max-w-6xl mx-auto">
        <div className="flex justify-between">
          <h1 className="text-white font-bold text-3xl">Weather Dashboard</h1>
          <div className="flex gap-3">
           <button className="bg-white/30 text-white text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-md">
  °C
</button>

          </div>
        </div>
        <Searchbar />
      </div>
    </div>
  );
}

export default Topheader;
