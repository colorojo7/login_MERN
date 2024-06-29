import { create } from "zustand";
import { fetchGET, fetchPOST } from "../utils/fetchCustom.js";
import api from "../../../shared/api.directory.js";

const useAuthStore = create((set, get) => {
  return {
    isLoged: false,
    access_token: null,
    user: null,

    //** ACTIONS **//
    login: async (email, password) => {
      try {
        const data = await fetchPOST(api.auth.login, {
          email,
          password,
        });
        if (data.error) {
          set({
            user: data,
          });
          
        }
        if (data.ok) {
          console.log(data);
          set({
            isLoged: true,
            user: data.userData,
          });
        } 
        return data
      } catch (error) {
        console.log(error);
      }
    },

    refresh_auth: async () => {
      try {
       
        const data = await fetchGET(api.auth.refresh_auth);
        console.log("recibiendo data en refreshauth", data);
        if (data.ok) {
          const userData = await data.userData;
          set({
            isLoged: true,
            user: userData,
          });
        } else if (data.status === 401) {
          console.log("UPS. No valid cookie or token expired");
          set({
            isLoged: false,
            user: null,
          });
        } else {
          console.error("Verification failed:", data.message);
        }
      } catch (error) {
        console.log("UPS Somthing went wrong when running 'refresh_auth'");
      }
    },

    logout: async () => {
      try {
        const data = await fetchGET(api.auth.logout);
        console.log("data", data);  
        if (data.ok) {
          set({
            isLoged: false,
            user: null,
          });
        }
      } catch (error) {
        throw Error("Somthing went wrong when running triyng to 'logout'");
      }
    },
  };
});

export default useAuthStore;
