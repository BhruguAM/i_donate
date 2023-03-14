import React from "react";
import IcBack from "../../assets/icons/ic-back.svg";

import { useLocation, useNavigate } from "react-router-dom";
import { useHeaderContext, useModalContext } from "../../context";
import { RemovePayment } from "../removePayment";
import { InputText } from "../input";

export const Header = ({ auth = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { headerTitle, isBack, isMainHeader, searchBar } = useHeaderContext();
  const { setOpen, setOkay, ModalData } = useModalContext();

  const backFromPayment = () => {
    ModalData(
      <RemovePayment
        setOkay={setOkay}
        setOpen={setOpen}
        state={location.state}
        navigate={navigate}
      />
    );
    setOkay(false);
    setOpen(true);
  };

  return (
    <header
      className={`${isMainHeader ? "h-28" : "h-16"} min-w-full ${
        auth ? "bg-transparent" : "bg-primary"
      } flex justify-between items-center px-5 top-0 z-30 fixed`}
    >
      {searchBar && (
        <div className="h-12 w-full left-0 self-center absolute -bottom-6 flex items-center justify-center">
          {searchBar}
        </div>
      )}
      {!isMainHeader && (
        <div className="flex flex-1">
          {isBack ? (
            <div
              className="cursor-pointer"
              onClick={() =>
                location.pathname === "/payment"
                  ? backFromPayment()
                  : navigate(-1)
              }
            >
              <img src={IcBack} className="h-5 w-5 object-contain" alt="back" />
            </div>
          ) : (
            <div className="flex"> </div>
          )}
        </div>
      )}
      <div
        className={`font-semibold text-white ${
          isMainHeader ? "text-4xl" : "text-xl"
        } flex items-center justify-center flex-2`}
      >
        {headerTitle}
      </div>
      <div className="flex justify-end flex-1"></div>
    </header>
  );
};
