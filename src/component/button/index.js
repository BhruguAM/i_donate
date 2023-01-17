import React from "react";

export const Button = ({ title, icon }) => {
  return (
    <button className={`bg-primary py-4 w-full rounded-md flex justify-center`}>
      <div className="flex ">
        <label className="font-semibold text-white text-base">{title}</label>
        {icon && (
          <img src={icon} className="h-6 w-6 object-contain ml-2" alt="icon" />
        )}
      </div>
    </button>
  );
};
