import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import uploadRouter from "./routes/uploadRoutes";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5500;
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/uploads", uploadRouter);
app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});
app.listen(5500, '0.0.0.0', () => {
    console.log(`App listening on ${port}`);
})