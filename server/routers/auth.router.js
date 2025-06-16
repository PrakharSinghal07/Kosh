import express from "express";
import {
  handleUserRegister,
  login,
  logout,
  verifyOTP,
  getUser,
  sendPasswordChangeOTP,
  verifyPasswordChangeOTP,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/getRegistrationOTP", handleUserRegister);
router.post("/verifyRegistrationOTP", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.post("/forgetPassOTP", isAuthenticated, sendPasswordChangeOTP);
router.post("/verifyForgetpassOTP", isAuthenticated, verifyPasswordChangeOTP);

export default router;
