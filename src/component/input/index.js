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
}) => {
  if (type === "number") {
    return (
      <input
        inputmode="numeric"
        pattern={"[0-9]"}
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
