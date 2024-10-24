import jwt from "jsonwebtoken";
import User from "../models/User";
import { createError } from "../utils/error";
import { AuthenticatedRequest } from "../utils/utils";
import { NextFunction, Response } from "express";
export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) return next(createError(401, "No token provided"));
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const user = await User.findById(decoded.id).exec();
        if(!user) return next(createError(404, "User not found"));
        req.user = user;
        next();
    } catch (error) {
        return next(createError(403, "Invalid token"));
    }
}