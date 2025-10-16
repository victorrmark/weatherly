import Logo from "../assets/logo.svg";
import UnitsIcon from "../assets/icon-units.svg";
import DropdownIcon from "../assets/icon-dropdown.svg";
import { TbReload } from "react-icons/tb";
import { AiOutlineStop } from "react-icons/ai";

export default function Error({ refetch }) {
  return (
    <>
      <div className="flex justify-between items-center w-full mb-16">
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

      <div className="flex flex-col items-center gap-6">
        <AiOutlineStop className="pre-3 text-neutral-0" />
        <p className="pre-2 text-neutral-0">Something went wrong.</p>
        <p className="pre-5-med text-neutral-200 text-center">
          We couldn't connect to the server (API Error). <br />
          Please try again in a few moments.
        </p>
        <button
          className="pre-7 text-neutral-0 flex items-center gap-2.5 py-3 px-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 "
          onClick={refetch}
        >
          {" "}
          <TbReload /> Retry
        </button>
      </div>
    </>
  );
}
