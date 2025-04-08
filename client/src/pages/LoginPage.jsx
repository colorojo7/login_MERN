import React from "react";
import FrameForm from "../components/layouts/FrameForm";
import LoginForm from "../components/forms/LoginForm";
import { Link } from "react-router-dom";
import routes from "../../../shared/routes";
import logo_platform from '../../../shared/images/logos/logo_platform.svg'


const LoginPage = () => {
  return (
    <FrameForm  image={logo_platform}>
      
      <LoginForm />
      
    </FrameForm>
  );
};

export default LoginPage;
