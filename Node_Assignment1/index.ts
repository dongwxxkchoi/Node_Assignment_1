import express, { Request, Response } from "express";
import postRouter from "./Router/PostAPI";
import profileRouter from "./Router/ProfileAPI";

const app = express();

app.get("/", (req: Request, res: Response) => {
   res.send("Hello, World!");
});

app.listen(8080, () => {
    console.log("Server is Listening on Port 8080!");
});