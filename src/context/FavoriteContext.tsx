import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface FavoriteContextType {
  favorites: Array<{ lat:number; lon:number; name: string ; country: string  }>;
  setFavorites: React.Dispatch<React.SetStateAction<Array<{ lat:number; lon:number; name: string ; country: string }>>>;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState(() => {
    const storedValue = window.localStorage.getItem("favorite");

    return  JSON.parse(storedValue) || [];
  });

    useEffect(() => {
      window.localStorage.setItem("favorite", JSON.stringify(favorites));
    }, [favorites]);

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavoriteContext must be used within a FavoriteProvider");
  }
  return context;
};
