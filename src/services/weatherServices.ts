import type { Coordinates } from "../utils/geolocation";
import axios from "axios";

interface Temp {
    time: string;
    temperature: number;
}

export const getWeather = async (coords: Coordinates) => {
  const { latitude, longitude, city, country } = coords;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}
&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,windspeed_10m
&hourly=temperature_2m
&daily=temperature_2m_max,temperature_2m_min
&forecast_days=7
&timezone=auto`;

  const todayDate = new Date().toISOString().split("T")[0];
  const now = new Date();

  try {
    const res = await axios.get(url);
    return {
      city,
      country,
      current: {
        temperature: res.data.current.temperature_2m,
        feels_like: res.data.current.apparent_temperature,
        humidity: res.data.current.relative_humidity_2m,
        precipitation: res.data.current.precipitation,
        windspeed: res.data.current.windspeed_10m,
      },
      daily: res.data.daily.time.map((date: string, i: number) => {
        const hoursForDay = res.data.hourly.time
          .map((time: string, j: number) => ({
            time,
            temperature: res.data.hourly.temperature_2m[j],
          }))
          .filter((h: Temp) => h.time.startsWith(date));

        let dayHours;

        if (date === todayDate) {
          dayHours = hoursForDay
            .filter((h: Temp) => new Date(h.time) >= now)
            .slice(0, 8);
        } else {
          dayHours = hoursForDay.slice(0, 8);
        }

        return {
          date,
          temp_min: res.data.daily.temperature_2m_min[i],
          temp_max: res.data.daily.temperature_2m_max[i],
          hourly: dayHours,
        };
      }),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getWeatherByCity = async (city: string) => {
  if (!city) throw new Error("City is required");
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1`;
  const res = await axios.get(url);
  if (res.data && res.data.results && res.data.results.length > 0) {
    const { latitude, longitude, name, country } = res.data.results[0];
    const weather = await getWeather({ latitude, longitude });
    return { ...weather, city: name, country };
  }

  throw new Error("City not found");
};
