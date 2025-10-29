import "./App.css";
import Search from "./Components/Search";
import WeatherBox from "./Components/WeatherBox";
import Error from "./Components/Error";
import LoadingSkeleton from "./Components/LoadingSkeleton";
import Header from "./Components/Header";
import { useWeather } from "./hooks/useWeather";
import { useStoredState } from "./hooks/localStorageHook";


function App() {
  const [cityCoords, setCityCoords] = useStoredState(null, "coords");
  const { data: weatherData, isLoading, isError, refetch, isRefetching } = useWeather(cityCoords);

  if (isError) {
    return (
        <Error refetch={refetch} isRefetching={isRefetching} />
    );
  }

  return (
    <>
      <Header isLoading={isLoading} />
      <p className="pre-2 text-neutral-0 my-12 lg:my-16 w-full text-center">
        How's the sky looking today?
      </p>
      <Search setCityCoords={setCityCoords} />
      {isLoading && <LoadingSkeleton />}
      <WeatherBox data={weatherData} />
    </>
  );
}

export default App;
