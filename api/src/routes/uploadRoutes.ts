import { Router } from "express";
import { getAllFiles, uploadFile } from "../controllers/uploadController";
import { verifyToken } from "../middleware/verifyToken";
const router = Router();
router.post("/add", verifyToken, uploadFile);
router.get("/get-all-files/:email", verifyToken, getAllFiles);
export default router;