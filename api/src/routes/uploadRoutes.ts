import { Router } from "express";
import { addFile, deleteFile } from "../controllers/uploadController";
const router = Router();
router.post("/add", addFile);
router.delete("/delete/:id", deleteFile);
export default router;