import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5500;
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});
app.listen(port, () => {
    console.log(`App listening on ${port}`);
})