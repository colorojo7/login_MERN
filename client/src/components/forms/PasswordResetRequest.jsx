import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

import useAuthStore from "../../store/authStore.js";

import Button from "../Button.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "../../../../shared/routes.js";
import { fetchPOST } from "../../utils/fetchCustom.js";
import api from "../../../../shared/api.directory.js";
import Spinner from "../Spinner.jsx";

const PasswordResetRequest = () => {
  const [submitBtnActive, setSubmitBtnActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePasswordResetRequest = async (data) => {
    setLoading(true);
    
    try {
      const res = await fetchPOST(api.user.reset_password.request, data);
      
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
      <h1 className={` font-bold mb-3 text-2xl text-center`}>Reset your password</h1>

      <form onSubmit={handleSubmit(handlePasswordResetRequest)}>
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
          <Button textCenter={true} className={`flex items-center ${!submitBtnActive && "hidden"}`}>{loading? <Spinner className="w-9 h-9 "/>: "Reset password" }</Button>
        </div>
          {!submitBtnActive && (
            <div className="flex justify-center mt-4">
              <p className="text-green-500 text-sm text-center">
                Check your email for the reset link.
              </p>
            </div>
          )}

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

export default PasswordResetRequest;
