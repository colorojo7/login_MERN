import React from 'react';

const Success = ({ children,className, ...props }) => {
  return (
    <div 
    className={`border-2 border-green-300 bg-green-200 text-green-600 rounded-md p-2 font-semibold my-2 ${className}`} {...props}>
         {children}
    </div>
  );
}

export default Success;
