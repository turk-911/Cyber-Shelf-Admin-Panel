import { Router } from "express";
import { uploadFile } from "../controllers/uploadController";
import { verifyToken } from "../middleware/verifyToken";
const router = Router();
router.post("/add", verifyToken, uploadFile);
export default router;