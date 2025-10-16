import sunny from "../assets/icon-sunny.webp";
import type { WeatherData } from "../services/searchWeather";
import HoulyForecast from "./HoulyForecast";

export default function WeatherBox({
  data,
}: {
  data: WeatherData | undefined;
}) {


  return (
    <>
      {data && (
        <div className="w-full flex flex-col xl:flex-row gap-8">
          <div>
            <div
              className="bg-image-bg-s sm:bg-image-bg-l bg-no-repeat bg-cover h-72 rounded-[1.25rem] 
          flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 sm:gap-8 p-3 sm:p-6"
            >
              <span>
                <p className="pre-4 text-neutral-0 text-center sm:text-left">
                  {data.city}, {data.country}
                </p>
                <p className="pre-6 text-neutral-200 text-center sm:text-left">
                  {new Date(data.current.time).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </span>

              <span className="flex items-center gap-2">
                <img
                  src={sunny}
                  alt="current weather icon"
                  className="object-cover"
                  style={{ width: "95px", height: "auto" }}
                />
                <p className="pre-1 text-neutral-0 font-bricolage">
                  {Math.trunc(data.current.temperature)}°
                </p>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 mt-5 mb-8 lg:mb-12">
              <div className="weather-card">
                <p className="pre-6 text-neutral-200">Feels Like</p>
                <p className="pre-3 text-neutral-0">
                  {Math.trunc(data.current.feels_like)}°
                </p>
              </div>
              <div className="weather-card">
                <p className="pre-6 text-neutral-200">Humidity</p>
                <p className="pre-3 text-neutral-0">
                  {Math.trunc(data.current.humidity)}%
                </p>
              </div>
              <div className="weather-card">
                <p className="pre-6 text-neutral-200">Wind</p>
                <p className="pre-3 text-neutral-0">
                  {Math.trunc(data.current.windspeed)} km/h
                </p>
              </div>
              <div className="weather-card">
                <p className="pre-6 text-neutral-200 break-words leading-none">
                  Precipitation
                </p>
                <p className="pre-3 text-neutral-0">
                  {Math.trunc(data.current.precipitation)} mm
                </p>
              </div>
            </div>

            <div>
              <p className="pre-6 text-neutral-200 mb-5">Daily Forcast</p>

              <div className="grid grid-cols-3 sm:grid-cols-7 gap-3.5 sm:gap-5 lg:gap-6 ">
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
                          src={sunny}
                          alt="current weather icon"
                          className="object-cover"
                          style={{ width: "70px", height: "auto" }}
                        />
                      </div>
                      <span className="flex justify-between">
                        <p className="pre-7 text-neutral-0">
                          {Math.trunc(forecast.temp_max)}°
                        </p>
                        <p className="pre-7 text-neutral-0">
                          {Math.trunc(forecast.temp_min)}°
                        </p>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <HoulyForecast data={data.daily}/>
        </div>
      )}
    </>
  );
}
