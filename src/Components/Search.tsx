import SearchIcon from "../assets/icon-search.svg";

export default function Search() {
  return (
    <form className="flex flex-col w-full gap-4 sm:flex-row justify-center mb-8 lg:mb-12">
      <div className="relative w-full max-w-xl sm:flex-initial">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <img src={SearchIcon} alt="Search Icon" />
        </div>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="block w-full rounded-xl py-4 pl-14 pr-6 text-neutral-0 
          placeholder:pre-5-med placeholder:text-neutral-200 truncate bg-neutral-800 hover:bg-neutral-700"
          placeholder="Search for a place"
          id="search"
          // onChange={(e) => {
          //   handleSearch(e.target.value);
          // }}
          // defaultValue={searchParams.get("query") || ""}
        />
      </div>
      <button className="py-4 px-6 pre-5-med text-neutral-0 rounded-xl bg-blue-500 w-full sm:w-auto hover:bg-blue-700">Search</button>
    </form>
  );
}
