import { useQuery } from "@tanstack/react-query";
// import {useState, useEffect} from "react";
import { getCurrentPosition } from "../utils/geolocation";
import {  getWeatherByCoords} from "../services/searchWeather";
import type { Coordinates } from "../utils/geolocation";

export const useWeather = (cityCoords: Coordinates | null) => {

  return useQuery({
    queryKey: ["weather", cityCoords ?? "current-location"],
    queryFn: async () => {
      if (cityCoords) {
        return getWeatherByCoords(cityCoords);
      }
      const geolocation: Coordinates = await getCurrentPosition();
      return getWeatherByCoords(geolocation);
    },
    enabled: !!cityCoords || cityCoords === null,
    staleTime: 1000 * 60 * 10,
    retry: false, 
  });
};
