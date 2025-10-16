import { useQuery } from "@tanstack/react-query";
// import {useState, useEffect} from "react";
import { getCurrentPosition } from "../utils/geolocation";
import { getWeatherByCity, getWeatherByCoords} from "../services/searchWeather";
import type { Coordinates } from "../utils/geolocation";

export const useWeather = (city: string | null) => {

  return useQuery({
    queryKey: ["weather", city ?? "current-location"],
    queryFn: async () => {
      if (city) {
        return getWeatherByCity(city);
      }
      const coords: Coordinates = await getCurrentPosition();
      return getWeatherByCoords(coords);
    },
    staleTime: 1000 * 60 * 10,
    retry: false, 
  });
};
