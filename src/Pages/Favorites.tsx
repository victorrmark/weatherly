import { useFavoriteContext } from "../context/FavoriteContext";
import { FaStar } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { isSameLocation } from "../utils/favoritesCheck";
import type { Coordinates } from "../Types/Coordinates";

export default function Favorites() {
  const { favorites, setFavorites, clearFavorites } = useFavoriteContext();

  const deleteFavorite = (data: Coordinates) => {
    const clicked = { city: data.city, country: data.country };
    setFavorites((prev) =>
      prev.filter((fave) => !isSameLocation(fave, clicked))
    );
  };

  return (
    <>
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 w-full  mt-12 lg:mt-16 pt-16">
          <div className="w-24 h-24 flex items-center justify-center bg-neutral-800 -rotate-6 mb-6">
            <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center -rotate-6">
              <FaStar className="text-neutral-800 text-4xl rotate-12 m-2" />
            </div>
          </div>
          <h2 className="pre-2 text-neutral-0 w-full text-center">
            No favorites
          </h2>
          <p className="pre-7 text-neutral-400 text-center max-w-96 ">
            You can add some cities to your favorites to see them here by
            clicking the "star icon".
          </p>
          <Link to="/">
            <button className="pre-6 text-neutral-0 rounded-lg bg-blue-500 py-2.5 px-4">
              Go back
            </button>
          </Link>
        </div>
      ) : (
        <div className="mt-12 lg:mt-16">
          <div className="flex justify-between items-center mb-8">
            <p className="font-bold font-bricolage text-2xl text-neutral-0">
              Your Favorite Locations
            </p>
            <button
              className="bg-red-500 hover:bg-red-600 py-2.5 px-4 rounded-lg text-neutral-0 pre-7"
              onClick={clearFavorites}
            >
              Clear Favorites
            </button>
          </div>

          <div className="flex gap-3 flex-col">
            {favorites.map((city, idx) => (
              <div
                key={idx}
                className="py-2 px-6 bg-neutral-800 hover:bg-neutral-700 rounded-xl "
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="pre-5 text-neutral-0 leading-none">
                      {city.city}, {city.country}
                    </p>
                    <p className="pre-7 text-neutral-400 leading-none">
                      {city.city}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteFavorite(city)}
                    className="hover:bg-red-400 p-1 rounded-full hover:opacity-50 transition-all duration-200"
                  >
                    <RiDeleteBinLine className="text-red-800 text-xl " />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
