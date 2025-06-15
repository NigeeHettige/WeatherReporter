import { Client } from "@googlemaps/google-maps-services-js";
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export const GET = async (request: NextRequest) => {
  const query = request.nextUrl.searchParams.get("q");
  if (!query) {
    return new NextResponse("Missing query parameter 'q'", { status: 400 });
  }
  const location_key = process.env.PLACES_API_KEY;
  if (!location_key) {
    return new NextResponse("Access denied", { status: 401 });
  }
  const client = new Client();
  try {
    const response = await client.placeAutocomplete({
      params: {
        input: query,
        key: location_key,
      },
    });

    return NextResponse.json(response.data.predictions);
  } catch (error) {
    if (error instanceof AxiosError) {
      return new NextResponse("Error in fetching places names", {
        status: error.response?.status || 500,
      });
    }
    return new NextResponse("An unexpected error occured", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
