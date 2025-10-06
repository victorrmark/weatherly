import sunny from "../assets/icon-sunny.webp";

export default function WeatherBox() {
  return (
    <div className="w-full">
      <div>
        <div
          className="bg-image-bg-s sm:bg-image-bg-l bg-no-repeat bg-cover h-72 rounded-[1.25rem] 
          flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 sm:gap-8 p-3 sm:p-6"
        >
          <span>
            <p className="pre-4 text-neutral-0 text-center sm:text-left">
              Berlin, Germany
            </p>
            <p className="pre-6 text-neutral-200 text-center sm:text-left">
              Tuesday, Aug 5th, 2025
            </p>
          </span>

          <span className="flex items-center gap-2">
            <img
              src={sunny}
              alt="current weather icon"
              className="object-cover"
              style={{ width: "95px", height: "auto" }}
            />
            <p className="pre-1 text-neutral-0 font-bricolage">20o</p>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 mt-5 mb-8 lg:mb-12">
          <div className="weather-card">
            <p className="pre-6 text-neutral-200">Feels Like</p>
            <p className="pre-3 text-neutral-0">18o</p>
          </div>
          <div className="weather-card">
            <p className="pre-6 text-neutral-200">Humidity</p>
            <p className="pre-3 text-neutral-0">46%</p>
          </div>
          <div className="weather-card">
            <p className="pre-6 text-neutral-200">Wind</p>
            <p className="pre-3 text-neutral-0">14 km/h</p>
          </div>
          <div className="weather-card">
            <p className="pre-6 text-neutral-200">Precipitation</p>
            <p className="pre-3 text-neutral-0">0 mm</p>
          </div>
        </div>

        <div>
          <p className="pre-6 text-neutral-200 mb-5">Daily Forcast</p>

          <div className="grid grid-cols-3 sm:grid-cols-7 gap-3.5 sm:gap-5 lg:gap-6 mt-5 mb-8 lg:mb-12">
            <div className="forecast-card">
              <p className="pre-6 text-neutral-200 text-center">Tue</p>
              <div className="m-auto">
                <img
                  src={sunny}
                  alt="current weather icon"
                  className="object-cover"
                  style={{ width: "70px", height: "auto" }}
                />
              </div>
              <span className="flex justify-between">
                <p className="pre-7 text-neutral-0">20o</p>
                <p className="pre-7 text-neutral-0">14o</p>
              </span>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200">UV Index</p>
              <p className="pre-3 text-neutral-0">3</p>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200">UV Index</p>
              <p className="pre-3 text-neutral-0">3</p>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200">UV Index</p>
              <p className="pre-3 text-neutral-0">3</p>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200">UV Index</p>
              <p className="pre-3 text-neutral-0">3</p>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200">UV Index</p>
              <p className="pre-3 text-neutral-0">3</p>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200">UV Index</p>
              <p className="pre-3 text-neutral-0">3</p>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200">UV Index</p>
              <p className="pre-3 text-neutral-0">3</p>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200">UV Index</p>
              <p className="pre-3 text-neutral-0">3</p>
            </div>
            <div className="weather-card">
              <p className="pre-6 text-neutral-200">UV Index</p>
              <p className="pre-3 text-neutral-0">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
