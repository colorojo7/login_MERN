import React from "react";

const Button = ({ type = "main", className, children, onClick, textCenter, ...props }) => {
  const generalButonStyle =
    `h-10 box-border  rounded-lg flex mt-4 w-full md:max-w-64 py-2 px-4 ${className}`;
  const filledButtons = "text-white font-bold";
  const outlinedButtons =
    "bg-transparent  hover:text-white hover:border-transparent";

  if (type === "main") {
    return (
      <button
        onClick={onClick}
        className={`  bg-orange-500 hover:bg-orange-600 ${generalButonStyle} ${filledButtons} `}
        {...props}
      >
        <div className={textCenter&&"w-full text-center"}>{children}</div>
      </button>
    );
  } else if (type === "danger") {
    return (
      <button
        onClick={onClick}
        className={` bg-red-600 hover:bg-red-700 ${generalButonStyle} ${filledButtons}`}
      >
        {children}
      </button>
    );
  } else if (type === "main-outlined") {
    return (
      <button
        onClick={onClick}
        className={` text-orange-500 font-semibold border border-orange-300 hover:bg-orange-500 ${generalButonStyle} ${outlinedButtons}`}
      >
        {children}
      </button>
    );
  } else if (type === "danger-outlined") {
    return (
      <button
        onClick={onClick}
        className={` text-red-500 font-semibold border border-red-300  hover:bg-red-500 ${generalButonStyle} ${outlinedButtons} `}
      >
        {children}
      </button>
    );
  }
};

export default Button;
