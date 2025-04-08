import envConfigObject from "../config/dotenv.config.js";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";

import {
  createRandomNumber,
  createToken,
  removePassword,
} from "../utils/functions.js";
import { transport } from "../config/nodemailer.js";
import { createHash, data_VS_hashData } from "../utils/hashbcrypt.js";
import { res400, res500 } from "../utils/resposnses.js";
import validator from "validator";
import { logo_platform_URL } from "../../../shared/images/logos/logo_platform_URL.js";
import {
  platformName,
  bussinesWebsite,
} from "../../../shared/platformSettings.js";
import routes from "../../../shared/routes.js";
import api from "../../../shared/api.directory.js";

const registerEmail = async (req, res) => {
  //Registration step 1. Send a email with a PIN to proceed with the registerUser.
  //Email and the hashed pin will be save in a cookie to veryfy in the Registration step 2

  const { email } = req.body;
  try {
    if (!email) {
      return res400(res, "Please enter a email");
    }
    // verify if the email already exist in the DB
    const exist = await UserModel.findOne({ email: email });
    if (exist) {
      return res400(res, "This e-mail is already registered");
    }
    if (!validator.isEmail(email)) {
      return res400(res, "Email is not valid");
    }

    //create a 6 digit PIN hash it
    const randomPin = createRandomNumber(6).toString();
    const hashRandomPin = createHash(randomPin);

    const token = await createToken({ email: email, pin: hashRandomPin });

    await transport.sendMail({
      from: `${platformName} <mauro.leonardi87@gmail.com>`,
      to: email,
      subject: "Verify your email",
      html: `
           <div style="font-family: Arial, sans-serif; color: #34495e; line-height: 1.5;">
            <div style="width: 100%; display: flex; justify-content: center;">
                <div style="display: flex; align-items: flex-end; height: 80px; width: 80%; background-color: #ff7701; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                    <div style="color: white; font-size: 24px; font-weight: bold; width: 100%;">
                        <img src=${logo_platform_URL} alt="Platform Logo" style="height: 50px; margin-right: 10px; vertical-align: middle;"> 
                        <div>
                        ${platformName}
                        </div>
                    </div>
                </div>
            </div>

            <h2 style="color: #2c3e50; text-align: center;">
                Please verify your email
            </h2>

            <h3 style="color: red; text-align: center;">
                If you didn't make this request please ignore or delete this email
            </h3>

            <div style="width: 100%; display: flex; justify-content: center;">

                <div style="margin-bottom: 20px; background-color: rgb(254 249 195); border: 1px solid #ecc94b; border-radius: 10px; padding: 1rem; width: 80%; ">
                    <div style="margin-bottom: 10px; width: 100%; display: flex; justify-content: start">
                        <span style="width: 25%;">Email:</span>
                        <strong> ${email}</strong>
                    </div>

                    <div style="width: 100%; display: flex; justify-content: start;">
                        <span style="width: 25%; ">Pin:</span>
                        <strong>${randomPin}</strong>
                    </div>
                    <div style="background-color: rgb(230, 220, 150)">
                        <p style="text-align: center; margin-bottom: 0px;">complete the registration </p>
                        <p style="text-align: center; rgb(200, 180, 80); font-weight:bold; margin-top: 0px;">
                            USING SAME BROWSER <span></span>
                        </p>

                    </div>
                    <div style="width: 100%; display: flex; justify-content: center;">

                        <a href="${api.API_HOST}${routes.register.user}" style="display: inline-block; color: white; text-decoration: none; background-color: #ff7700; border-radius: 0.5rem; padding: 0.5rem 1rem; font-size: 14px; font-weight: bold; text-align: center; transition: background-color 0.3s ease-in-out;"
                            class="h-10 box-border rounded-lg flex mt-4 w-full md:max-w-64 py-2 px-4 bg-orange-500 hover:bg-orange-600">
                Finish your registration here
              </a>

                    </div>
                </div>

            </div>

            <div style="text-align: center; margin-top: 20px;">
                <a href=${bussinesWebsite} style="color: #3498db; text-decoration: none;">
              <img src=${logo_platform_URL} alt="Login Demo" style="height: 50px; margin-right: 10px; vertical-align: middle;">
            </a>
            </div>
        </div>
            `,
    });

    res
      .status(200)
      .cookie(envConfigObject.registrationCookie, token, {
        maxAge: 1000 * 60 * 60 * 2,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        ok: true,
        message: `PIN sended to your e-mail`,
        doc: { email: email },
      });
  } catch (error) {
    res.status(500).json({ error: "Somthing went wrong. Please try again" });
  }
};

const registerUser = async (req, res) => {
  //Registration step 2. The user will be ask for the PIN and email plus Password and rest of the data required.
  const { pin, email, password, name, last_name, DOB } = req.body;
  try {
    //get the email and hashed pin out of the cookie
    const registerToken = req.cookies[envConfigObject.registrationCookie];
    const tokenData = jwt.verify(
      registerToken,
      envConfigObject.accessTokenSecret
    );
    //verify if pin register is the same as the sended to the email
    const validPin = data_VS_hashData(pin, tokenData.pin);
    if (!validPin) {
      return res400(res, "PIN Incorrect");
    }

    if (email !== tokenData.email) {
      return res400(res, "Use the registered email");
    }
    const user = await UserModel.register(
      email,
      password,
      name,
      last_name,
      DOB
    );
    if (user.error) {
      return res400(res, user.error);
    }
    const userData = removePassword(user._doc);
    res
      .status(200)
      .clearCookie(envConfigObject.registrationCookie, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })

      .json({
        ok: true,
        message: "User created successfully",
        doc: userData,
      });
  } catch (error) {
    return res500(res, error, "Somthing went wrong. Please try again");
  }
};

const requestPasswordReset = async (req, res) => {
  
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      return res400(res, "There isn't any user with that email");
    }
    const resetToken = jwt.sign(
      { id: user._id },
      envConfigObject.passwordRecoverTokenSecret,
      { expiresIn: "1h" }
    );
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hr
    await user.save();
    // Enviar email con enlace de recuperación
    const resetLink = `${api.API_HOST}${routes.reset_password}?token=${resetToken}`;
  
    await transport.sendMail({
      from: `${platformName} <mauro.leonardi87@gmail.com>`,
      to: email,
      subject: "Password reset Request",
      html: `
             <div style="font-family: Arial, sans-serif; color: #34495e; line-height: 1.5;">
              <div style="width: 100%; display: flex; justify-content: center;">
                  <div style="display: flex; align-items: flex-end; height: 80px; width: 80%; background-color: #ff7701; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                      <div style="color: white; font-size: 24px; font-weight: bold; width: 100%;">
                          <img src=${logo_platform_URL} alt="Platform Logo" style="height: 50px; margin-right: 10px; vertical-align: middle;"> 
                          <div>
                          ${platformName}
                          </div>
                      </div>
                  </div>
              </div>
  
              <h2 style="color: #2c3e50; text-align: center;">
                  Password reset request
              </h2>
  
              <h3 style="color: red; text-align: center;">
                  If you didn't make this request please ignore or delete this email
              </h3>
  
              <div style="width: 100%; display: flex; justify-content: center;">
  
                  <div style="margin-bottom: 20px; background-color: rgb(254 249 195); border: 1px solid #ecc94b; border-radius: 10px; padding: 1rem; width: 80%; ">
                      <div style="margin-bottom: 10px; width: 100%; display: flex; justify-content: start">
                          <span style="width: 25%;">Email:</span>
                          <strong> ${email}</strong>
                      </div>
  
                      <div style="width: 100%; display: flex; justify-content: start;">
                          <div style="width: 100%; display: flex; justify-content: center;">
  
                              <a href="${api.API_HOST}${routes.reset_password}?token=${resetToken}" style="display: inline-block; color: white; text-decoration: none; background-color: #ff7700; border-radius: 0.5rem; padding: 0.5rem 1rem; font-size: 14px; font-weight: bold; text-align: center; transition: background-color 0.3s ease-in-out;"
                                  class="h-10 box-border rounded-lg flex mt-4 w-full md:max-w-64 py-2 px-4 bg-orange-500 hover:bg-orange-600">
                                Click here to reset your password
                              </a>
  
                          </div>
                      </div>
                      <div style="background-color: rgb(230, 220, 150)">
                          <p style="text-align: center; margin-bottom: 0px;">if link doesn't work paste this url in your browser </p>
                          <p style="text-align: center; rgb(200, 180, 80); font-weight:bold; margin-top: 0px;">
                             ${resetLink} <span></span>
                          </p>
  
                      </div>
                      
                  </div>
  
              </div>
  
              <div style="text-align: center; margin-top: 20px;">
                  <a href=${bussinesWebsite} style="color: #3498db; text-decoration: none;">
                <img src=${logo_platform_URL} alt="Login Demo" style="height: 50px; margin-right: 10px; vertical-align: middle;">
              </a>
              </div>
          </div>
              `,
    });
  
      res
      .status(200)
      .json({
        ok: true,
        message: `Password recover link sended to your e-mail`,
        doc: { email: email },
      });
  
  } catch (error) {
    return res500(res, error, "Somthing went wrong. Please try again");
    
  }
};

const resetPassword = async (req, res) => {
 
 
  try {
    const {  newPassword } = req.body;
    const { token } = req.query;
    
    if (!token) {
      return res400(res, "Invalid or missing token");
    }

    try {
      // Verificar el token
      
      const decoded = jwt.verify(token, envConfigObject.passwordRecoverTokenSecret);
      const user = await UserModel.findById(decoded.id);
      
      if (!user || user.resetPasswordToken !== token || user.resetPasswordExpires < Date.now()) {
        
          return res400(res, "Invalid or expired token"  );
      }

      // Actualizar la contraseña
      const hash = await UserModel.checkPasswordStrength_andHash(newPassword)

      if (hash.error){
        
        return res400(res, hash.error)
      }
      user.password = hash;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      await transport.sendMail({
        from: `${platformName} <mauro.leonardi87@gmail.com>`,
        to: user.email,
        subject: "Password reset Notification",
        html: `
               <div style="font-family: Arial, sans-serif; color: #34495e; line-height: 1.5;">
                <div style="width: 100%; display: flex; justify-content: center;">
                    <div style="display: flex; align-items: flex-end; height: 80px; width: 80%; background-color: #ff7701; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                        <div style="color: white; font-size: 24px; font-weight: bold; width: 100%;">
                            <img src=${logo_platform_URL} alt="Platform Logo" style="height: 50px; margin-right: 10px; vertical-align: middle;"> 
                            <div>
                            ${platformName}
                            </div>
                        </div>
                    </div>
                </div>
    
                <h2 style="color: #2c3e50; text-align: center;">
                    Password reset successfully
                </h2>
    
                <h3 style="color: red; text-align: center;">
                    If you didn't make this reset please contact us
                </h3>
    
                <div style="width: 100%; display: flex; justify-content: center;">
    
                    <div style="margin-bottom: 20px; background-color: rgb(254 249 195); border: 1px solid #ecc94b; border-radius: 10px; padding: 1rem; width: 80%; ">
                        <div style="margin-bottom: 10px; width: 100%; display: flex; justify-content: start">
                            <span style="width: 25%;">Email:</span>
                            <strong> ${user.email}</strong>
                        </div>
    
                        <div style="width: 100%; display: flex; justify-content: start;">
                            <div style="width: 100%; display: flex; justify-content: center;">
    
                                <a href="${api.API_HOST}${routes.login}" style="display: inline-block; color: white; text-decoration: none; background-color: #ff7700; border-radius: 0.5rem; padding: 0.5rem 1rem; font-size: 14px; font-weight: bold; text-align: center; transition: background-color 0.3s ease-in-out;"
                                    class="h-10 box-border rounded-lg flex mt-4 w-full md:max-w-64 py-2 px-4 bg-orange-500 hover:bg-orange-600">
                                  Click here to login
                                </a>
    
                            </div>
                        </div>
                      
                        
                    </div>
    
                </div>
    
                <div style="text-align: center; margin-top: 20px;">
                    <a href=${bussinesWebsite} style="color: #3498db; text-decoration: none;">
                  <img src=${logo_platform_URL} alt="Login Demo" style="height: 50px; margin-right: 10px; vertical-align: middle;">
                </a>
                </div>
            </div>
                `,
      });
    
      res
      .status(200)
      .json({
        ok: true,
        message: `Password reset successful`,
        doc: { user: user },
      });
      
    


  } catch (error) {
      res.status(400).json({ message: "Somthing went wrong. Please try again" });
  }
    
  } catch (error) {
    return res500(res, error, "Somthing went wrong. Please try again");
  }
};

const userController = {
  registerEmail,
  registerUser,
  requestPasswordReset,
  resetPassword,
};

export default userController;
