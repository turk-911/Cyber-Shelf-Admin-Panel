import { Router } from "express";
import { login, register, verifyOtpAndRegister } from "../controllers/authController";
const router = Router();
router.post("/login", login);
router.post("/register", register);
router.post("/verify-otp", verifyOtpAndRegister);
export default router;