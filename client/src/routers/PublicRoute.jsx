import React from 'react'
import { Navigate } from 'react-router-dom'
import routes from '../../../shared/routes';
import useAuthStore from '../store/authStore';

const PublicRoute = ({ children }) => {
  const isLoged = useAuthStore(state => state.isLoged)
  console.log(isLoged);
  //if there is a Logged user navigate to the dashboard
  if (isLoged) {
    return <Navigate to={routes.dashboard.home} replace />
  }

  // if there is no Logged user will render the child component
  return children
}

export default PublicRoute