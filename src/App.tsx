import "./App.css";
import Search from "./Components/Search";
import WeatherBox from "./Components/WeatherBox";
import Error from "./Components/Error";
import Header from "./Components/Header";
import { useWeather } from "./hooks/useWeather";
import { useStoredState } from "./hooks/localStorageHook";


function App() {
  const [cityCoords, setCityCoords] = useStoredState(null, "coords");
  const { data: weatherData, isLoading, isError, refetch } = useWeather(cityCoords);

  if (isError) {
    return (
        <Error refetch={refetch} />
    );
  }

  return (
    <>
      <Header />
      <p className="pre-2 text-neutral-0 my-12 lg:my-16 w-full text-center">
        How's the sky looking today?
      </p>
      <Search setCityCoords={setCityCoords} />
      {isLoading && <p className="text-neutral-300 text-center">Loading...</p>}
      <WeatherBox data={weatherData} />
    </>
  );
}

export default App;
