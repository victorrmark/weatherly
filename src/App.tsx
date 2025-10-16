// import { useState } from "react";
import "./App.css";
import Logo from "./assets/logo.svg";
import UnitsIcon from "./assets/icon-units.svg";
import DropdownIcon from "./assets/icon-dropdown.svg";
import Search from "./Components/Search";
import WeatherBox from "./Components/WeatherBox";
import Error from "./Components/Error";
import { useWeather } from "./hooks/useWeather";
import { useState } from "react";

// const location = await getCurrentPosition();

function App() {
  // console.log(location)
  const [city, setCity] = useState<string | null>(null);
  const { data: weatherData, isLoading, isError, refetch } = useWeather(city);
  console.log(weatherData);

  if (isError) {
    return (
        <Error refetch={refetch} />
    );
  }

  return (
    <>
      <div className="flex justify-between items-center w-full ">
        <img src={Logo} alt="Weather Now Logo" />

        <button
          className="py-2 px-2.5 sm:py-3 sm:px-4 pre-8 sm:pre-7 bg-neutral-800 hover:bg-neutral-700 
        text-neutral-0 rounded-md flex items-center gap-1.5 sm:gap-2.5"
        >
          <img src={UnitsIcon} alt="Units Icon" />
          Units
          <img src={DropdownIcon} alt="Dropdown Icon" />
        </button>
      </div>
      <p className="pre-2 text-neutral-0 my-12 lg:my-16 w-full text-center">
        How's the sky looking today?
      </p>
      <Search />
      {isLoading && <p className="text-neutral-300 text-center">Loading...</p>}
      <WeatherBox data={weatherData} />
    </>
  );
}

export default App;
