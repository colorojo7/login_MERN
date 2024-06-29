import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

import { useUserStore } from "../../store/userStore";
import { states } from "../../helpers/optionsArrays";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import Label from "../Label";
import Error from "../Error";
import Success from "../Success";
import { Link } from "react-router-dom";
import routes from "../../../../shared/routes";

const RegisterUserForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const registerUser = useUserStore((state) => state.registerUser);
  const registerUserResponse = useUserStore((state) => state.registerUserResponse);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    if (data.password !== data.repeat_password) {
      return  toast.error("Your passwords don't match");
    }
    const res = await registerUser(
      data.pin,
      data.email,
      data.password,
      data.name,
      data.DOB
    );
    console.log(res);
    res?.error && toast.error(res.message);
    res?.ok && toast.success(res.message);
  };

  // useEffect(() => {
  //   errors && toast.error("Complete all required fields")
  //   paswordsError && toast.error(paswordsError)
  //   registerUserResponse?.error && toast.error(registerUserResponse.message);
  //   registerUserResponse?.ok && toast.success(registerUserResponse.message);
  // }, [registerUserResponse, errors, paswordsError]);

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className={` font-bold mb-3 text-2xl text-center`}>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-1 border border-yellow-500 rounded-lg bg-yellow-200">
            <input
              id="pin"
              name="pin"
              placeholder="pin"
              type="number"
              className="input w-1/3"
              {...register("pin", {
                required: "Required",
              })}
            />

            <p className="ps-4">Find the PIN in your registerd email</p>
          </div>
          <div>
            <Label htmlFor="email" />
            <input
              id="email"
              name="email"
              placeholder="email"
              type="email"
              className="input w-full"
              {...register("email", {
                required: "Required",
              })}
            />
           
          </div>
          <div>
            <Label htmlFor="password" />
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
          </div>
          <div className="flex flex-row gap-3">
            <input
              id="repeat_password"
              name="repeat_password"
              placeholder="repeat_password"
              type={!showPassword ? "password" : "text"}
              className="input w-full"
              {...register("repeat_password", {
                required: "Required",
              })}
            />
          </div>

          <div>
            <Label htmlFor="name" />
            <input
              id="name"
              name="name"
              placeholder="name"
              type="text"
              className="input w-full"
              {...register("name", {
                required: "Required",
              })}
            />
          </div>

          <div>
            <Label text="date of birth" htmlFor="DOB" />
            <input
              id="DOB"
              name="DOB"
              placeholder="DOB"
              type="date"
              className="input w-full"
              {...register("DOB", {
                required: "Required",
              })}
            />
          </div>

        </div>


        <div className="flex justify-center">
          {!registerUserResponse?.ok?
            <Button textCenter={true} >Register</Button>
            :
            <Link to={routes.login}>
               <Button textCenter={true} >Go to login</Button>
            </Link>
          }
        </div>
      </form>
      <Toaster visibleToasts={1} richColors={true} />

    </div>
  );
};

export default RegisterUserForm;
