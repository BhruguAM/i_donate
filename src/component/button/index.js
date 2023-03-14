import React from "react";

export const Button = ({
  title,
  icon,
  disabled,
  onClick,
  id,
  secondary,
  extraClass,
  white,
}) => {
  let backgroundColor = white
    ? "bg-primaryBg"
    : secondary
    ? "bg-gray-300"
    : "bg-primary";

  let buttonText = white
    ? "text-primary"
    : secondary
    ? "text-slate-700"
    : "text-white";

  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={`${backgroundColor} py-4 w-full rounded-xl ${
        disabled ? "pointer-events-none opacity-60" : "shadow-xl"
      } flex justify-center active:scale-95 ${extraClass || ""}`}
    >
      <div className="flex">
        <label
          className={`z-0 font-semibold text-base cursor-pointer ${buttonText}`}
        >
          {title}
        </label>
        {icon && (
          <img src={icon} className="h-6 w-6 object-contain ml-2" alt="i" />
        )}
      </div>
    </button>
  );
};
