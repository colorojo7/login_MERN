import express from "express";
import passport from "passport";

import authController from "../controllers/authController.js";
import asyncHandler from "../middleware/asyncHandler.js";
import api from "../../../shared/api.directory.js";

const router = express.Router();

router.post(api.auth.login, asyncHandler(authController.login));

router.get(
  api.auth.refresh_auth,
  passport.authenticate("jwt", { session: false }),
  asyncHandler(authController.refresh_auth)
);
  
router.get(
  api.auth.logout,
  passport.authenticate("jwt", { session: false }),
  asyncHandler(authController.logout)
);

export default router;
