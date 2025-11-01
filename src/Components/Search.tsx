import SearchIcon from "../assets/icon-search.svg";
import SpeechToText from "./SpeechToText";
import { useCitySearch } from "../hooks/useCitySearch";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import type { City } from "../Types/CitySearch";
import { TbCurrentLocation } from "react-icons/tb";
import { useCoordsContext } from "../context/CoordsContext";


type ChooseCity = Pick<City, "latitude" | "longitude" | "name" | "country">;

export default function Search() {
  const { setCityCoords } = useCoordsContext();
  const [queryCity, setQueryCity] = useState<string>("");
  const [querySearch, setQuerySearch] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isLoading, isError } = useCitySearch(querySearch) as {
    data: City[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

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
    <form
      className="flex flex-col w-full gap-4 sm:flex-row justify-center items-center mb-8 lg:mb-12"
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
          className="block w-full rounded-xl py-4 pl-14 pr-20 text-neutral-0 pre-5-med
          placeholder:text-neutral-200 truncate bg-neutral-800 hover:bg-neutral-700"
          placeholder="Search for a place"
          id="search"
          onChange={(e) => setQueryCity(e.target.value)}
          value={queryCity}
        />

        <div></div>

        <SpeechToText setQueryCity={setQueryCity} setIsOpen={setIsOpen} setQuerySearch={setQuerySearch} />

        {isOpen && (
          <div
            ref={menuRef}
            className="absolute z-50 top-[70px] rounded-xl p-2 bg-neutral-800 outline outline-2 outline-neutral-700 w-full h-auto max-h-64 overflow-y-auto flex flex-col gap-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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

      <div className="flex gap-2 w-full sm:w-auto">
        <button className="p-4 pre-5-med text-neutral-0 rounded-xl bg-blue-500 w-full sm:w-auto hover:bg-blue-700 transition-all duration-200 active:scale-95">
          {isLoading ? "Searching..." : "Search"}
        </button>
        <button
          className="group py-4 px-5 rounded-xl bg-blue-500 hover:bg-blue-700 relative group transition-all duration-200 active:scale-95 "
          onClick={() => setCityCoords(null)}
          type="button"
        >
          <TbCurrentLocation className="text-neutral-0 group-hover:scale-110 transition-all duration-200" size={25} />
          <div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
             invisible group-hover:visible opacity-0 group-hover:opacity-100
             transition-opacity duration-300
             bg-black text-white text-sm rounded px-3 py-1
             whitespace-nowrap"
          >
            Current Location
            <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black"></div>
          </div>
        </button>
      </div>

      {/* <SpeechToText /> */}
    </form>
  );
}
