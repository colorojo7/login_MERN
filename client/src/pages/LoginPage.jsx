import React from "react";
import FrameForm from "../components/layouts/FrameForm";
import LoginForm from "../components/forms/LoginForm";
import { Link } from "react-router-dom";
import routes from "../../../shared/routes";

const LoginPage = () => {
  return (
    <FrameForm title="LABOUR CONNECT">
      
      <LoginForm />
      <p>
        Don't have an account?
        <Link
          to={routes.register.email}
          className="underline text-center text-blue-600"
        >
          {" "}
          Register
        </Link>
      </p>
    </FrameForm>
  );
};

export default LoginPage;
