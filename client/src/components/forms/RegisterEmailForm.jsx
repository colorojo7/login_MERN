import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserStore } from "../../store/userStore.js";

import Button from "../Button";
import Error from "../Error.jsx";
import Success from "../Success.jsx";
import Spinner from "../Spinner.jsx";
import routes from "../../../../shared/routes.js";

const RegisterEmailForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //const [email, setEmail] = useState("");
  const registerEmail = useUserStore((state) => state.registerEmail);
  const user = useUserStore((state) => state.user);
  const cleanUser = useUserStore((state) => state.cleanUser);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerEmail(data.email);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

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
          IMPORTANT. Use the same browser
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
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

        {user?.error && <Error>{user.message}</Error>}

        {user?.ok ? (
          <Success className="flex flex-row justify-between">
            <div>{user.message}</div>
            <Link
              onClick={() => cleanUser()}
              to={routes.register.user}
              className=" border rounded-lg px-2 border-green-300 hover:bg-green-500 bg-transparent  hover:text-green-800 hover:border-transparent"
            >
              Finish 
            </Link>
          </Success>
        ) : (
          <div className="flex justify-center">
            <Button
              textCenter={true}
              className={isLoading && "cursor-not-allowed"}
            >
              {isLoading ? <Spinner /> : "Register e-mail"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterEmailForm;
