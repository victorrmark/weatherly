import {useState, useEffect} from 'react'
import type { Coordinates } from '../utils/geolocation';

export function useStoredState(defaultValue: Coordinates | null, key:string) {
  const [cityCoords, setCityCoords] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);

    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(cityCoords));
  }, [key, cityCoords]);

  return [cityCoords, setCityCoords];
}