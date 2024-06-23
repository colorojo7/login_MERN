import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import routes from "../../../shared/routes";

const PrivateRoute = ({  children }) => {
  const isLogged = useUserStore(state => state.isLogged)

  // if is not logged send the user to login
  if (!isLogged) {
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
