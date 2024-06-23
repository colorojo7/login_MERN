import { create } from "zustand";
import { fetchGET, fetchPOST } from "../utils/fetchCustom.js";
import api from "../../../shared/api.directory.js";

export const useUserStore = create((set, get) => {
  return {
    //** VARIABLES **//
    isLogged: false,
    user: null,
  
    
    

    //** ACTIONS **//
    registerEmail: async (email) => {
      try {
        const data = await fetchPOST(api.user.register.email , {
          email: email,
        });
        if (data.error) {
          set({
            user:data
          })  
        }
        set({
           email:email,
           user:data
           });
          console.log("data en register email",data);
      } catch (error) {
        console.log("Error at registerEmail", error);
      }
    },

    registerUser: async (pin, email, password, name, DOB) => {
      try {
        const data = await fetchPOST(api.user.register.user , {
          pin: pin,
          email: email,
          password: password,
          name: name,
          DOB: DOB,
        });
        if(data.error){
          set({
            user:data
          })  
        }
        if (data.ok){
          set({
            isLogged:true,
            user: data.doc,
          });
        }
      
      } catch (error) {
        console.log("Error at registerUser", error);
      }
    },

    login: async (email, password) => {
      try {
        const data = await fetchPOST(api.user.login, {
          email: email,
          password: password,
        });
        console.log("userStore_logUser", data);

        if (data.error) {
          set({
            user:data
          })
        }
        if (data.ok) {
          console.log(data);
          set({
            isLogged: true,
            user: data.userData,
          });
        } else {
          throw Error("Somthing fail when seting the data");
        }
      } catch (error) {
        console.log(error);
      }
    },

    veryfyToken: async () => {
      try {
        const data = await fetchGET(api.user.logverify);
        if (data.ok) {
          const userData = await data.userData;
          set({
            isLogged: true,
            user: userData,
          });
        } else if (data.status === 401) {
          console.log("No valid cookie or token expired");
          set({
            isLogged: false,
            user: null,
          });
        } else {
          console.error("Verification failed:", data.message);
        }
      } catch (error) {
        throw Error("Somthing went wrong when running 'verifyToken'");
      }
    },

    logOut: async () => {
      try {
        const data = await fetchGET(api.user.logout);
        console.log("data", data);
        if (data.ok) {
          set({
            isLogged: false,
            user: null,
          });
        }
      } catch (error) {
        throw Error("Somthing went wrong when running 'logOut'");
      }
    },

    cleanUser: ()=>{
      set({
        user:null
      })  
    }
  };
});
