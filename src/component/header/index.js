import React from "react";
import IcBack from "../../assets/icons/ic-back.svg";
export const Header = () => {
  return (
    <header className="h-16 min-w-full bg-primary flex justify-between items-center px-4">
      <div className="flex flex-1">
        <img src={IcBack} className="h-5 w-5 object-contain" alt="back" />
      </div>
      <div className="font-semibold text-white text-xl flex flex-1 items-center justify-center">
        Donation
      </div>
      <div className="flex flex-1"></div>
    </header>
  );
};
