import DropdownIcon from "../assets/icon-dropdown.svg";

export default function LoadingSkeleton() {
  const conditions = ["Feels Like", "Humidity", "Wind", "Precipitation"];

  return (
    <div className="w-full flex flex-col xl:flex-row gap-8 h-full items-stretch ">
      <div className="flex-1">
        <div className="flex flex-col gap-8">
          <div className="h-[286px] w-full bg-neutral-800 rounded-3xl flex items-center justify-center flex-col animate-pulse">
            <div className="flex items-end space-x-1">
              <div className="w-2 h-2 bg-neutral-0 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-neutral-0 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-neutral-0 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
            <p className="pre-6 text-neutral-0">Loading</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 mb-3.5 lg:mb-6">
            {conditions.map((condition) => (
              <div className="weather-card animate-pulse" key={condition}>
                <p className="pre-6 text-neutral-200">{condition}</p>
                <p className="pre-3 text-neutral-0">--</p>
              </div>
            ))}
          </div>
        </div>

        <div className=" flex flex-col gap-2 w-full ">
          <p className="pre-5 text-neutral-0">Daily Forecast</p>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-3.5  w-full ">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                className="h-24 bg-neutral-800 rounded-xl animate-pulse "
                key={index}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col py-5 px-4 gap-4 bg-neutral-800 rounded-3xl max-h-[46.88rem] w-full xl:w-[350px] xl:self-stretch animate-pulse">
        <div className="flex items-center justify-between">
          <p className="pre-5 text-neutral-0">Hourly Forecast</p>
          <div className="py-2 px-4 bg-neutral-600 animate-pulse flex gap-3 items-center justify-center rounded-lg">
            <p className="pre-7 text-neutral-0">-</p>
            <img src={DropdownIcon} alt="Dropdown Icon" />
          </div>
        </div>
        {Array.from({ length: 7 }).map((_, idx) => (
          <div
            className="h-14 w-full bg-neutral-700 rounded-xl animate-pulse border border-neutral-600 "
            key={idx}
          ></div>
        ))}
      </div>
    </div>
  );
}
