import React from "react";

export const InputText = ({
  name,
  type,
  value,
  onChange,
  extraclassName = "",
  onFocus,
  onBlur,
}) => {
  return (
    <input
      onFocus={onFocus}
      onBlur={onBlur}
      name={name}
      className={`border-b border-gray-300 text-sm text-greyout mt-3 pb-2 w-full focus:border-primary ${extraclassName}`}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
