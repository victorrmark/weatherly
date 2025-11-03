import type {Coordinates} from "../Types/Coordinates";
import axios from "axios";

interface Temp {
  time: string;
  temperature: number;
}

export interface WeatherData {
  town?: string;
  state?: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  current: {
    time: string;
    temperature: number;
    feels_like: number;
    humidity: number;
    precipitation: number;
    windspeed: number;
    weathercode: number;
  };
  daily: Array<{
    date: string;
    temp_min: number;
    temp_max: number;
    weathercode: number;
    hourly: Array<{
      time: string;
      temperature: number;
      weathercode: number;
    }>;
  }>;
}

export const getWeatherByCoords = async (
  coords: Coordinates
): Promise<WeatherData> => {
  const { lat, lon, town, city, state, country } = coords;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}
&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,windspeed_10m,weathercode
&hourly=temperature_2m,weathercode
&daily=temperature_2m_max,temperature_2m_min,weathercode
&forecast_days=7
&timezone=auto`;

  const todayDate = new Date().toISOString().split("T")[0];
  const now = new Date();

  try {
    const res = await axios.get(url);
    return {
      town,
      state,
      city,
      country,
      latitude: lat,
      longitude: lon,
      current: {
        time: res.data.current.time,
        temperature: res.data.current.temperature_2m,
        feels_like: res.data.current.apparent_temperature,
        humidity: res.data.current.relative_humidity_2m,
        precipitation: res.data.current.precipitation,
        windspeed: res.data.current.windspeed_10m,
        weathercode: res.data.current.weathercode,
      },
      daily: res.data.daily.time.map((date: string, i: number) => {
        const hoursForDay = res.data.hourly.time
          .map((time: string, j: number) => ({
            time,
            temperature: res.data.hourly.temperature_2m[j],
            weathercode: res.data.hourly.weathercode[j],
          }))
          .filter((h: Temp) => h.time.startsWith(date));

        let dayHours;

        if (date === todayDate) {
          dayHours = hoursForDay
            .filter((h: Temp) => new Date(h.time) >= now)
            // .slice(0, 8);
        } else {
          dayHours = hoursForDay;
        }

        return {
          date,
          temp_min: res.data.daily.temperature_2m_min[i],
          temp_max: res.data.daily.temperature_2m_max[i],
          weathercode: res.data.daily.weathercode[i],
          hourly: dayHours,
        };
      }),
    };
  } catch (error) {
    console.error(error);
    throw new Error("API ERROR");
  }
};

// export const getWeatherByCity = async (city: string) => {
//   if (!city) throw new Error("City is required");
//   const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
//     city
//   )}&count=1`;

//   const res = await axios.get(url);

//   if (res.data && res.data.results && res.data.results.length > 0) {
//     const { latitude, longitude, name, country } = res.data.results[0];
//     const weather = await getWeatherByCoords({ lat: latitude, lon: longitude });
//     return { ...weather, city: name, country };
//   }

//   throw new Error("City not found");
// };
