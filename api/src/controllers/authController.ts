import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { createError } from "../utils/error";
dotenv.config();
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email }).exec();
        if(existingUser) return next(createError(409, "Email is already in use."));
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });
        const createdUser = await user.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET as string, {
            expiresIn: "30d",
        });
        const userEmail = createdUser.email;
        console.log(userEmail);
        res.status(200).json({ token, user, userEmail });
        return;
    } catch (error) {
        return next(error);
    }
}
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        
        if(!user) return next(createError(404, "User not found"));
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if(!isPasswordCorrect) return next(createError(403, "Incorrect password"));
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: "9999 years",
        });
        const userEmail = user.email;
        res.status(200).json({ token, user, userEmail });
        console.log(userEmail);
        return;
    } catch (error) {
        return next(error);
    }
}