import { NextFunction, Request, Response } from "express";
import User from "../models/User";
export const showProfilePicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;
    if(!email) {
        res.status(400).json({ message: "Email not found" });
        return;
    }
    try {
        const user = await User.findOne({ email: email });
        if(!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const pictureLink = user.profilePic;
        res.status(200).json({ message: "Profile picture sent: ", link: pictureLink });
        return;
    } catch (error) {
        console.error("Error finding profile picture");
        next(error);
    }
}
export const updateProfilePicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, profilePic } = req.body;
    if(!email || !profilePic) {
        res.status(400).json({ message: "Email and profile picture are required" });
        return;
    }
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { profilePic: profilePic },
            { new: true },
        )
        if(!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "Profile picture updated successfully", user: updatedUser });
        return;
    } catch (error) {
        console.error("Error updating profile picture", error);
        next(error);
    }
}