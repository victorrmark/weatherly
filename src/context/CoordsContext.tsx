import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Coordinates } from "../Types/Coordinates";

interface CoordsContextType {
  cityCoords: Coordinates | null;
  setCityCoords: React.Dispatch<React.SetStateAction<Coordinates | null>>;
}

const CoordsContext = createContext<CoordsContextType | undefined>(undefined);

export const CoordsProvider: React.FC<{ children: ReactNode; storageKey?: string }> = ({
  children,
  storageKey = "coords",
}) => {
  const [cityCoords, setCityCoords] = useState(() => {
    if (typeof window === "undefined") return null;
    const storedValue = window.localStorage.getItem(storageKey);

    return storedValue ? JSON.parse(storedValue) : null;
  });

    useEffect(() => {
      window.localStorage.setItem(storageKey, JSON.stringify(cityCoords));
    }, [cityCoords, storageKey]);

  return (
    <CoordsContext.Provider value={{ cityCoords, setCityCoords }}>
      {children}
    </CoordsContext.Provider>
  );
};

export const useCoordsContext = (): CoordsContextType => {
  const context = useContext(CoordsContext);
  if (!context) {
    throw new Error("useCoordsContext must be used within a CoordsProvider");
  }
  return context;
};
