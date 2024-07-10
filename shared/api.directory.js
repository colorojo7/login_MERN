const api = {

    auth:{
      login:"/api/auth/login",
      logout:"/api/auth/logout",
      refresh_auth: "/api/auth/refresh_auth"
    },

    user:{
      _:"/api/user",

      register:{
        email: "/api/user/register/email",
        user: "/api/user/register/user"
      },
    }

  }

  export default api
