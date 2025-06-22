"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getPlacePrediction } from "@/utils/services/locationservice";
import useDebounce from "@/utils/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCurrentWeather,
  clearResetSearch,
} from "@/store/currentWeatherslice";
import { fetchWeather } from "@/store/weatherSlice";
import { RootState } from "@/store/store";
import { getCache, setCache } from "@/utils/helpers/helper";
import { toast, Toaster } from "react-hot-toast";
import { PlacePrediction } from "@/utils/types/interface";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [, setIsLoadingPredictions] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const dispatch = useAppDispatch();
  const DEFAULT_CITY = "";

  const { error: errorCurrent, resetSearch } = useAppSelector(
    (state: RootState) => state.currentweather
  );

  const { error: errorWeather } = useAppSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    if (errorWeather) {
      toast.error(errorWeather, { id: "weather-error" });

      return;
    }

    if (errorCurrent) {
      toast.error(errorCurrent, { id: "current-error" });
    }
  }, [errorWeather, errorCurrent]);

  useEffect(() => {
    if (resetSearch) {
      setQuery("");
      setPredictions([]);
      setShowSuggestions(false);
      dispatch(fetchCurrentWeather(DEFAULT_CITY));
      dispatch(fetchWeather(DEFAULT_CITY));
      dispatch(clearResetSearch());
    }
  }, [resetSearch, dispatch]);

  useEffect(() => {
    if (DEFAULT_CITY) {
      dispatch(fetchCurrentWeather(DEFAULT_CITY));
      dispatch(fetchWeather(DEFAULT_CITY));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!debouncedQuery) {
        setPredictions([]);
        setShowSuggestions(false);
        return;
      }
      //Check localstorage cache
      const cacheData = getCache(debouncedQuery);
      if (cacheData) {
        setPredictions(cacheData);
        setShowSuggestions(true);
        return;
      }
      setIsLoadingPredictions(true);
      try {
        const response = await getPlacePrediction(debouncedQuery);
        const descriptions = response.map(
          (place: PlacePrediction) => place.description
        );
        setCache(debouncedQuery, descriptions);
        setPredictions(descriptions);
        setShowSuggestions(true);
      } catch {
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
      if (DEFAULT_CITY) {
        dispatch(fetchCurrentWeather(DEFAULT_CITY));
        dispatch(fetchWeather(DEFAULT_CITY));
      }
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
      <Toaster position="top-center" reverseOrder={false} gutter={8} />
      <div className="relative w-full max-w-5xl mx-5">
        <div className="flex w-full shadow-lg rounded-full bg-white">
          <input
            type="text"
            placeholder={"Search city..."}
            className="flex-grow px-5 py-3 rounded-l-full outline-none"
            value={query}
            name="city"
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() =>
              setShowSuggestions(!!query && predictions.length > 0)
            }
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
