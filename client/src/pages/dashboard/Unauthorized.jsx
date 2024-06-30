import React from "react";
import Button from "../../components/Button";
import {  useNavigate } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex justify-center mt-10">
          <ExclamationTriangleIcon className="w-16 text-orange-700" />
        </div>
        <div className="flex flex-wrap h-36 w-full items-end rounded-lg bg-main-4 p-3 ">
          <div className="w-full text-white font-black text-3xl text-center ">
            UNAUTHORIZED
          </div>
          <div className="w-full text-white text-center ">
            This page is protected.
          </div>
        </div>
        <Button type="main-outlined" onClick={goBack}>
          <p>Go Back</p>
        </Button>
      </div>
    </main>
  );
};

export default Unauthorized;
