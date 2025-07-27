import { Request, Response } from "express";
import app from "../src/server";

const serverless = require("serverless-http");

app.get("/hello", (_req: Request, res: Response) => {
  res.json({ message: "Hello from Netlify Function!" });
});

module.exports.handler = serverless(app);
