import SearchIcon from "../assets/icon-search.svg";
import { useCitySearch } from "../hooks/useCitySearch";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import type { City } from "../Types/CitySearch";
import type { Coordinates } from "../utils/geolocation";

type SearchProps = {
  setCityCoords: (coords: Coordinates) => void;
};

type ChooseCity = Pick<City, "latitude" | "longitude" | "name" | "country">;

export default function Search({ setCityCoords }: SearchProps) {
  const [queryCity, setQueryCity] = useState<string>("");
  const [querySearch, setQuerySearch] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isLoading, isError } = useCitySearch(querySearch) as {
    data: City[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      console.log(data);
    }
  }, [data]);

  const searchForCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!queryCity) {
      toast.error("Search for a city first", {
        duration: 3000,
        closeButton: true,
      });
      return;
    }

    if (queryCity.length < 2) {
      toast.error("Type in at least 2 letters", {
        duration: 3000,
        closeButton: true,
      });
      return;
    }
    setIsOpen(true);
    setQuerySearch(queryCity);
  };

  const handleClickOutside = (eMouseEvent: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(eMouseEvent.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const chooseCity = (data: ChooseCity) => {
    setCityCoords({
      lat: data.latitude,
      lon: data.longitude,
      city: data.name,
      country: data.country,
    });
    setIsOpen(false);
    setQueryCity("");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <form
        className="flex flex-col w-full gap-4 sm:flex-row justify-center mb-8 lg:mb-12"
        onSubmit={searchForCity}
      >
        <div className="relative w-full max-w-xl sm:flex-initial">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <img src={SearchIcon} alt="Search Icon" />
          </div>
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            className="block w-full rounded-xl py-4 pl-14 pr-6 text-neutral-0 
          placeholder:pre-5-med placeholder:text-neutral-200 truncate bg-neutral-800 hover:bg-neutral-700"
            placeholder="Search for a place"
            id="search"
            onChange={(e) => setQueryCity(e.target.value)}
            value={queryCity}
          />

          {isOpen && (
            <div
              ref={menuRef}
              className="absolute top-[60px] rounded-xl p-2 bg-neutral-800 outline outline-2 outline-neutral-700 w-full h-auto max-h-64 overflow-y-auto flex flex-col gap-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {isError && (
                <p className="pre-5 text-neutral-0 text-center bg-neutral-700 rounded-lg py-2.5 px-2 ">
                  No search result found!
                </p>
              )}
              {isLoading && (
                <div className="flex items-center gap-2 text-neutral-0 justify-center">
                  <FaSpinner className="w-5 h-5 animate-spin text-neutral-0" />
                  <p className="pre-7 text-neutral-0">Search in progress</p>
                </div>
              )}
              {data &&
                data.map((data, index: number) => (
                  <div
                    key={index}
                    onClick={() => chooseCity(data)}
                    className="bg-neutral-700 rounded-lg py-2.5 px-2 border border-neutral-600 z-10 cursor-pointer hover:bg-neutral-600"
                  >
                    <p className="pre-7 text-neutral-0">
                      {data.name}, {data.country}
                    </p>
                    <p className="pre-8 text-neutral-200">
                      {data.admin1}, {data.admin2}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
        <button className="py-4 px-6 pre-5-med text-neutral-0 rounded-xl bg-blue-500 w-full sm:w-auto hover:bg-blue-700">
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </>
  );
}
