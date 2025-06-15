import config from "@/utils/config";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const city = request.nextUrl.searchParams.get("q") || "Colombo";
    const key = process.env.WEATHER_API_KEY;
    if (!key) {
      return new NextResponse("Access denied", { status: 401 });
    }
    const BASE_URL = `${config.urls.GET_FORECAST_WEATHER_URL}?key=${key}&days=5&q=${city}`;
    console.log("External API URL:", BASE_URL);
    const response = await axios.get(BASE_URL);
    return new NextResponse(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return new NextResponse("Error in fetching weather data", {
        status: error.response?.status || 500,
      });
    }
    return new NextResponse("An unexpected error occured", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
