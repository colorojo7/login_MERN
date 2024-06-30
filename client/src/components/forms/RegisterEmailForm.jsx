import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

import { useUserStore } from "../../store/userStore.js";
import routes from "../../../../shared/routes.js";

import Button from "../Button";
import Spinner from "../Spinner.jsx";
import SupportedBrowsers from "../SuppsortedBrowsers.jsx";


const RegisterEmailForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //const [email, setEmail] = useState("");
  const registerEmail = useUserStore((state) => state.registerEmail);
  const registerEmailResponse = useUserStore( (state) => state.registerEmailResponse );
  const Clear_registerEmailResponse = useUserStore( (state) => state.Clear_registerEmailResponse );

  

  const onSubmit = async (data) => {
    setIsLoading(true);
    try { 
      const res = await registerEmail(data.email);
      res?.error && toast.error(res.message);
      res?.ok && toast.success(res.message);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    return Clear_registerEmailResponse()
  },[])


  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className={` font-bold mb-3 text-2xl text-center`}>
        Register your e-mail
      </h1>
      <div className="border border-slate-400 rounded-lg bg-yellow-100 p-1 text-xs">
        <strong>Steps</strong>
        <div>1- Register your email and recive a PIN</div>
        <div>2- Use the PIN to create your account</div>
        <div className="text-center font-bold">
          IMPORTANT. Use one of the supported browser
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 mb-2">
        <div className="flex flex-col gap-3">
          <input
            id="email"
            name="email"
            placeholder="email"
            type="email"
            className="input"
            {...register("email", {
              required: "Required",
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs ps-5">{errors.email.message}</p>
          )}
        </div>


        <div className="flex justify-center">
          <Button
            textCenter={true}
            className={`${isLoading && "cursor-not-allowed disabled"} ${registerEmailResponse?.ok && "hidden"}`}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Register e-mail"}
          </Button>


          {registerEmailResponse?.ok&&
              <Link to={routes.register.user}>
                <Button
                  textCenter={true}
                >
                    Complete registration
                </Button>
              </Link>
          }
        </div>
      </form >
      <Toaster visibleToasts={1} richColors={true} />
      <SupportedBrowsers/>
    </div>
  );
};

export default RegisterEmailForm;
