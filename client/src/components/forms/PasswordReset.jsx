import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";


import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../Button.jsx";
import { Link } from "react-router-dom";
import routes from "../../../../shared/routes.js";
import Spinner from "../Spinner.jsx";
import api from "../../../../shared/api.directory.js";
import { fetchPOST } from "../../utils/fetchCustom.js";

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(false);
    const [submitBtnActive, setSubmitBtnActive] = useState(true);
    const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePasswordReset = async (data) => {
    setLoading(true);
    if(data.newPassword !== data.password_repeat){
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      
      const apiToReq= `${api.user.reset_password.change}?token=${token}`;
      
      const res = await fetchPOST(apiToReq, data);
 
       
      res.error && toast.error(res.message);
      res?.ok && toast.success(res.message);
      res?.ok && setSubmitBtnActive(false);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className={` font-bold mb-3 text-2xl text-center`}>Reset password</h1>

      <form onSubmit={handleSubmit(handlePasswordReset)}>
        <div className="flex flex-col gap-3">
          {/* <input
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
          )} */}

          <div className="flex flex-row gap-3">
            <input
              id="newPassword"
              name="newPassword"
              placeholder="New password"
              type={!showPassword ? "password" : "text"}
              className="input w-full"
              {...register("newPassword", {
                required: "Required",
              })}
            />
            

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="text-blue-500 py-2 w-6"
            >
              {!showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </div>
          </div>

          <input
              id="password_repeat"
              name="password_repeat"
              placeholder="repeat password"
              type={!showPassword ? "password" : "text"}
              className="input w-full"
              {...register("password_repeat", {
                required: "Required",
              })}
            />

        
          {errors.password && (
            <p className="text-red-500 text-xs ps-5">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <Button textCenter={true} className={`flex items-center ${!submitBtnActive && "hidden"}`}>{loading? <Spinner className="w-9 h-9 "/>: "Reset password" }</Button>
        </div>
        <div className="flex justify-center mt-4">
            <Link
              to={routes.login}
              className="text-blue-500 text-sm text-center"
            >
              Go to login
            </Link>
          </div>
      </form>
      <Toaster visibleToasts={1} richColors={true} />
  
  
    </div>
  );
};

export default PasswordReset;
