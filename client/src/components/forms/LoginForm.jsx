import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../store/userStore.js";

import Button from "../Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Error from "../Error.jsx";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const logUser = useUserStore((state) => state.login);
  const user = useUserStore((state) => state.user);

  const handleLogin = (data) => {
    try {
      logUser(data.email, data.password);
    } catch (error) {
      console.log(error);
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
          {errors.email && <p className="text-red-500 text-xs ps-5">{errors.email.message}</p>}

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
          {errors.password && <p className="text-red-500 text-xs ps-5">{errors.password.message}</p>}
        </div>
        {user?.error && <Error>{user.error}</Error>}
        <div className="flex justify-center">
          <Button textCenter={true}>Login</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
