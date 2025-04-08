import React from "react";
import FrameForm from "../components/layouts/FrameForm";
import { Link } from "react-router-dom";
import RegisterEmailForm from "../components/forms/RegisterEmailForm";
import routes from "../../../shared/routes.js";
import logo_platform from '../../../shared/images/logos/logo_platform.svg'

const RegisterEmailPage = () => {
  return (
    <FrameForm title="" image={logo_platform}>
      <RegisterEmailForm/>
      <p>
        Have an account alredy?
        <Link to={routes.login} className="underline text-center text-blue-600">
          {" "}
          Login
        </Link>
      </p>
      <p>
        Got your PIN ready?
        <Link to={routes.register.user} className="underline text-center text-blue-600">
          {" "}
          Finish registration
        </Link>
      </p>
    </FrameForm>
  );
};

export default RegisterEmailPage;
