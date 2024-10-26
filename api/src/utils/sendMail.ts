import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
export const sendOtpMail = async (email: string, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP for email verification",
        text: `6 digit OTP for email verification is ${otp}. Do not share it to anyone. This OTP expires in 5 minutes.`
    };
    await transporter.sendMail(mailOptions);
};