import { NextFunction, Response } from "express";
import Upload from "../models/Upload";
import { createError } from "../utils/error";
import { AuthenticatedRequest } from "../utils/utils";
export const uploadFile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { driveLink, semester, year, subject } = req.body;
        if(!req.user) return next(createError(401, "User not authenticated"));
        const upload = new Upload({
            driveLink,
            semester,
            year,
            subject,
        });
        const savedUpload = await upload.save();
        req.user.uploads.push(savedUpload._id);
        await req.user.save();
        res.status(201).json({ message: "Upload successful", upload: upload });
    } catch (error) {
        next(error);
    }
}