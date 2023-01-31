import React, { createContext, useContext, useState } from "react";
import { Modal } from "../component";

export const ModalContext = createContext(null);

export const ModalContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isOkay, setOkay] = useState(true);
  const [strict, setStrict] = useState(false);
  const [ModalContent, ModalData] = useState(() => <></>);

  const contextValue = {
    open,
    setOpen,
    isOkay,
    setOkay,
    ModalData,
    setStrict,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {open && (
        <Modal
          strict={strict}
          open={open}
          setOpen={setOpen}
          isOkay={isOkay}
          ModalContent={ModalContent}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
