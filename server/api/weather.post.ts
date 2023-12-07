import {
  GeocodingDataResponse,
  CurrentWeatherDataResponse,
  CurrentWeatherRequest,
} from "~/types/weather.d";

import { createCity } from "../utils/cityService";
import { createLog } from "../utils/logService"; // Replace with actual context type

function logAndThrow(
  url: string,
  response: any,
  statusCode: number,
  message: string,
  throwMessage: string
): never {
  createLog(url, JSON.stringify(response), statusCode, message);
  throw new Error(throwMessage);
}

async function fetchAndLog<T>(
  url: string,
  successMessage: string,
  errorMessage: string
): Promise<T> {
  const response: T = await $fetch(url);
  if (!response) {
    logAndThrow(url, response, 404, errorMessage, errorMessage);
  }
  createLog(url, JSON.stringify(response), 200, successMessage);
  return response;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body: { cities: string[] } = await readBody(event);

  try {
    const geocodingPromises = body.cities.map(async (city) => {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${config.weatherApiKey}`;
      const geoRes: GeocodingDataResponse[] = await fetchAndLog<
        GeocodingDataResponse[]
      >(
        geoUrl,
        `Successfully geocoded ${city}`,
        `Geocoding for city ${city} failed.`
      );
      const { lat, lon, country } = geoRes[0];
      return { name: city, lat, lon, country, unit: "metric" };
    });

    const geoCodedCities: CurrentWeatherRequest[] = await Promise.all(
      geocodingPromises
    );

    const weatherPromises = geoCodedCities.map(async (city) => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=${city.unit}&appid=${config.weatherApiKey}`;
      const weatherRes: CurrentWeatherDataResponse =
        await fetchAndLog<CurrentWeatherDataResponse>(
          weatherUrl,
          `Successfully fetched weather for ${city.name}`,
          `Weather data for city ${city.name} not found.`
        );
      const { temp } = weatherRes.main;
      return createCity(
        city.name,
        city.country,
        city.lat,
        city.lon,
        temp,
        city.unit
      );
    });

    return await Promise.all(weatherPromises);
  } catch (error: any) {
    throw createError({ statusCode: 404, statusMessage: error.message });
  }
});
