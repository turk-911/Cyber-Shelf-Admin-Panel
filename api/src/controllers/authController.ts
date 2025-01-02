import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { createError } from "../utils/error";
import Otp from "../models/Otp";
import { sendOtpMail, sendVerificationMail } from "../utils/sendMail";
dotenv.config();
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email }).exec();
        if(existingUser) return next(createError(409, "Email is already in use."));
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("OTP generated: ", otp);
        const newOtp = new Otp({
            email,
            otp,
            expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        });
        await newOtp.save();
        await sendOtpMail(email, otp);
        res.status(200).json({ message: "OTP has been sent to your mail. Please enter the correct OTP within 5 minutes to complete registration." });
    } catch (error) {
        return next(error);
    }
}
export const verifyOtpAndRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("Request body: ", req.body);
        const { email, name, otp, password } = req.body;
        console.log(password);
        const existingOtp = await Otp.findOne({ email });
        if(!existingOtp) return next(createError(400, "Invalid otp"));
        console.log(existingOtp);
        console.log("otp from database: ", existingOtp.otp);
        if(existingOtp.expiresAt < new Date(Date.now())) {
            await Otp.deleteOne({ email });
            return next(createError(400, "OTP expired, Please try again"));
        }
        if(otp === existingOtp.otp) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name, 
                email,
                password: hashedPassword,
            });
            const createdUser = await user.save();
            const userEmail = createdUser.email;
            const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET as string, { expiresIn: "30d" });
            await Otp.deleteOne({ email });
            res.status(200).json({ token, user, userEmail, message: "Registration successful" });
            sendVerificationMail(email, name);
        }
        else return next(createError(400, "Incorrect otp. Please try again"));
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