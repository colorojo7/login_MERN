import React from "react";

const Frame = ({ children, className="", classNameBox="" }) => {
  return (
    <div className={`w-full min-w-80 md:basis-1/3 grow ${className}`}>
      <div
        className={`box-border m-3 min-h-40 gap-2 justify-center rounded-md bg-slate-100 p-3 flex flex-col ${classNameBox}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Frame;
