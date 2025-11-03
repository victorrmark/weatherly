import { useFavoriteContext } from "../context/FavoriteContext";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import FavoriteWeatherView from "../Components/FavoriteWeatherView";

export default function Favorites() {
  const { favorites, setFavorites, clearFavorites } = useFavoriteContext();
  const [openIndex, setOpenIndex] = useState<number | null>(null);


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
              <FavoriteWeatherView
                key={idx}
                city={ city}
                isOpen={openIndex === idx}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                setFavorites={setFavorites}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
