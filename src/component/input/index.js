import React from "react";

const date = `${new Date().getFullYear() - 18}-${
  (new Date().getMonth() + 1).toString().length === 1
    ? "0" + (new Date().getMonth() + 1).toString()
    : new Date().getMonth() + 1
}-${
  new Date().getDate().toString().length === 1
    ? "0" + new Date().getDate().toString()
    : new Date.getDate()
} `;
export const InputText = ({
  name,
  type,
  value,
  onChange,
  extraclassName = "",
  onFocus,
  onBlur,
  id,
  placeholder = "",
  maxLength = 100,
  minLength = 0,
}) => {
  if (type === "number") {
    return (
      <input
        maxLength={maxLength}
        minLength={minLength}
        inputmode="numeric"
        pattern={"[0-9]*"}
        placeholder={placeholder}
        id={id}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        className={`border-b border-gray-300 text-sm text-greyout pb-2 w-full focus:border-primary ${extraclassName}`}
        type={type}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (type === "date") {
    return (
      <input
        id={id}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        className={`border-b border-gray-300 text-sm text-greyout pb-2 w-full focus:border-primary ${extraclassName}`}
        type={type}
        value={value}
        max={date.trim()}
        onChange={onChange}
      />
    );
  }
  return (
    <input
      maxLength={maxLength}
      minLength={minLength}
      id={id}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      name={name}
      className={`border-b border-gray-300 text-sm text-greyout pb-2 w-full focus:border-primary ${extraclassName}`}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
