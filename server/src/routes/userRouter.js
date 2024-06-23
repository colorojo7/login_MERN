import express from "express";
import { userController } from "../controllers/userController.js";
import passport from "passport";
import api from "../../../shared/api.directory.js";

const router = express.Router();


router.post(api.user.register.email , userController.registerEmail);    
router.post(api.user.register.user ,passport.authenticate("jwt",{session:false}), userController.registerUser);

router.post(api.user.login, userController.loginUser);
router.get(api.user.logverify, passport.authenticate("jwt", {session:false}),userController.virify_token)
router.get(api.user.logout, passport.authenticate("jwt", {session:false}),userController.logout)





export default router;
