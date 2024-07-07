import envConfigObject from "../config/dotenv.config.js";
import jwt from "jsonwebtoken";

import { createToken, removePassword } from "../utils/tools.js";
import UserModel from "../models/user.model.js";
import { res400 } from "../utils/resposnses.js";

const authCookie = {
  httpOnly: true,
  secure: envConfigObject.mode === 'production' ? true: false,
  sameSite: "Strict",
}

const login = async (req, res) => {
  //Login. Using the login method of the UserModel,
  //if is all OK we remove the password from the user objet create a token with the rest of the userData and save it in a cookie.
  const { email, password } = req.body;
  const user = await UserModel.login(email, password);
  if (user.error) {
    return res400(res, user.error);
  }
  const userData = removePassword(user._doc);
  const token = await createToken(userData);      

  res
    .status(200)
    .cookie(envConfigObject.authCookie, token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, //one week
      ...authCookie
    })
    .json({
      ok: true,
      userData,
    });
};

const refresh_auth = async (req, res) => {
  // Function to be use at the top of the front end to verify if there is valid cookie and if it is sign the user.
  //it route return the userData.
  try {
    const token = req.cookies[envConfigObject.authCookie];
    const tokenData = jwt.verify(token, envConfigObject.accessTokenSecret);
    if (!tokenData._id) {
      return;
    }
    const user = await UserModel.findById(tokenData._id);
    const userData = removePassword(user._doc);
    res.status(200).json({
      ok: true,
      userData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  const cookie = await req.cookies[envConfigObject.authCookie];
  if (cookie) {
    res
      .status(200)
      .clearCookie(envConfigObject.authCookie, {
        ...authCookie
      })
      .json({ ok: true, message: "loged Out succesfully" });
  } else {
    res.status(400).json({ ok: false, message: "Somthing failed when loging out" });
  }
};

const authController = { login, refresh_auth, logout };

export default authController;
