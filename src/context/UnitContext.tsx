import React, { createContext, useContext, useState } from "react";
import type {ReactNode } from 'react'

interface UnitContextType {
  useMetric: boolean;
  toggleMetric: () => void;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [useMetric, setUseMetric] = useState<boolean>(true);

  const toggleMetric = () => {
    setUseMetric((prev) => (!prev));
  };

  return (
    <UnitContext.Provider value={{ useMetric, toggleMetric }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnitContext = (): UnitContextType => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error("useUnitContext must be used within a UnitProvider");
  }
  return context;
};
