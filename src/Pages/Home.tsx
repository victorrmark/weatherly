import Search from "../Components/Search";
import WeatherBox from "../Components/WeatherBox";
import LoadingSkeleton from "../Components/LoadingSkeleton";
import { useWeather } from "../hooks/useWeather";
import { useCoordsContext } from "../context/CoordsContext";
import Error from "../Components/Error";

export default function Home() {
  const { cityCoords } = useCoordsContext();
  const {
    data: weatherData,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useWeather(cityCoords);

  if (isError) {
    return <Error refetch={refetch} isRefetching={isRefetching} />;
  }

  return (
    <>
      <p className="pre-2 text-neutral-0 my-12 lg:my-16 w-full text-center">
        How's the sky looking today?
      </p>
      <Search />
      {isLoading && <LoadingSkeleton />}
      <WeatherBox data={weatherData} />
    </>
  );
}
