
 const routes = {

    landing: "/",
    login: "/login",
    register: {
      email: "/register/email",
      user:"/register/user"
    },
    reset_password: "/reset_password",
    dashboard: {
      home: "/dashboard",
      settings: "/dashboard/settings",
      shifts: "/dashboard/shifts",
      shift: (shiftId)=> shiftId ? `"/dashboard/shift/${shiftId}` : "/dashboard/shift/:sid",
      reports: "/dashboard/reports",
      
      admin: "/dashboard/admin" ,
     
    },
  };

  export default routes;
  