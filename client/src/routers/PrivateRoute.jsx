import React from "react";
import { Navigate } from "react-router-dom";
import routes from "../../../shared/routes";
import useAuthStore from "../store/authStore";

const PrivateRoute = ({  children }) => {
  const isLoged = useAuthStore(state => state.isLoged)

  // if is not logged send the user to login
  if (!isLoged) {
    return <Navigate to={routes.login} replace />;
  }

  //   // if the role dont match send the user to dashboard.home,
  // if (role && !hasRole(role)) {
  //   return <Navigate to={routes.dashboard.home} replace />;
  // }
 

  // if the user is austenticated render the child components
  return children;
};

export default PrivateRoute;
