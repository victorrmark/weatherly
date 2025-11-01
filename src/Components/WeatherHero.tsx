import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { useUnitContext } from "../context/UnitContext";
import { celsiusToFahrenheit } from "../helper/UnitConverters";
import { getWeatherIcon } from "../utils/getWeatherIcon";
import { useEffect, useState } from "react";
import { useFavoriteContext } from "../context/FavoriteContext";
import { isSameLocation } from "../utils/favoritesCheck";
import { toast } from "sonner";

interface Props {
  country: string;
  city: string;
  lat: number;
  lon: number;
  time: string;
  temperature: number;
  weathercode: number;
}

export default function WeatherHero({ data }: { data: Props }) {
  const { useMetric } = useUnitContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const { favorites, setFavorites } = useFavoriteContext();

  const toggleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      toast.info("Removed from favorites!", {
        description: `${data.city}, ${data.country} has been removed from your favorites.`,
        duration: 3000,
      });
    } else {
      setIsFavorite(true);
      toast.success("Added to favorites!", {
        description: `${data.city}, ${data.country} has been added to your favorites.`,
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (!data?.city || !data?.country) return;

    const current = {
      lat: data.lat,
      lon: data.lon,
      city: data.city,
      country: data.country,
    };

    setFavorites((prev) => {
      const exists = prev.some((fav) => isSameLocation(fav, current));

      if (isFavorite && !exists) return [...prev, current];

      if (!isFavorite && exists)
        return prev.filter((fav) => !isSameLocation(fav, current));

      return prev;
    });
  }, [isFavorite, data]);

  useEffect(() => {
    if (!data?.city || !data?.country) return;

    const current = { city: data.city, country: data.country };
    const exists = favorites.some((fav) => isSameLocation(fav, current));

    setIsFavorite((prev) => (prev === exists ? prev : exists));
  }, [data]);

  return (
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
          {new Date(data.time).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </span>

      <span className="flex items-center gap-2">
        <img
          src={getWeatherIcon(data.weathercode)}
          alt="current weather icon"
          className="object-cover"
          style={{ width: "95px", height: "auto" }}
        />
        <p className="pre-1 text-neutral-0 font-bricolage">
          {useMetric
            ? Math.trunc(data.temperature)
            : celsiusToFahrenheit(data.temperature)}
          °
        </p>
      </span>
    </div>
  );
}
