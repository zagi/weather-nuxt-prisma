import { CurrentWeatherDataResponse } from "~/types/weather.d";

import { getCities } from "../utils/cityService";
import { createLog } from "../utils/logService";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  try {
    const cities = await getCities();
    const weatherPromises = cities.map(async (city) => {
      try {
        const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${config.weatherApiKey}`;
        const res: CurrentWeatherDataResponse = await $fetch(url);
        if (!res) {
          createLog(
            url,
            JSON.stringify(res),
            200,
            `Error fetching weather for ${city.name}`
          );
          throw new Error(`Weather data for city ${city.name} not found.`);
        }
        createLog(
          url,
          JSON.stringify(res),
          200,
          `Successfully fetched weather for ${city.name}`
        );
        const { temp } = res.main;
        return createWeather(city.id, temp, 'metric');
      } catch (error) {
        throw error;
      }
    });
    const weather = await Promise.all(weatherPromises);
    return {
      'success': 'Updated'
    };
  } catch (error: any) {
    throw createError({
      statusCode: 404,
      statusMessage: error.message,
    });
  }
});
