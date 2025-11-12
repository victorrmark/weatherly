import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface FavoriteContextType {
  favorites: Array<{ lat:number; lon:number; town?: string; state?: string; city: string ; country: string  }>;
  setFavorites: React.Dispatch<React.SetStateAction<Array<{ lat:number; lon:number; town?: string; state?: string; city: string ; country: string  }>>>;
  clearFavorites: () => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState(() => {
    const storedValue = window.localStorage.getItem("favorite");

    return  storedValue ? JSON.parse(storedValue) : [];
  });

    useEffect(() => {
      window.localStorage.setItem("favorite", JSON.stringify(favorites));
    }, [favorites]);

    const clearFavorites = () => {  
      window.localStorage.removeItem("favorite");
      setFavorites([]);
    }

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites, clearFavorites }}>
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
