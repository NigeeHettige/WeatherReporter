import React from "react";
import { Search } from "lucide-react";

function Searchbar() {
  return (
    <div className="flex justify-center mt-5 z-50 ">
      <div className="flex w-full  shadow-lg rounded-full ml-5 mr-5 bg-white">
        <input
          type="text"
          placeholder="Search city..."
          className="flex-grow px-5 py-3 rounded-l-full outline-none"
          name="city"
        />
        <button className="bg-blue px-5 flex items-center justify-center rounded-r-full">
          <Search className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
