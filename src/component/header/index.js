import React from "react";
import IcBack from "../../assets/icons/ic-back.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeaderContext } from "../../context";

export const Header = () => {
  const navigate = useNavigate();
  const { headerTitle, isBack } = useHeaderContext();
  return (
    <header className="h-16 min-w-full bg-primary flex justify-between items-center px-4 top-0 z-30 absolute">
      <div className="flex flex-1">
        {isBack && (
          <div onClick={() => navigate(-1)}>
            <img src={IcBack} className="h-5 w-5 object-contain" alt="back" />
          </div>
        )}
      </div>
      <div className="font-semibold text-white text-xl flex flex-1 items-center justify-center">
        {headerTitle}
      </div>
      <div className="flex flex-1"></div>
    </header>
  );
};
