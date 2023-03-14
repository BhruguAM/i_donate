import React, { createContext, useContext, useState } from "react";

export const HeaderContext = createContext(null);

export const HeaderContextProvider = ({ children }) => {
  const [headerTitle, setHeader] = useState("iDonate");
  const [isBack, setIsBack] = useState(false);
  const [isMainHeader, setMainHeader] = useState(false);
  const [someData, setSomeData] = useState();
  const [searchBar, setSearchBar] = useState(false);

  const contextValue = {
    headerTitle,
    setHeader,
    setIsBack,
    isBack,
    someData,
    setSomeData,
    isMainHeader,
    setMainHeader,
    searchBar,
    setSearchBar,
  };

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
