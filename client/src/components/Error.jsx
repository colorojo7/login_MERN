import React from 'react';

const Error = ({ children }) => {
  return (
    <div className="border-2 border-red-300 bg-red-200 text-red-600 rounded-md p-2 font-semibold my-2">
         {children}
    </div>
  );
}

export default Error;
