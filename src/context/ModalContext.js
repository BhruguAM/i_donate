import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Lottie from "lottie-web";
import AnimatedData from "../assets/lottie/Loading_arrow.json";
import { Modal } from "../component";

export const ModalContext = createContext(null);

export const ModalContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [isOkay, setOkay] = useState(true);
  const [ModalContent, ModalData] = useState(() => <></>);

  const contextValue = {
    open,
    setOpen,
    isOkay,
    setOkay,
    ModalData,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {open && (
        <Modal
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
