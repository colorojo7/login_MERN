import React from "react";
import NavLinks from "./NavLinks";
import {PowerIcon} from "@heroicons/react/24/outline"
import useAuthStore from "../../store/authStore";
import logo_platform from '../../../../shared/images/logos/logo_platform.svg'

const NavBar = () => {
  const logout = useAuthStore(state=>state.logout)
  const user = useAuthStore(state=>state.user)

  const handleLogOut = () => {
    logout()
    window.location.reload();
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex flex-col gap-2 h-20 items-starts justify-center rounded-md bg-main-5 p-3 md:h-40">
          <img className="w-1/3 h-2/3  md:w-full rounded-md md:flex" src={logo_platform} alt="Bussines Logo" /> 

        <div className="hidden md:flex text-white font-black">
          {user? user.name: "USER NAME HERE"}
        
          </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button
          onClick={handleLogOut}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
