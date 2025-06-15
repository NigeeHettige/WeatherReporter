const WEATHER_SERVICE_URL = process.env.NEXT_WEATHER_SERVICE_API_URL;
const config={
urls:{
    GET_CURRENT_WEATHER_URL:`${WEATHER_SERVICE_URL}/current.json`,
    GET_CURRENT_WEATHER_URL_RELATIVE:"/api/current",

    GET_FORECAST_WEATHER_URL:`${WEATHER_SERVICE_URL}/forecast.json`,
    GET_FORECAST_WEATHER_URL_RELATIVE:"/api/forecast"
}
};
export default config;
