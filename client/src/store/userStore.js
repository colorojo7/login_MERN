import { create } from "zustand";
import { fetchPOST } from "../utils/fetchCustom.js";
import api from "../../../shared/api.directory.js";
import { toast } from "sonner";

export const useUserStore = create((set, get) => {
  return {
    //** VARIABLES **//
    registerEmailResponse:null,
    registerUserResponse:null,
  
    
    //** ACTIONS **//
    registerEmail: async (email) => {
      try {
        const data = await fetchPOST(api.user.register.email , {
          email,
        });
        if (data.error) {
          set({
            registerEmailResponse:data
          })  
        }
        set({
           email:email,
           registerEmailResponse:data
           });
        return data
      } catch (error) {
        toast.error("UPS. Somthing went wrong when registering your email. Try agin")
      }
    },

    registerUser: async (pin, email, password, name, last_name, DOB) => {
      try {
        const data = await fetchPOST(api.user.register.user , {
          pin,
          email,
          password,
          name,
          last_name,
          DOB,
        });
        if(data.error){
          set({
            registerUserResponse:data
          })  
        }
        if (data.ok){
          set({
            //isLogged:true,
            registerUserResponse: data,
          });
        }
        return data
      
      } catch (error) {
        toast.error("UPS. Somthing went wrong when registering your email. Try agin")
      }
    },

    Clear_registerEmailResponse: ()=>{
        set({
            registerEmailResponse:null
          })  
    },


  };
});
