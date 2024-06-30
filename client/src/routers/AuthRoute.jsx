import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuthStore from "../store/authStore"
import routes from "../../../shared/routes"
import { ROLES } from "../../../shared/roles"

const AuthRoute = ({ allowedRoles=[ROLES.worker] }) => {
    const user = useAuthStore(state=>state.user)
    const location = useLocation()
    
  return (
    user?.role?.find(role => allowedRoles?.includes(role) ) //=> to be use in case the user.role is an array with 1 or more roles.
    ?   <Outlet/>
    :   user
        ?   <Navigate to="/unauthorized" state={{from:location}} replace/> 
        :   <Navigate to={routes.login} state={{from:location}} replace/>

  )
}

export default AuthRoute 