import { create } from "zustand";
import { fetchGET, fetchPOST } from "../utils/fetchCustom.js";
import api from "../../../shared/api.directory.js";
import useAuthStore from "./authStore.js";

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
        console.log("Error at registerUser", error);
      }
    },

    Clear_registerEmailResponse: ()=>{
        set({
            registerEmailResponse:null
          })  
    },


  };
});
