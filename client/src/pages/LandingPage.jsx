import React from "react";
import FrameForm from "../components/layouts/FrameForm";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import routes from "../../../shared/routes";

const LandingPage = () => {
  return (
    <FrameForm title="LABOUR CONNECT">
      <h1 className=" text-center text-3xl font-black">PLATFORM</h1>
      <Button type="main-outlined">
        <Link to={routes.login} className=" text-center">
          {" "}
          Go to login
        </Link>
      </Button>
    </FrameForm>
  );
};

export default LandingPage;
