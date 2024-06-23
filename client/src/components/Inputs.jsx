import React from "react";

const Input = ({ type, fullName, ...props }) => {
  return (
    <input
      type={type}
      id={fullName}
      name={fullName}
      placeholder={fullName}
      className="block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
      {...props}
      
    />
  );
};

const Select = ({ options, fullName, children, ...props }) => {
  return (
    <select
      defaultValue=""
      id={fullName}
      name={fullName}
      className="block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
      {...props}
    >
      <option value="" disabled  hidden>
        Choose one
      </option>
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.display}
        </option>
      ))}
      {children}
    </select>
  );
};

export { Input, Select };
