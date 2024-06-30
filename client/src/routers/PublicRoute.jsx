import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../../../shared/routes";
import useAuthStore from "../store/authStore";

const PublicRoute = ({ children }) => {
  const isLoged = useAuthStore((state) => state.isLoged);

  return !isLoged 
    ? <Outlet /> 
    : <Navigate to={routes.dashboard.home} />;
};

export default PublicRoute;
