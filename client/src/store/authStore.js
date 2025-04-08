import { create } from "zustand";
import { fetchGET, fetchPOST } from "../utils/fetchCustom.js";
import api from "../../../shared/api.directory.js";
import { toast } from "sonner";

const useAuthStore = create((set, get) => {
  return {
    isLoged: false,
    user: null,
    access_token: null,
    
   

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
          set({
            isLoged: true,
            user: data.userData,
          });
        } 
        return data
      } catch (error) {
        toast.error("UPS. Somthing went wrong when tring to login. Try again")
      }
    },

    refresh_auth: async () => {
      try {
       
        const data = await fetchGET(api.auth.refresh_auth);
        if (data.ok) {
          const userData = await data.userData;
          set({
            isLoged: true,
            user: userData,
          });
        } else if (data.status === 401) {
          set({
            isLoged: false,
            user: null,
          });
        } else {
          toast.error("Verification failed:", data.message);
        }
      } catch (error) {
        toast.error("UPS. Somthing went wrong when refreshing your login.")
      }
    },

    logout: async () => {
      try {
        const data = await fetchGET(api.auth.logout);
        if (data.ok) {
          set({
            isLoged: false,
            user: null,
          });
        }
      } catch (error) {
        toast.error("Somthing went wrong when running triyng to 'logout'")
        throw Error("Somthing went wrong when running triyng to 'logout'");
      }
    },
  };
});

export default useAuthStore;
