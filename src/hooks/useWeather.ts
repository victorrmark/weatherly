import { useQuery } from "@tanstack/react-query";
import { getGeoLocation } from "../utils/geolocation";
import { getWeather, getWeatherByCity } from "../services/searchWeather";

const coords = await getGeoLocation();

export const useWeatherByCurrentLocation =  () => {
  return useQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather(coords),
    staleTime: 1000 * 60 * 5
  });
}

export const useWeatheryBySearchCity = (city: string) => {
    return useQuery({
        queryKey: ["weather", city],
        queryFn: () => getWeatherByCity(city),
        staleTime: 1000 * 60 * 5        
    })
}
