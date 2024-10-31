import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { updateProfilePicture } from "../controllers/profileController";
const router = Router();
router.put("/update-profile-pic", verifyToken, updateProfilePicture);
export default router;