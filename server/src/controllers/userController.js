import envConfigObject from "../config/dotenv.config.js";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";

import {
  createRandomNumber,
  createToken,
  removePassword,
} from "../utils/functions.js";
import { transport } from "../config/nodemailer.js";
import { createHash, data_VS_hashData} from "../utils/hashbcrypt.js";
import { res400, res500 } from "../utils/resposnses.js";

const oneWeek = 1000 * 60 * 60 * 24 * 7;

class userManager {
  async registerEmail(req, res) {
    //Registration step 1. Send a email with a PIN to proceed with the registerUser.
    //Email and the hashed pin will be save in a cookie to veryfy in the Registration step 2

    const { email } = req.body;
    try {   
      if (!email) {
        return  res400(res,"Please enter a email" )
      }
      // verify if the email already exist in the DB
      const exist = await UserModel.findOne({ email: email });
      if (exist) {
        return res400(res,"This e-mail is already registered" )
      } 

      //create a 6 digit PIN hash it
      const randomPin = createRandomNumber(6).toString();
      const hashRandomPin = createHash(randomPin);
      const token = await createToken({ email: email, pin: hashRandomPin });

      await transport.sendMail({
        from: "LABOUR CONNECT <mauro.leonardi87@gmail.com>",
        to: email,
        subject: "Verify your email",
        html: `
           <div style="font-family: Arial, sans-serif; color: #34495e; line-height: 1.5;">
            <div style="width: 100%; display: flex; justify-content: center;">
                <div style="display: flex; align-items: flex-end; height: 80px; width: 80%; background-color: #ff7701; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
                    <div style="color: white; font-size: 24px; font-weight: bold; width: 100%;">
                        <img src="https://www.labourconnect.com.au/wp-content/uploads/2024/01/Screen-Shot-2024-04-20-at-9.57.24-pm.png" alt="Labour Connect" style="height: 50px; margin-right: 10px; vertical-align: middle;"> 
                        <div>
                        PLATFORM
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

                        <a href="http://localhost:5173/register/user" style="display: inline-block; color: white; text-decoration: none; background-color: #ff7700; border-radius: 0.5rem; padding: 0.5rem 1rem; font-size: 14px; font-weight: bold; text-align: center; transition: background-color 0.3s ease-in-out;"
                            class="h-10 box-border rounded-lg flex mt-4 w-full md:max-w-64 py-2 px-4 bg-orange-500 hover:bg-orange-600">
                Finish your registration here
              </a>

                    </div>
                </div>

            </div>

            <div style="text-align: center; margin-top: 20px;">
                <a href="https://www.labourconnect.com.au" style="color: #3498db; text-decoration: none;">
              <img src="https://www.labourconnect.com.au/wp-content/uploads/2024/01/Screen-Shot-2024-04-20-at-9.57.24-pm.png" alt="Labour Connect" style="height: 50px; margin-right: 10px; vertical-align: middle;">
            </a>
            </div>
        </div>
            `,
      });

      res
        .status(200)
        .cookie(envConfigObject.cookie_user, token, {
          maxAge: 1000 * 60 * 60 * 2,
          httpOnly: true,
        })
        .json({
          ok: true,
          
          message: `e-mail sended successfully`,
          doc:{email:email}
        });
    } catch (error) {
      res.status(500).json({ error: "Somthing went wrong. Please try again" });
    }
  }

  async registerUser(req, res) {
    //Registration step 2. The user will be ask for the PIN and email plus Password and rest of the data required.
    const {pin, email,  password, name, DOB } = req.body;
    console.log(pin, email,  password, name, DOB );

    try {
      //get the email and hashed pin out of the cookie
      console.log("entrando al try");
      const registerToken = req.cookies[envConfigObject.cookie_user];
      console.log("despues de registerToken");
      const tokenData = jwt.verify(registerToken, envConfigObject.secret_word); 
      console.log("despues de tokenData");
      //verify if pin register is the same as the sended to the email
      const validPin = data_VS_hashData(pin, tokenData.pin)
      console.log("despues de validPin", validPin);
      if(!validPin){
        console.log("dentro del if validPin");
        return res400(res,"Icorrect PIN")
        //res.status(400).json({ error: "Incorrect PIN"});
      }

      if(email !== tokenData.email){
        return res400(res,"Make sure to use the registered email")
        //res.status(400).json({ error: "Make sure to use the registered email"});
      }
      console.log("Antes del UserModel.register");
      const user = await UserModel.register(email, password, name, DOB);
      console.log("user",user);
      if(user.error){
        console.log("dentro de user.error");
        return res400(res, user.error)
      }
      const userData = removePassword(user._doc)
      const token = await createToken(userData);
      const doc = {pin, email, name, DOB }
      res
        .status(200)
        .cookie(envConfigObject.cookie_user, token, {maxAge:oneWeek, httpOnly:true} )
        .json({
          ok: true,
          message:"User created successfully",
          doc: doc,
        })
    } catch (error) {
      return res500(res,error,"Somthing went wrong. Please try again")
      //res.status(500).json( { error: "Somthing went wrong. Please try again" } );
    }
  }

  async loginUser(req, res) {
    //Login. Using the login method of the UserModel,
    //if is all OK we remove the password from the user objet create a token with the rest of the userData and save it in a cookie.
    //it route return the userData.
    const { email, password } = req.body;

    try {
      const user = await UserModel.login(email, password);
      const userData = removePassword(user._doc);
      const token = await createToken(userData);

      res
        .status(200)
        .cookie(envConfigObject.cookie_user, token, {
          maxAge: oneWeek,
          httpOnly: true,
        })
        .json({
          ok: true,
          
          userData,
        });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async virify_token(req, res) {
    // Function to be use at the top of the front end to verify if there is valid cookie and if it is sign the user.
    //it route return the userData.
    try {
      const token = req.cookies[envConfigObject.cookie_user];
      const tokenData = jwt.verify(token, envConfigObject.secret_word);
      if(!tokenData._id){
        return 
      }
      const uid = tokenData._id;
      const user = await UserModel.findById(uid);
      const userData = removePassword(user._doc);

      res.status(200).json({
        ok: true,
        userData,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      const cookie = await req.cookies[envConfigObject.cookie_user];
      if (cookie) {
        res
          .clearCookie("shiftTrakerCookie", { httpOnly: true, sameSite: "lax" })
          .json({ ok: true, message: "loged Out succesfully" });
      } else {
        throw Error("we couldnt find the cokie to delete");
      }
    } catch (error) {
      throw Error("somthing fail when deleting the cookie");
    }
  }
}

export const userController = new userManager();
