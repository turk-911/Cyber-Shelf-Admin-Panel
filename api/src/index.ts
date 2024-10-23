import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 5500;
app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});
app.listen(port, () => {
    console.log(`App listening on ${port}`);
})