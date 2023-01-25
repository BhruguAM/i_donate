import React, { createContext, useContext, useState } from "react";

export const HeaderContext = createContext(null);

export const HeaderContextProvider = ({ children }) => {
  const [headerTitle, setHeader] = useState("iDonate");
  const [isBack, setIsBack] = useState(false);

  const contextValue = {
    headerTitle,
    setHeader,
    setIsBack,
    isBack,
  };

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
