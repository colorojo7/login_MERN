import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore';
import routes from '../../../shared/routes';

const PublicRoute = ({ children }) => {
  const isLogged = useUserStore(state => state.isLogged)

  //if there is a Logged user navigate to the dashboard
  if (isLogged) {
    return <Navigate to={routes.dashboard.home} replace />
  }

  // if there is no Logged user will render the child component
  return children
}

export default PublicRoute