import DropdownIcon from "../assets/icon-dropdown.svg";
import { useState } from "react";
import { useUnitContext } from "../context/UnitContext";
import { celsiusToFahrenheit } from "../helper/UnitConverters";
import { getWeatherIcon } from "../utils/getWeatherIcon";

interface Data {
  date: string;
  temp_min: number;
  temp_max: number;
  weathercode: number;
  hourly: {
    time: string;
    temperature: number;
    weathercode: number;
  }[];
}

export default function HoulyForecast({ data }: { data: Data[] }) {
  const [selectedDay, setSelectedDay] = useState<string>(data[0].date);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { useMetric } = useUnitContext();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectDay = (day: string) => {
    setSelectedDay(day);
    setIsOpen(false);
  };
  const formatedDay = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  const formatedHour = (time: string): string => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const dataArray = data.find((data) => data.date === selectedDay);

  return (
    <div className="relative flex flex-col py-5 pl-4 pr-1 bg-neutral-800 rounded-3xl max-h-[46.88rem] xl:w-[384px] xl:self-stretch overflow-hidden">
      <div className="flex justify-between items-center mb-4 pr-4 shrink-0">
        <p className="pre-5 text-neutral-0">Hourly forecast</p>
        <button
          className="py-2 px-2.5 pre-7 text-neutral-0 hover:bg-neutral-700 bg-neutral-600 rounded-md flex items-center gap-2.5"
          onClick={toggleDropdown}
        >
          {formatedDay(selectedDay)}
          <img src={DropdownIcon} alt="Dropdown Icon" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute w-48 h-auto bg-neutral-800 border border-neutral-600 rounded-xl shadow-md z-10 p-2 right-5 top-[4.375rem]">
          <ul className="flex flex-col gap-1">
            {data.map((data, index) => (
              <li
                key={index}
                onClick={() => handleSelectDay(data.date)}
                className={`py-2.5 px-2 hover:bg-neutral-600 hover:rounded-lg cursor-pointer text-neutral-0 pre-7 ${
                  selectedDay === data.date ? "bg-neutral-700 rounded-lg" : ""
                }`}
              >
                {formatedDay(data.date)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex-1 min-h-0 pr-3 flex flex-col gap-4 overflow-y-auto outline-none scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-700 scrollbar-clean">
        {dataArray?.hourly.map((hour, index) => (
          <div
            key={index}
            className="py-2.5 px-3 flex items-center gap-2 bg-neutral-700 rounded-lg border border-neutral-600"
          >
            <img
              src={getWeatherIcon(hour.weathercode)}
              alt="weather icon"
              className="object-cover"
              style={{ width: "50px", height: "auto" }}
            />
            <p className="pre-5-med text-neutral-0 flex-1">
              {formatedHour(hour.time)}
            </p>
            <p className="pre-7 text-neutral-0">
              {useMetric
                ? Math.trunc(hour.temperature)
                : celsiusToFahrenheit(hour.temperature)}
              °
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
