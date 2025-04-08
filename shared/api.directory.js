import {serverDomain} from './platformSettings.js'

const api = {
    API_HOST: serverDomain,

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
      reset_password:{
       request:"/api/user/reset_password/request",
       change:"/api/user/reset_password/change"
      },
    }

  }

  export default api
