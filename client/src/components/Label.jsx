import React from "react";

const Label = ({text, htmlFor, ...props}) => {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
        {text ? text : htmlFor}
    </label>
  );
};

export default Label;
