import React from "react";

export const Button = ({ title, icon, disabled, onClick, id }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary py-4 w-full rounded-md flex justify-center ${
        disabled && "pointer-events-none opacity-60"
      }`}
    >
      <div className="flex ">
        <label className="font-semibold text-white text-base cursor-pointer">
          {title}
        </label>
        {icon && (
          <img src={icon} className="h-6 w-6 object-contain ml-2" alt="icon" />
        )}
      </div>
    </button>
  );
};
