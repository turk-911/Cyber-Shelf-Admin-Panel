import { NextFunction, Response } from "express";
import Upload from "../models/Upload";
import { createError } from "../utils/error";
import { AuthenticatedRequest } from "../utils/utils";
export const uploadFile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { driveLink, semester, year, subject, userEmail } = req.body;
        if (!req.user) return next(createError(401, "User not authenticated"));
        const upload = new Upload({
            driveLink,
            semester,
            year,
            subject,
            userEmail,
        });
        const savedUpload = await upload.save();
        req.user.uploads.push(savedUpload._id);
        await req.user.save();
        res.status(201).json({ message: "Upload successful", upload: upload });
    } catch (error) {
        next(error);
    }
}
export const getAllFiles = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { userEmail } = req.params;
        if (!userEmail) return next(createError(400, "Not authorized"));
        const uploadedFiles = await Upload.find({ userEmail: userEmail }).exec();
        if (!uploadedFiles) res.status(201).json({ message: "Returning an empty array", data: [] });
        res.status(201).json({ message: "Displaying the files", uploadedFiles: uploadedFiles });
    } catch (error) {
        console.error("Error getting files: ", error);
        next(error);
    }
}