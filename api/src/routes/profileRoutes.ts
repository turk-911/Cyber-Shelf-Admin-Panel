import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { showProfilePicture, updateProfilePicture } from "../controllers/profileController";
const router = Router();
router.put("/update-profile-pic", verifyToken, updateProfilePicture);
router.post("/get-profile-picture", showProfilePicture);
export default router;