import express from "express";
import {
  contactUSController,
  forgotPasswordController,
  loginController,
  registerController,
  updateController,
  verifyOtp,
  verifyTokenController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

//Register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

//Verify-email
router.post("/verify-email", verifyTokenController);

//Verify-OTP
router.post("/verify-otp", verifyOtp);

//Forgot Password
router.post("/forgot-password", forgotPasswordController);

//Contact
router.post("/contactus", contactUSController);

//Contact
router.put("/update", updateController);

//Protected User route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected Admin route
router.get("/admin-auth", requireSignIn, isAdmin , (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
