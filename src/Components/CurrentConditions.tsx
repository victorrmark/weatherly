import { useUnitContext } from "../context/UnitContext";
import {
  celsiusToFahrenheit,
  kmhToMph,
  mmToInches,
} from "../helper/UnitConverters";
import { useState, useEffect, useRef } from "react";

interface CurrentConditionsProps {
  time: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  precipitation: number;
  windspeed: number;
  weathercode: number;
  visibility: number;
  pressure: number;
  cloud_cover: number;
  uv_index: number;
}
export default function CurrentConditions({
  data,
}: {
  data: CurrentConditionsProps;
}) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const { useMetric } = useUnitContext();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [showMore]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 mt-5 mb-3.5 lg:mb-6">
        <div className="weather-card">
          <p className="pre-6 text-neutral-200">Feels Like</p>
          <p className="pre-3 text-neutral-0">
            {useMetric ? Math.trunc(data.feels_like) : celsiusToFahrenheit(data.feels_like)}
            °{useMetric ? "C" : "F"}
          </p>
        </div>
        <div className="weather-card">
          <p className="pre-6 text-neutral-200">Humidity</p>
          <p className="pre-3 text-neutral-0">{Math.trunc(data.humidity)}%</p>
        </div>
        <div className="weather-card">
          <p className="pre-6 text-neutral-200">Wind</p>
          <p className="pre-3 text-neutral-0">
            {useMetric ? Math.trunc(data.windspeed) : kmhToMph(data.windspeed)}
            {useMetric ? " km/h" : " mph"}
          </p>
        </div>
        <div className="weather-card">
          <p className="pre-6 text-neutral-200 break-words leading-none">
            Precipitation
          </p>
          <p className="pre-3 text-neutral-0">
            {useMetric ? data.precipitation : mmToInches(data.precipitation)}
            {useMetric ? " mm" : " in"}
          </p>
        </div>
      </div>

      <div
        style={{
          height: showMore ? `${height}px` : "0px",
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
        ref={ref}
      >
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showMore ? "max-h-96" : "h-0"
            } grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6`}
          >
            <div className="weather-card">
              <p className="pre-6 text-neutral-200 break-words leading-none">Visibility</p>
              <p className="pre-3 text-neutral-0">
                {useMetric
                  ? data.visibility / 1000
                  : (data.visibility / 1609.34).toFixed(1)}
                {useMetric ? " km" : " mi"}
              </p>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200 break-words leading-none">
                Air Pressure
              </p>
              <p className="pre-3 text-neutral-0">
                {useMetric
                  ? Math.trunc(data.pressure)
                  : Math.trunc(data.pressure * 0.02953)}
                {useMetric ? " hPa" : " inHg"}
              </p>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200 break-words leading-none">
                Cloud Cover
              </p>
              <p className="pre-3 text-neutral-0">
                {data.cloud_cover} %
              </p>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200 break-words leading-none">
                UV Index
              </p>
              <p className="pre-3 text-neutral-0">
                {data.uv_index} %
              </p>
            </div>
          </div>
      </div>

      <button
        className={`pre-7 w-full text-center rounded-xl focus:border-spacing-1 text-neutral-0 py-2.5 px-2 bg-blue-500 hover:bg-blue-700 ${showMore ? "mt-3.5 lg:mt-6" : "mt-0 lg:mt-0"}`}
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </>
  );
}
