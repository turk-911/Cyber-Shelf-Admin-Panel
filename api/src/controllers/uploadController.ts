import { NextFunction, Request, Response } from "express";
import Upload from "../models/Upload";
import { createError } from "../utils/error";
export const addFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { driveLink, semester, year, subject } = req.body;
        const newUpload = new Upload({ driveLink, semester, year, subject });
        const savedUpload = await newUpload.save();
        res.status(201).json(savedUpload);
        return;
    } catch (error) {
        return next(error);
    }
}
export const deleteFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedUpload = await Upload.findByIdAndDelete(id);
        if(!deletedUpload) return next(createError(404, "File not found"));
        res.status(200).json({ message: "File deleted successfully" });
        return;
    } catch (error) {
        return next(error);
    }
}