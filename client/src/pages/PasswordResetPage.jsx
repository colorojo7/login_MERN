import React from "react";
import FrameForm from "../components/layouts/FrameForm";
import { Link, useSearchParams } from "react-router-dom";
import routes from "../../../shared/routes";
import logo_platform from '../../../shared/images/logos/logo_platform.svg'
import PasswordResetRequest from "../components/forms/PasswordResetRequest";
import PasswordReset from "../components/forms/PasswordReset";


const PasswordResetPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  return (
    <FrameForm  image={logo_platform}>
      {!token ? 
        <PasswordResetRequest/>
        :
        <PasswordReset/>
      }
      
    </FrameForm>
  );
};

export default PasswordResetPage;
