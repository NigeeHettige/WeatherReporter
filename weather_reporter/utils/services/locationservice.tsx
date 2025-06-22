import axios from "axios";
import config from "../config";
import { PlacePrediction } from "../types/interface";

//get predicted cities
export const getPlacePrediction = async (
  query: string
): Promise<PlacePrediction[]> => {
  try {
    const placeurl = `${config.urls.GET_PLACES_URL_RELATIVE}?q=${query}`;
    const response = await axios.get(placeurl);
    return response.data;
  } catch (error) {
    console.error("Error fetching place predictions:", error);
    return [];
  }
};
