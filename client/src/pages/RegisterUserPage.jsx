import React from "react";
import FrameForm from "../components/layouts/FrameForm";
import { Link } from "react-router-dom";
import routes from "../../../shared/routes";
import RegisterUserForm from "../components/forms/RegisterUserForm";
import logo_platform from '../../../shared/images/logos/logo_platform.svg'


const RegisterUserPage = () => {
  return (
    <FrameForm title="" image={logo_platform}>
      <RegisterUserForm/>
      <p>
        have an account alredy?
        <Link to={routes.login} className="underline text-center text-blue-600">
          {" "}
          Login
        </Link>
      </p>
    </FrameForm>
  );
};

export default RegisterUserPage;
