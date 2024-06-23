import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navigation/NavBar";

const DashboardLayout = ({ children }) => {
  return (
  
    <div className={`flex h-screen flex-col md:flex-row md:overflow-hidden`}>
      <div className="w-full flex-none md:w-64">
        <NavBar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
        <Outlet/>
      </div>
    </div>
  );
};

export default DashboardLayout;
