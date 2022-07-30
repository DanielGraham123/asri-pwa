import React, { useContext, createContext, useState } from "react";

const TopLoadingContext = createContext({
  topLoading: false,
  setTopLoading: null,
  complete: false,
  setComplete: null,
});

export const TopLoadingProvider = ({ children }) => {
  const [topLoading, setTopLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  return (
    <TopLoadingContext.Provider
      value={{ topLoading, setTopLoading, complete, setComplete }}
    >
      {children}
    </TopLoadingContext.Provider>
  );
};

export const useTopLoader = () => useContext(TopLoadingContext);
