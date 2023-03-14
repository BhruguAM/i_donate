import React from "react";
import { useLocation } from "react-router-dom";

export const InputText = ({
  name,
  type,
  value,
  onChange,
  extraClassName = "",
  onFocus,
  onBlur,
  id,
  placeholder = "",
  maxLength = 50,
  minLength = 0,
  isError = false,
  containerClass = "",
  autoComplete = "on",
}) => {
  const location = useLocation();
  if (type === "number") {
    return (
      <div
        className={`flex flex-col w-full relative ${
          location.pathname.includes("auth") ? "bg-primaryBg" : "bg-primaryCard"
        } ${containerClass}`}
      >
        <input
          autoComplete={autoComplete}
          maxLength={parseInt(maxLength)}
          minLength={minLength}
          inputMode="numeric"
          pattern={"[0-9]*"}
          placeholder={placeholder}
          id={id}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          className={`border-b ${
            isError ? "border-red-700" : "border-gray-300"
          } text-sm text-black pb-2 w-full ${
            isError ? "focus:border-red-700" : "focus:border-lineColor"
          } ${extraClassName} ${isError && "animate-pulse_finite"} ${
            location.pathname.includes("auth")
              ? "bg-primaryBg"
              : "bg-primaryCard"
          }`}
          type={"tel"}
          value={value}
          onChange={onChange}
        />
        {isError && (
          <label className="text-xs absolute -bottom-4 text-red-700 z-10">
            {isError}
          </label>
        )}
      </div>
    );
  }
  if (type === "date") {
    return (
      <div
        className={`flex flex-col w-full relative ${
          location.pathname.includes("auth") ? "bg-primaryBg" : "bg-primaryCard"
        }`}
      >
        <input
          // id={id}
          autoComplete={autoComplete}
          id="startDate"
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          className={`border-b ${
            isError ? "border-red-700" : "border-gray-300"
          } text-sm text-black pb-2 w-full ${
            isError ? "focus:border-red-700" : "focus:border-lineColor"
          } ${extraClassName} ${isError && "animate-pulse_finite"} ${
            location.pathname.includes("auth")
              ? "bg-primaryBg"
              : "bg-primaryCard"
          }`}
          type={type}
          value={value}
          onChange={onChange}
        />
        {isError && (
          <label className="text-xs absolute -bottom-4 text-red-700 z-10">
            {isError}
          </label>
        )}
      </div>
    );
  }
  if (type === "email") {
    return (
      <div
        className={`flex flex-col w-full relative ${
          location.pathname.includes("auth") ? "bg-primaryBg" : "bg-primaryCard"
        }`}
      >
        <input
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          id={id}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          className={`border-b ${
            isError ? "border-red-700" : "border-gray-300"
          } text-sm text-black pb-2 w-full ${
            isError ? "focus:border-red-700" : "focus:border-lineColor"
          } ${extraClassName} ${isError && "animate-pulse_finite"} ${
            location.pathname.includes("auth")
              ? "bg-primaryBg"
              : "bg-primaryCard"
          }`}
          type={type}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {isError && (
          <label className="text-xs absolute -bottom-4 text-red-700 z-10">
            {isError}
          </label>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={`flex flex-col w-full relative ${
          location.pathname.includes("auth") ? "bg-primaryBg" : "bg-primaryCard"
        }`}
      >
        <input
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          id={id}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          className={`border-b ${
            isError ? "border-red-700" : "border-gray-300"
          } text-sm text-black pb-2 w-full ${
            isError ? "focus:border-red-700" : "focus:border-lineColor"
          } ${extraClassName} ${isError && "animate-pulse_finite"} ${
            location.pathname.includes("auth")
              ? "bg-primaryBg"
              : "bg-primaryCard"
          }`}
          type={type}
          value={value}
          onChange={onChange}
        />
        {isError && (
          <label className="text-xs absolute -bottom-4 text-red-700 z-10">
            {isError}
          </label>
        )}
      </div>
    );
  }
};
