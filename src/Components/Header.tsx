import Logo from "../assets/logo.svg";
import UnitsIcon from "../assets/icon-units.svg";
import DropdownIcon from "../assets/icon-dropdown.svg";
import { useState, useRef, useEffect } from "react";
import { FaCheck } from 'react-icons/fa';
import { useUnitContext } from "../context/UnitContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { useMetric, toggleMetric } = useUnitContext();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (eMouseEvent: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(eMouseEvent.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex justify-between items-center w-full ">
      <img src={Logo} alt="Weather Now Logo" />

      <div className="relative">
        <button
          className="py-2 px-2.5 sm:py-3 sm:px-4 pre-8 sm:pre-7 bg-neutral-800 hover:bg-neutral-700 
            text-neutral-0 rounded-md flex items-center gap-1.5 sm:gap-2.5"
            onClick={()=>setIsOpen(!isOpen)}
        >
          <img src={UnitsIcon} alt="Units Icon" />
          Units
          <img src={DropdownIcon} alt="Dropdown Icon" />
        </button>
        {isOpen && (
          <div
            ref={menuRef}
            className="absolute top-[50px] z-40 right-0 rounded-xl px-2 py-1.5 bg-neutral-800 border border-neutral-700 w-60 h-auto flex flex-col gap-2"
          >
            <button className="pre-7 text-left rounded-xl border-spacing-1 text-neutral-0 py-2.5 px-2 hover:bg-neutral-700 focus:bg-neutral-700 focus:border focus:border-neutral-0"
            onClick={toggleMetric}>
              {useMetric ? "Switch to Imperial" : "Switch to Metric"}
            </button>
            <div className="border-b border-neutral-600 pb-1">
              <p className="pre-8 text-neutral-300 mb-2">Temperature</p>
              <div className={`flex justify-between items-center py-2.5 px-2 rounded-lg text-neutral-0 ${useMetric ? "bg-neutral-700" : ""}`}>
                <p className="pre-7">Celsius (°C)</p>
                <FaCheck className={useMetric ? "text-neutral-0" : "text-neutral-800"} />
              </div>
              <div className={`flex justify-between items-center py-2.5 px-2 rounded-lg text-neutral-0 ${!useMetric ? "bg-neutral-700" : ""}`}>
                <p className="pre-7">Fahrenheit (°F)</p>
                <FaCheck className={!useMetric ? "text-neutral-0" : "text-neutral-800"} />
              </div>
            </div>

            <div className="border-b border-neutral-600 pb-1 pt-2">
              <p className="pre-8 text-neutral-300 mb-2">Wind Speed</p>
              <div className={`flex justify-between items-center py-2.5 px-2 rounded-lg text-neutral-0 ${useMetric ? "bg-neutral-700" : ""}`}>
                <p className="pre-7">km/h</p>
                <FaCheck className={useMetric ? "text-neutral-0" : "text-neutral-800"} />
              </div>
              <div className={`flex justify-between items-center py-2.5 px-2 rounded-lg text-neutral-0 ${!useMetric ? "bg-neutral-700" : ""}`}>
                <p className="pre-7">mph</p>
                <FaCheck className={!useMetric ? "text-neutral-0" : "text-neutral-800"} />
              </div>
            </div>

            <div className="pb-1 pt-2">
              <p className="pre-8 text-neutral-300 mb-2">Precipitation</p>
              <div className={`flex justify-between items-center py-2.5 px-2 rounded-lg text-neutral-0 ${useMetric ? "bg-neutral-700" : ""}`}>
                <p className="pre-7">Millimeters (mm)</p>
                <FaCheck className={useMetric ? "text-neutral-0" : "text-neutral-800"} />
              </div>
              <div className={`flex justify-between items-center py-2.5 px-2 rounded-lg text-neutral-0 ${!useMetric ? "bg-neutral-700" : ""}`}>
                <p className="pre-7">Inches (in)</p>
                <FaCheck className={!useMetric ? "text-neutral-0" : "text-neutral-800"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
