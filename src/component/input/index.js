import React from "react";

export const InputText = ({
  name,
  type,
  value,
  onChange,
  extraclassName = "",
}) => {
  return (
    <input
      name={name}
      className={`border-b border-gray-300 text-sm text-greyout mt-4 pb-2 w-full focus:border-primary ${extraclassName}`}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
