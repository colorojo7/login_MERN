import express from "express";
import userController  from "../controllers/userController.js";
import passport from "passport";
import api from "../../../shared/api.directory.js";

const router = express.Router();

router.post(api.user.register.email , userController.registerEmail);    
router.post(api.user.register.user ,passport.authenticate("jwt",{session:false}), userController.registerUser);

router.route("/")
    .get()
    .patch()
    .delete()







export default router;
