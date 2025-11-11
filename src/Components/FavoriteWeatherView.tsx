import { useState, useRef, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { isSameLocation } from "../utils/favoritesCheck";
import type { Coordinates } from "../Types/Coordinates";
import { useWeather } from "../hooks/useWeather";
import { celsiusToFahrenheit } from "../helper/UnitConverters";
import { useUnitContext } from "../context/UnitContext";
import { getWeatherIcon } from "../utils/getWeatherIcon";

export default function FavoriteWeatherView({
  city,
  isOpen,
  setFavorites,
  onClick,
}: {
  city: Coordinates;
  isOpen: boolean;
  setFavorites: React.Dispatch<React.SetStateAction<Coordinates[]>>;
  onClick: () => void;
}) {
  const { useMetric } = useUnitContext();

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useWeather(city);

  const deleteFavorite = (data: Coordinates) => {
    const clicked = { lat: data.lat, lon: data.lon };
    setFavorites((prev) =>
      prev.filter((fave) => !isSameLocation(fave, clicked))
    );
  };

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      className={`py-3 px-6 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-all duration-500 cursor-pointer ${
        isOpen ? "ring-2 ring-blue-500 max-h-[1000px] bg-neutral-900" : ""
      } max-height-0 overflow-hidden`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="pre-5 text-neutral-0 leading-none">
            {city.town || city.city}, {city.country}
          </p>
          <p className="pre-7 text-neutral-400 leading-none">
            {city.city}, {city.state}
          </p>
        </div>
        <button
          onClick={() => deleteFavorite(city)}
          className="hover:bg-red-400 p-1 rounded-full hover:opacity-50 transition-all duration-200"
        >
          <RiDeleteBinLine className="text-red-800 text-xl " />
        </button>
      </div>
      <div
        ref={ref}
        className={`overflow-hidden transition-all duration-500 `}
        style={{ maxHeight: isOpen ? `${height}px` : 0 }}
      >
        {data && (
          <div className="mb-2 flex flex-col-reverse justify-between items-center sm:flex-row">
            <div>
              <p className="pre-1 sm:text-9xl text-neutral-0 font-bricolage text-center sm:text-left">
                {useMetric
                  ? Math.trunc(data.current.temperature)
                  : celsiusToFahrenheit(data.current.temperature)}
                °{useMetric ? "C" : "F"}
              </p>
              <p className="pre-7  text-neutral-400 leading-none text-center sm:text-left">
                Feels like:{" "}
                {useMetric
                  ? Math.trunc(data.current.feels_like)
                  : celsiusToFahrenheit(data.current.feels_like)}
                °{useMetric ? "C" : "F"}
              </p>
            </div>

            <img
              src={getWeatherIcon(data.current.weathercode)}
              alt="current weather icon"
              className="object-cover"
              style={{ width: "210px", height: "auto" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
