"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getPlacePrediction } from "@/utils/services/locationservice";
import useDebounce from "@/utils/hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "@/store/currentWeatherslice";
import { fetchWeather } from "@/store/weatherSlice";
import { RootState, AppDispatch } from "../../../store/store";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const dispatch = useDispatch<AppDispatch>();

  const DEFAULT_CITY = ""; 


  const { loading: loadingCurrent, error: errorCurrent } = useSelector(
    (state: RootState) => state.currentweather
  );
  const { loading: loadingWeather, error: errorWeather } = useSelector(
    (state: RootState) => state.weather
  );



  useEffect(() => {
   
    dispatch(fetchCurrentWeather(DEFAULT_CITY));
    dispatch(fetchWeather(DEFAULT_CITY));
  }, [ dispatch]);


  useEffect(() => {
    const fetchPredictions = async () => {
      if (!debouncedQuery) {
        setPredictions([]);
        setShowSuggestions(false);
        return;
      }
      setIsLoadingPredictions(true);
      try {
        const response = await getPlacePrediction(debouncedQuery);
        const descriptions = response.map((place: any) => place.description);
        setPredictions(descriptions);
        setShowSuggestions(true);
      } catch (error) {
        setPredictions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoadingPredictions(false);
      }
    };

    fetchPredictions();
  }, [debouncedQuery]);

  const handleInputChange = (value: string) => {
  
    setQuery(value);
    if (!value) {
      setPredictions([]);
      setShowSuggestions(false);
      dispatch(fetchCurrentWeather(DEFAULT_CITY));
      dispatch(fetchWeather(DEFAULT_CITY));
    }
  };

  const handleSelect = (place: string) => {
    setQuery(place);
    setShowSuggestions(false);
    dispatch(fetchCurrentWeather(place));
    dispatch(fetchWeather(place));
  };

  const handleSearch = () => {
   const cityToFetch = query || DEFAULT_CITY;
    dispatch(fetchCurrentWeather(cityToFetch));
    dispatch(fetchWeather(cityToFetch));
    setShowSuggestions(false);
  };

  return (
    <div className="flex justify-center mt-5 z-50">
      <div className="relative w-full max-w-5xl mx-5">
        <div className="flex w-full shadow-lg rounded-full bg-white">
          <input
            type="text"
            placeholder={"Search city..." }
            className="flex-grow px-5 py-3 rounded-l-full outline-none"
            value={query}
            name="city"
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setShowSuggestions(!!query && predictions.length > 0)}
            aria-label="Search city"
          />
          <button
            className="bg-blue-500 px-5 flex items-center justify-center rounded-r-full"
            onClick={handleSearch}
            aria-label="Search"
          >
            <Search className="text-white" />
          </button>
        </div>
       
        {showSuggestions && predictions.length > 0 && (
          <ul
            className="absolute left-0 right-0 top-full mt-1 bg-white rounded-md shadow-md z-50"
            role="listbox"
          >
            {predictions.map((place, index) => (
              <li
                key={index}
                className="px-5 py-2 cursor-pointer hover:bg-gray-100 hover:rounded-md"
                onClick={() => handleSelect(place)}
                role="option"
                aria-selected={query === place}
              >
                {place}
              </li>
            ))}
          </ul>
        )}
     
      </div>
    </div>
  );
}

export default Searchbar;