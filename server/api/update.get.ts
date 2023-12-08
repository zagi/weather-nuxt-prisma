import { CurrentWeatherDataResponse, City, Weather } from "~/types/weather.d";
import { getCities, createWeather } from "../utils/cityService";
import { createLog } from "../utils/logService";

async function fetchWeatherData(
  city: City,
  config: any
): Promise<Weather | null> {
  const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${config.weatherApiKey}`;

  try {
    const res: CurrentWeatherDataResponse | null =
      await $fetch<CurrentWeatherDataResponse>(url);

    if (!res) {
      createLog(url, "", 200, `Error fetching weather for ${city.name}`);
      return null;
    }

    createLog(
      url,
      JSON.stringify(res),
      200,
      `Successfully fetched weather for ${city.name}`
    );
    const { temp } = res.main;
    return createWeather(city.id, temp, "metric");
  } catch (error: any) {
    createLog(
      url,
      "",
      404,
      `Failed to fetch weather for ${city.name}: ${error.message}`
    );
    return null;
  }
}

export default defineEventHandler(async (event: any) => {
  const config: any = useRuntimeConfig(event);

  try {
    const cities: City[] = await getCities();
    const weatherPromises: Promise<Weather | null>[] = cities.map((city) =>
      fetchWeatherData(city, config)
    );
    const weatherResults: (Weather | null)[] = await Promise.all(
      weatherPromises
    );

    const successfulUpdates: Weather[] = weatherResults.filter(
      (result): result is Weather => result !== null
    );

    return { success: "Updated", updatedCount: successfulUpdates.length };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to update weather data: ${error.message}`,
    });
  }
});
