import { TbReload } from "react-icons/tb";
import { AiOutlineStop } from "react-icons/ai";

interface ErrorProps {
  refetch: () => void;
  isRefetching: boolean;
}

export default function Error({ refetch, isRefetching }: ErrorProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <AiOutlineStop className="pre-3 text-neutral-0" />
        <p className="pre-2 text-neutral-0 text-center">Something went wrong.</p>
        <p className="pre-5-med text-neutral-200 text-center">
          We couldn't connect to the server (API Error). <br />
          Please try again in a few moments.
        </p>
        <button
          className="pre-7 text-neutral-0 flex items-center gap-2.5 py-3 px-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 "
          onClick={refetch}
          disabled={isRefetching}
        >
          {" "}
          <TbReload /> {  isRefetching ? "Retrying..." : "Retry"}
        </button>
      </div>
    </>
  );
}
