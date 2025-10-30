import HoulyForecast from "./HoulyForecast";
import CurrentConditions from "./CurrentConditions";
import WeatherHero from "./WeatherHero";
import type { WeatherData } from "../services/searchWeather";
import { useUnitContext } from "../context/UnitContext";
import { celsiusToFahrenheit } from "../helper/UnitConverters";
import { getWeatherIcon } from "../utils/getWeatherIcon";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useFavoriteContext } from "../context/FavoriteContext";

export default function WeatherBox({
  data,
}: {
  data: WeatherData | undefined;
}) {
  const { useMetric } = useUnitContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const { favorites, setFavorites } = useFavoriteContext();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  console.log(favorites)

  useEffect(() => {
    if (data) {
      if (isFavorite) {
        setFavorites((prev) => [
          ...prev,
          { name: data?.city, country: data?.country },
        ]);
      } else {
        setFavorites((prev) => prev.filter((fav) => fav.name !== data?.city));
      }
    }
  }, [isFavorite, data]);

  useEffect(() => {
    if (!data?.city || !data?.country || !favorites) return;

    const isAlreadyFavorite = favorites.some(
      (fav) =>
        (fav.name ?? "").trim().toLowerCase() ===
          (data?.city ?? "").trim().toLowerCase() &&
        (fav.country ?? "").trim().toLowerCase() ===
          (data?.country ?? "").trim().toLowerCase()
    );

    setIsFavorite((prev) =>
      prev === isAlreadyFavorite ? prev : isAlreadyFavorite
    );
  }, [data]);

  return (
    <>
      {data && (
        <div className="w-full flex flex-col xl:flex-row gap-8 h-full items-stretch">
          <div>
            <WeatherHero data={data} />
            <div
              className="relative bg-image-bg-s sm:bg-image-bg-l bg-no-repeat bg-cover h-72 rounded-[1.25rem] 
          flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 sm:gap-8 p-3 sm:p-6"
            >
              <button
                className="absolute top-4 right-4 transition"
                onClick={toggleFavorite}
              >
                {isFavorite ? (
                  <FaStar className="text-yellow-500 text-4xl " />
                ) : (
                  <FaRegStar className="text-neutral-0 text-4xl " />
                )}
              </button>
              <span>
                <p className="pre-4 text-neutral-0 text-center sm:text-left">
                  {data.city}, {data.country}
                </p>
                <p className="pre-6 text-neutral-200 text-center sm:text-left">
                  {new Date(data.current.time).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </span>

              <span className="flex items-center gap-2">
                <img
                  src={getWeatherIcon(data.current.weathercode)}
                  alt="current weather icon"
                  className="object-cover"
                  style={{ width: "95px", height: "auto" }}
                />
                <p className="pre-1 text-neutral-0 font-bricolage">
                  {useMetric
                    ? Math.trunc(data.current.temperature)
                    : celsiusToFahrenheit(data.current.temperature)}
                  °
                </p>
              </span>
            </div>

            <CurrentConditions data={data.current} />

            <div className="mt-8 lg:mb-12">
              <p className="pre-6 text-neutral-200 mb-5">Daily Forcast</p>

              <div className="grid grid-cols-3 sm:grid-cols-7 gap-3.5 sm:gap-5 ">
                {data.daily.map((forecast, index) => {
                  return (
                    <div className="forecast-card" key={index}>
                      <p className="pre-6 text-neutral-200 text-center">
                        {new Date(forecast.date).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </p>
                      <div className="m-auto">
                        <img
                          src={getWeatherIcon(forecast.weathercode)}
                          alt="current weather icon"
                          className="object-cover"
                          style={{ width: "70px", height: "auto" }}
                        />
                      </div>
                      <span className="flex justify-between">
                        <p className="pre-7 text-neutral-0">
                          {useMetric
                            ? Math.trunc(forecast.temp_max)
                            : celsiusToFahrenheit(forecast.temp_max)}
                          °
                        </p>
                        <p className="pre-7 text-neutral-0">
                          {useMetric
                            ? Math.trunc(forecast.temp_min)
                            : celsiusToFahrenheit(forecast.temp_min)}
                          °
                        </p>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <HoulyForecast data={data.daily} />
        </div>
      )}
    </>
  );
}
