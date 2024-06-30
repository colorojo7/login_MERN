import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

import useAuthStore from "../../store/authStore.js";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import SupportedBrowsers from "../SuppsortedBrowsers.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "../../../../shared/routes.js";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || routes.dashboard.home

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
          const res = await login(data.email, data.password);
          res.error &&toast.error(res.message);
          res?.ok && toast.success(res.message);
          navigate(from, {replace:true})
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className={` font-bold mb-3 text-2xl text-center`}>Login</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
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

          <div className="flex flex-row gap-3">
            <input
              id="password"
              name="password"
              placeholder="password"
              type={!showPassword ? "password" : "text"}
              className="input w-full"
              {...register("password", {
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
          {errors.password && (
            <p className="text-red-500 text-xs ps-5">{errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          <Button textCenter={true}>Login</Button>
        </div>
      </form>
      <SupportedBrowsers/>
      <Toaster visibleToasts={1} richColors={true} />
    </div>
  );
};

export default LoginForm;
