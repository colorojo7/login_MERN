import React, { useState } from "react";
import Button from "../Button";
import Label from "../Label";
import Error from "../Error";
import { states } from "../../helpers/optionsArrays";
import { useUserStore } from "../../store/userStore";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import Success from "../Success";

const RegisterUserForm = () => {
  const registerUser = useUserStore((state) => state.registerUser);
  const user = useUserStore((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    if (data.password !== data.repeat_password) {
      return setError("Your passwords don't match");
    }
    await registerUser(
      data.pin,
      data.email,
      data.password,
      data.name,
      data.DOB
    );
  };

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

          {/* <div>
            <Label htmlFor="adress" text="where do you live?" />
            <Input fullName="adress" placeholder="Unit 0, 999 Street" />
            <Input fullName="city" placeholder="Location" />
            <div className="flex">
              <Select
                options={states}
                fullName="state"
                placeholder="choose one"
              />
              <Input fullName="post code" />
            </div>
          </div> */}
        </div>

        {error && <Error> {error}</Error>}
        {user?.error && <Error>{user.message}</Error>}
        {user?.ok && <Success>{user.message}</Success>}
        <div className="flex justify-center">
          <Button textCenter={true}>Register</Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUserForm;
