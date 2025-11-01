import { FaStar } from "react-icons/fa6";
import { useFavoriteContext } from "../context/FavoriteContext";
import { useState, useRef, useEffect } from "react";
import type { Coordinates } from "../Types/Coordinates";
import { useCoordsContext } from "../context/CoordsContext";
import { Link } from "react-router-dom";

export default function FavoritesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const { favorites } = useFavoriteContext();
  const { setCityCoords } = useCoordsContext();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClickOutside = (eMouseEvent: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(eMouseEvent.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(eMouseEvent.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const chooseCity = (data: Coordinates) => {
    setCityCoords({
      lat: data.lat,
      lon: data.lon,
      city: data.city,
      country: data.country,
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="hidden sm:flex group py-2 px-2.5 sm:py-3 sm:px-4  hover:bg-neutral-700 bg-neutral-600 
            text-neutral-0 rounded-md items-center gap-2 transition-all duration-200 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        {" "}
        <FaStar className="text-yellow-500 text-xl group-hover:text-yellow-300 group-hover:scale-110" />
        <p className="pre-7 sm:hidden xl:block">Favorites</p>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-[55px] z-40 right-0 rounded-xl px-2 py-1.5 bg-neutral-800 border border-neutral-700 w-60 h-auto flex flex-col"
        >
          {favorites.length === 0 ? (
            <p className="pre-7 text-neutral-0 text-center py-2">
              No favorites added yet
            </p>
          ) : (
            <div>
              {favorites.slice(0, 5).map((city, idx) => (
                <button
                  key={idx}
                  onClick={() => chooseCity(city)}
                  className={`w-full rounded py-1.5 px-2 hover:bg-neutral-700 text-left ${
                    idx !== favorites.length - 1
                      ? "border-b border-neutral-700"
                      : ""
                  }`}
                >
                  <p className="pre-7 text-neutral-0">
                    {city.city}, {city.country}
                  </p>
                </button>
              ))}
              <Link to="/favorites">
                <button className="w-full mt-2 pre-7 py-2 px-2 border-t-2 hover:bg-neutral-600 text-neutral-0 rounded-md"
                onClick={() => setIsOpen(false)}>
                  View All Favorites
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
