import React from "react";

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
}) => {
  if (type === "number") {
    return (
      <input
        inputmode="numeric"
        pattern={"[0-9]"}
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
      onChange={onChange}
    />
  );
};
