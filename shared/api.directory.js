const api = {
    auth:{
      login:"api/auth/login",
      logout:"api/auth/logout",
      refresh_auth: "api/auth/refresh_auth"
    },


    user:{
      _:"api/user",
      register:{
        email: "api/user/register/email",
        user: "api/user/register/user"
      },
      login:"api/user/login",
      logout:"api/user/logout",
      logverify: "api/user/logverify"
    }

  }

  export default api
