import HoulyForecast from "./HoulyForecast";
import CurrentConditions from "./CurrentConditions";
import WeatherHero from "./WeatherHero";
import { useUnitContext } from "../context/UnitContext";
import { celsiusToFahrenheit } from "../helper/UnitConverters";
import { getWeatherIcon } from "../utils/getWeatherIcon";
import { useWeather } from "../hooks/useWeather";
import { useCoordsContext } from "../context/CoordsContext";

export default function WeatherBox() {
  const { useMetric } = useUnitContext();
  const { cityCoords } = useCoordsContext();
  const { data } = useWeather(cityCoords);

  return (
    <>
      {data && (
        <div className="w-full flex flex-col xl:flex-row gap-8 h-full items-stretch">
          <div>
            <WeatherHero
              data={{
                town: data.town,
                state: data.state,
                city: data.city,
                country: data.country,
                lat: data.latitude,
                lon: data.longitude,
                time: data.current.time,
                temperature: data.current.temperature,
                weathercode: data.current.weathercode,
              }}
            />

            <CurrentConditions data={data.current} />

            <div className="mt-8 lg:mb-12">
              <p className="pre-6 text-neutral-200 mb-5">Daily Forcast</p>

              <div className="grid grid-cols-3 sm:grid-cols-7 gap-3 sm:gap-3.5 ">
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
                          style={{ width: "75px", height: "auto" }}
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
